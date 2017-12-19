// @flow
import * as css from 'css'
import {
  replaceClassNames,
  type ClassNameReplacer
} from './replace-class-names'
import type { Emotion } from 'create-emotion'

type Options = {
  classNameReplacer: ClassNameReplacer
}

function createSerializer(
  emotion: Emotion,
  { classNameReplacer }: Options = {}
) {
  const styleSheet = emotion.sheet
  function test(val: *) {
    return (
      val && !val.withStyles && val.$$typeof === Symbol.for('react.test.json')
    )
  }

  function print(val: *, printer: Function) {
    const nodes = getNodes(val)
    markNodes(nodes)
    const selectors = getSelectors(nodes)
    const styles = getStyles(selectors)
    const printedVal = printer(val)
    if (styles) {
      return replaceClassNames(selectors, styles, printedVal, classNameReplacer)
    } else {
      return printedVal
    }
  }

  function getNodes(node, nodes = []) {
    if (node.children) {
      node.children.forEach(child => getNodes(child, nodes))
    }

    if (typeof node === 'object') {
      nodes.push(node)
    }

    return nodes
  }

  function markNodes(nodes) {
    nodes.forEach(node => {
      node.withStyles = true
    })
  }

  function getSelectors(nodes) {
    return nodes.reduce(
      (selectors, node) => getSelectorsFromProps(selectors, node.props),
      []
    )
  }

  function getSelectorsFromProps(selectors, props) {
    const className = props.className || props.class
    if (className) {
      selectors = selectors.concat(
        className
          .toString()
          .split(' ')
          .map(cn => `.${cn}`)
      )
    }
    const dataProps = Object.keys(props).reduce((dProps, key) => {
      if (key.startsWith('data-')) {
        dProps.push(`[${key}]`)
      }
      return dProps
    }, [])
    if (dataProps.length) {
      selectors = selectors.concat(dataProps)
    }
    return selectors
  }

  function filterChildSelector(baseSelector) {
    if (baseSelector.slice(-1) === '>') {
      return baseSelector.slice(0, -1)
    }
    return baseSelector
  }

  function getStyles(nodeSelectors) {
    const tags =
      typeof styleSheet === 'function' ? styleSheet().tags : styleSheet.tags
    const styles = tags
      .map(tag => /* istanbul ignore next */ tag.textContent || '')
      .join('\n')
    const ast = css.parse(styles)
    const rules = ast.stylesheet.rules.filter(filter)
    const mediaQueries = getMediaQueries(ast, filter)

    ast.stylesheet.rules = [...rules, ...mediaQueries]

    const ret = css.stringify(ast)
    return ret

    function filter(rule) {
      if (rule.type === 'rule') {
        return rule.selectors.some(selector => {
          const baseSelector = filterChildSelector(
            selector.split(/:| |\./).filter(s => !!s)[0]
          )
          return nodeSelectors.some(
            sel => sel === baseSelector || sel === `.${baseSelector}`
          )
        })
      }
      return false
    }
  }

  function getMediaQueries(ast, filter) {
    return ast.stylesheet.rules
      .filter(rule => rule.type === 'media' || rule.type === 'supports')
      .reduce((acc, mediaQuery) => {
        mediaQuery.rules = mediaQuery.rules.filter(filter)

        if (mediaQuery.rules.length) {
          return acc.concat(mediaQuery)
        }

        return acc
      }, [])
  }
  return { test, print }
}

// doing this to make it easier for users to mock things
// like switching between development mode and whatnot.

module.exports = createSerializer
