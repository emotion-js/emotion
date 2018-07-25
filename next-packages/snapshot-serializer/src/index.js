// @flow
import * as css from 'css'
import {
  replaceClassNames,
  type ClassNameReplacer
} from './replace-class-names'
import {
  getClassNamesFromNodes,
  isReactElement,
  isDOMElement,
  getStylesFromClassNames,
  getStyleElements,
  getKeys
} from './utils'

export { createMatchers } from './matchers'

type Options = {
  classNameReplacer: ClassNameReplacer,
  DOMElements: boolean
}

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

function markNodes(nodes) {
  nodes.forEach(node => {
    node.withEmotionNextStyles = true
  })
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

export function createSerializer({
  classNameReplacer,
  DOMElements = true
}: Options = {}) {
  function print(val: *, printer: Function) {
    const nodes = getNodes(val)
    markNodes(nodes)
    const classNames = getClassNamesFromNodes(nodes)
    let elements = getStyleElements()
    const styles = getPrettyStylesFromClassNames(classNames, elements)
    const printedVal = printer(val)
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
      !val.withEmotionNextStyles &&
      (DOMElements
        ? isReactElement(val) || isDOMElement(val)
        : isReactElement(val))
    )
  }

  return { test, print }
}
