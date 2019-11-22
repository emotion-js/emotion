// @flow
import * as css from 'css'
import { replaceClassNames } from './replace-class-names'
import {
  getClassNamesFromNodes,
  isReactElement,
  isEmotionCssPropElementType,
  isEmotionCssPropEnzymeElement,
  isDOMElement,
  getStylesFromClassNames,
  getStyleElements,
  getKeys
} from './utils'

export { matchers } from './matchers'

function getNodes(node, nodes = []) {
  if (Array.isArray(node)) {
    for (let child of node) {
      getNodes(child, nodes)
    }
    return nodes
  }

  if (node.children) {
    for (let child of node.children) {
      getNodes(child, nodes)
    }
  }

  if (typeof node === 'object') {
    nodes.push(node)
  }

  return nodes
}

function getPrettyStylesFromClassNames(
  classNames: Array<string>,
  elements: Array<HTMLStyleElement>
) {
  let styles = getStylesFromClassNames(classNames, elements)

  let prettyStyles
  try {
    prettyStyles = css.stringify(css.parse(styles))
  } catch (e) {
    console.error(e)
    throw new Error(`There was an error parsing the following css: "${styles}"`)
  }
  return prettyStyles
}

type Options = {
  classNameReplacer?: (className: string, index: number) => string,
  DOMElements?: boolean
}

function filterEmotionProps(props = {}, shouldKnowStyles = true) {
  const {
    css,
    __EMOTION_TYPE_PLEASE_DO_NOT_USE__,
    __EMOTION_LABEL_PLEASE_DO_NOT_USE__,
    ...rest
  } = props

  if (shouldKnowStyles) {
    rest.css = 'unknown styles'
  }

  return rest
}

function isShallowEnzymeElement(element, classNames) {
  let renderedClassNames = (element.children || [])
    .map(({ props = {} }) => props.className)
    .filter(Boolean)
    .join(' ')
  return !classNames.some(className =>
    new RegExp(className).test(renderedClassNames)
  )
}

export function createSerializer({
  classNameReplacer,
  DOMElements = true
}: Options = {}) {
  let cache = new WeakSet()
  function print(val: *, printer: Function) {
    let elements = getStyleElements()
    let keys = getKeys(elements)
    if (isEmotionCssPropElementType(val)) {
      return printer({
        ...val,
        props: filterEmotionProps(val.props),
        type: val.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
      })
    }
    if (isEmotionCssPropEnzymeElement(val)) {
      let expectedClassNames = (val.props.css.name || '')
        .split(' ')
        .map(className => keys.map(key => `${key}-${className}`))
        .reduce((flat, values) => flat.concat(values), [])
      if (isShallowEnzymeElement(val, expectedClassNames)) {
        return printer({
          ...val,
          props: filterEmotionProps(
            {
              ...val.props,
              className: [val.props.className]
                .concat(expectedClassNames)
                .filter(Boolean)
                .join(' ')
            },
            false
          ),
          type: val.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
        })
      } else {
        return val.children.map(printer).join('\n')
      }
    }
    const nodes = getNodes(val)
    const classNames = getClassNamesFromNodes(nodes)
    const styles = getPrettyStylesFromClassNames(classNames, elements)
    nodes.forEach(cache.add, cache)
    const printedVal = printer(val)
    nodes.forEach(cache.delete, cache)
    return replaceClassNames(
      classNames,
      styles,
      printedVal,
      keys,
      classNameReplacer
    )
  }

  function test(val: *) {
    return (
      val &&
      ((!cache.has(val) &&
        (isReactElement(val) || (DOMElements && isDOMElement(val)))) ||
        isEmotionCssPropEnzymeElement(val) ||
        isEmotionCssPropElementType(val))
    )
  }
  return { test, print }
}

export let { print, test } = createSerializer()

export default { print, test }
