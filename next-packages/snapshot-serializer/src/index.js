// @flow
import * as css from 'css'
import { replaceClassNames } from './replace-class-names'
import {
  getClassNamesFromNodes,
  isReactElement,
  isDOMElement,
  getStylesFromClassNames,
  getStyleElements,
  getKeys
} from './utils'

// i know this package is called @emotion/snapshot-serializer and this is exporting a matcher but this is probably going to move to jest-emotion later
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

export function createSerializer(
  options: {
    classNameReplacer?: (className: string, index: number) => string
  } = {}
) {
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
      options.classNameReplacer
    )
  }

  function test(val: *) {
    return (
      val &&
      !val.withEmotionNextStyles &&
      (isReactElement(val) || isDOMElement(val))
    )
  }
  return { test, print }
}

export let { print, test } = createSerializer()

export default { print, test }
