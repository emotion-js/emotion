// @flow
import * as css from 'css'
import {
  replaceClassNames,
  type ClassNameReplacer
} from './replace-class-names'
import type { Emotion } from 'create-emotion'

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

function getSelectorsFromClasses(selectors, classes) {
  return classes
    ? selectors.concat(classes.split(' ').map(c => `.${c}`))
    : selectors
}

function getSelectorsFromProps(selectors, props) {
  return getSelectorsFromClasses(selectors, props.className || props.class)
}

function getSelectorsForDOMElement(selectors, node) {
  return getSelectorsFromClasses(selectors, node.getAttribute('class'))
}

function getSelectors(nodes) {
  return nodes.reduce(
    (selectors, node) =>
      isReactElement(node)
        ? getSelectorsFromProps(selectors, node.props)
        : getSelectorsForDOMElement(selectors, node),
    []
  )
}

function filterChildSelector(baseSelector) {
  if (baseSelector.slice(-1) === '>') {
    return baseSelector.slice(0, -1)
  }
  return baseSelector
}

export function getStyles(emotion: Emotion) {
  return Object.keys(emotion.caches.inserted).reduce((style, current) => {
    if (emotion.caches.inserted[current] === true) {
      return style
    }
    return style + emotion.caches.inserted[current]
  }, '')
}

function isReactElement(val) {
  return val.$$typeof === Symbol.for('react.test.json')
}

const domElementPattern = /^((HTML|SVG)\w*)?Element$/

function isDOMElement(val) {
  return (
    val.nodeType === 1 &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

export function createSerializer(
  emotion: Emotion,
  { classNameReplacer, DOMElements = true }: Options = {}
) {
  function print(val: *, printer: Function) {
    const nodes = getNodes(val)
    markNodes(nodes)
    const selectors = getSelectors(nodes)
    const styles = getStylesFromSelectors(selectors)
    const printedVal = printer(val)
    return replaceClassNames(
      selectors,
      styles,
      printedVal,
      emotion.caches.key,
      classNameReplacer
    )
  }

  function test(val: *) {
    return (
      val &&
      !val.withEmotionStyles &&
      (DOMElements
        ? isReactElement(val) || isDOMElement(val)
        : isReactElement(val))
    )
  }

  function markNodes(nodes) {
    nodes.forEach(node => {
      node.withEmotionStyles = true
    })
  }

  function getStylesFromSelectors(nodeSelectors) {
    const styles = getStyles(emotion)
    let ast
    try {
      ast = css.parse(styles)
    } catch (e) {
      console.error(e)
      throw new Error(
        `There was an error parsing css in jest-emotion-react: "${styles}"`
      )
    }
    ast.stylesheet.rules = ast.stylesheet.rules.reduce(reduceRules, [])

    const ret = css.stringify(ast)
    return ret

    function reduceRules(rules, rule) {
      let shouldIncludeRule = false
      if (rule.type === 'rule') {
        shouldIncludeRule = rule.selectors.some(selector => {
          const baseSelector = filterChildSelector(
            selector.split(/:| |\./).filter(s => !!s)[0]
          )
          return nodeSelectors.some(
            sel => sel === baseSelector || sel === `.${baseSelector}`
          )
        })
      }
      if (rule.type === 'media' || rule.type === 'supports') {
        rule.rules = rule.rules.reduce(reduceRules, [])

        if (rule.rules.length) {
          shouldIncludeRule = true
        }
      }
      return shouldIncludeRule ? rules.concat(rule) : rules
    }
  }

  return { test, print }
}
