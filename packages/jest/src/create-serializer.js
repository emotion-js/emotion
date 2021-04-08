// @flow
import prettify from '@emotion/css-prettifier'
import { replaceClassNames } from './replace-class-names'
import * as enzymeTickler from './enzyme-tickler'
import {
  getClassNamesFromNodes,
  isReactElement,
  isEmotionCssPropElementType,
  isEmotionCssPropEnzymeElement,
  isDOMElement,
  getStylesFromClassNames,
  getStyleElements,
  getKeys,
  flatMap,
  isPrimitive,
  hasIntersection
} from './utils'

function getNodes(node, nodes = []) {
  if (Array.isArray(node)) {
    for (let child of node) {
      getNodes(child, nodes)
    }
    return nodes
  }

  if (typeof node === 'object') {
    nodes.push(node)
  }

  if (node.children) {
    for (let child of node.children) {
      getNodes(child, nodes)
    }
  }

  return nodes
}

function copyProps(target, source) {
  return Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
  )
}

function deepTransform(node, transform) {
  if (Array.isArray(node)) {
    return node.map(child => deepTransform(child, transform))
  }

  const transformed: any = transform(node)

  if (transformed !== node && transformed.children) {
    return copyProps(transformed, {
      // flatMap to allow a child of <A><B /><C /></A> to be transformed to <B /><C />
      children: flatMap(
        (deepTransform(transformed.children, transform): any),
        id => id
      )
    })
  }

  return transformed
}

function getPrettyStylesFromClassNames(
  classNames: Array<string>,
  elements: Array<HTMLStyleElement>,
  indentation: string
) {
  return prettify(getStylesFromClassNames(classNames, elements), indentation)
}

export type Options = {
  classNameReplacer?: (className: string, index: number) => string,
  DOMElements?: boolean
}

function filterEmotionProps(props = {}) {
  const {
    css,
    __EMOTION_TYPE_PLEASE_DO_NOT_USE__,
    __EMOTION_LABEL_PLEASE_DO_NOT_USE__,
    ...rest
  } = props

  rest.css = 'unknown styles'

  return rest
}

function getLabelsFromClassName(keys, className) {
  return flatMap(className.split(' '), cls => {
    const [key, hash, ...labels] = cls.split('-')
    if (!keys.includes(key)) {
      return null
    }
    return labels
  }).filter(Boolean)
}

function isShallowEnzymeElement(
  element: any,
  keys: string[],
  labels: string[]
) {
  const childClassNames = (element.children || [])
    .map(({ props = {} }) => props.className || '')
    .filter(Boolean)

  return !childClassNames.some(className => {
    const childLabels = getLabelsFromClassName(keys, className)
    return childLabels.every(childLabel => labels.includes(childLabel))
  })
}

const createConvertEmotionElements = (keys: string[], printer: *) => (
  node: any
) => {
  if (isPrimitive(node)) {
    return node
  }
  if (isEmotionCssPropEnzymeElement(node)) {
    const className = enzymeTickler.getTickledClassName(node.props.css)
    const labels = getLabelsFromClassName(keys, className || '')

    if (isShallowEnzymeElement(node, keys, labels)) {
      const emotionType = node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
      // emotionType will be a string for DOM elements
      const type =
        typeof emotionType === 'string'
          ? emotionType
          : emotionType.displayName || emotionType.name || 'Component'
      return {
        ...node,
        props: filterEmotionProps({
          ...node.props,
          className
        }),
        type
      }
    } else {
      return node.children[0]
    }
  }
  if (isEmotionCssPropElementType(node)) {
    return {
      ...node,
      props: filterEmotionProps(node.props),
      type: node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
    }
  }
  if (isReactElement(node)) {
    return copyProps({}, node)
  }
  return node
}

function clean(node: any, classNames: string[]) {
  if (Array.isArray(node)) {
    for (const child of node) {
      clean(child, classNames)
    }
    return
  }
  if (node.children) {
    for (const child of node.children) {
      clean(child, classNames)
    }
  }
  if (node.props) {
    const { className } = node.props
    if (!className) {
      // if it's empty, remove it
      delete node.props.className
    } else {
      const hasKnownClass = hasIntersection(className.split(' '), classNames)
      if (hasKnownClass) {
        delete node.props.css
      }
    }
  }
}

export function createSerializer({
  classNameReplacer,
  DOMElements = true
}: Options = {}) {
  const cache = new WeakSet()
  const isTransformed = val => cache.has(val)

  function serialize(
    val: *,
    config: *,
    indentation: string,
    depth: number,
    refs: *,
    printer: Function
  ) {
    const elements = getStyleElements()
    const keys = getKeys(elements)
    const convertEmotionElements = createConvertEmotionElements(keys, printer)
    const converted = deepTransform(val, convertEmotionElements)
    const nodes = getNodes(converted)
    const classNames = getClassNamesFromNodes(nodes)
    const styles = getPrettyStylesFromClassNames(
      classNames,
      elements,
      config.indent
    )
    clean(converted, classNames)

    nodes.forEach(cache.add, cache)
    const printedVal = printer(converted, config, indentation, depth, refs)
    nodes.forEach(cache.delete, cache)

    return replaceClassNames(
      classNames,
      styles,
      printedVal,
      keys,
      classNameReplacer
    )
  }

  return {
    test(val: *) {
      return (
        val &&
        (!isTransformed(val) &&
          (isReactElement(val) || (DOMElements && isDOMElement(val))))
      )
    },
    serialize
  }
}
