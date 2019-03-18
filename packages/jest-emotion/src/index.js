// @flow
import * as css from 'css'
import { replaceClassNames } from './replace-class-names'
import {
  getClassNamesFromNodes,
  isReactElement,
  isReactForwardRef,
  isEmotionElement,
  isDOMElement,
  getStylesFromClassNames,
  getStyleElements,
  getKeys
} from './utils'

export { matchers } from './matchers'

function getNodes(node, nodes = []) {
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

function filterEmotionProps(props = {}) {
  const { css, __EMOTION_TYPE_PLEASE_DO_NOT_USE__, ...rest } = props

  return rest
}

function formatEmotionForwardRefs(props = {}) {
  let nextProps = props

  Object.keys(props)
    .filter(key => isReactForwardRef(props[key]))
    .forEach(key => {
      const { __EMOTION_TYPE_PLEASE_DO_NOT_USE__: componentType } = props[
        key
      ].props

      nextProps[key] = {
        ...props[key],
        props: filterEmotionProps(props[key].props)
      }

      nextProps[key].type = `CssProp(${componentType})`
    })

  return nextProps
}

export function createSerializer({
  classNameReplacer,
  DOMElements = true
}: Options = {}) {
  let cache = new WeakSet()
  function print(val: *, printer: Function) {
    if (isEmotionElement(val)) {
      return val.children.map(printer).join('\n')
    }
    const nodes = getNodes(val)
    const classNames = getClassNamesFromNodes(nodes)
    let elements = getStyleElements()
    const styles = getPrettyStylesFromClassNames(classNames, elements)
    nodes.forEach(cache.add, cache)
    val.props = formatEmotionForwardRefs(val.props)
    const printedVal = printer(val)
    nodes.forEach(cache.delete, cache)
    let keys = getKeys(elements)
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
        isEmotionElement(val))
    )
  }
  return { test, print }
}

export let { print, test } = createSerializer()

export default { print, test }
