// @flow
import * as t from 'babel-types'
import postcss from 'postcss'
import parse from 'postcss-safe-parser'
import postcssNested from 'postcss-nested'
import stringify from 'postcss/lib/stringify'
import postcssJs from 'postcss-js'
import camelcase from 'camelcase-css'
import objParse from './obj-parse'
import autoprefixer from 'autoprefixer'
import { processStyleName } from './glamor/CSSPropertyOperations'
import { SPREAD } from './ast-object'

type Rule = {
  parent: { selector: string, nodes: Array<mixed> },
  selector: string,
  remove: () => {}
}

type Decl = {
  parent: { selector: string, nodes: Array<mixed> },
  prop: string,
  value: string,
  remove: () => {}
}

function processResult (result) {
  if (console && console.warn) {
    result.warnings().forEach(function (warn) {
      const source = warn.plugin || 'PostCSS'
      console.warn(source + ': ' + warn.text)
    })
  }
  return postcssJs.parse(result.root)
}

function postcssSync (plugins) {
  const processor = postcss(plugins)
  return function (input) {
    const result = processor.process(input, { parser: postcssJs.parse })
    return processResult(result)
  }
}

const prefixer = postcssSync([autoprefixer, postcssNested])

export function parseCSS (
  css: string,
  extractStatic: boolean,
  filename: string
): {
  staticCSSRules: Array<string>,
  styles: { [string]: any },
  composesCount: number
} {
  // todo - handle errors
  let root
  if (typeof css === 'object') {
    // console.log(css.props)
    root = objParse(css, { from: filename })
  } else {
    root = parse(css, { from: filename })
  }
  let vars = 0
  let composes: number = 0

  root.walkDecls((decl: Decl): void => {
    if (decl.prop === 'composes') {
      if (!/xxx(\d+)xxx/gm.exec(decl.value)) {
        throw new Error('composes must be a interpolation')
      }
      if (decl.parent.nodes[0] !== decl) {
        throw new Error('composes must be the first rule')
      }
      const composeMatches = decl.value.match(/xxx(\d+)xxx/gm)
      const numOfComposes: number = !composeMatches ? 0 : composeMatches.length
      composes += numOfComposes
      vars += numOfComposes
      decl.remove()
    }
  })

  root.walkAtRules(atRule => {
    if (atRule.name === 'spread') {
      console.log(atRule.name, atRule.params, atRule.__spread_property)
    }
  })

  const styles = expandCSSFallbacks(prefixer(processNode(root)))
  console.log('STYLES', JSON.stringify(styles.nodes, null, 2))

  return {
    styles,
    staticCSSRules:
      vars === 0 && extractStatic
        ? stringifyCSSRoot(postcssJs.parse(styles))
        : [],
    composesCount: composes
  }
}

function atRule (node) {
  if (t.isSpreadProperty(node.__spread_property)) {
    console.log('gotcha bitch')

    return node.__spread_property
  }

  if (typeof node.nodes === 'undefined') {
    return true
  } else {
    return processNode(node)
  }
}

function processNode (node) {
  let name
  const result = {}
  node.each(function (child) {
    const rules = {}
    node.each(function (rule) {
      if (rule.type !== 'rule') {
      } else if (rules[rule.selector]) {
        if (rules[rule.selector].append) {
          rules[rule.selector].append(rule.nodes)
          rule.remove()
        }
      } else {
        rules[rule.selector] = rule
      }
    })

    if (child.type === 'atrule') {
      name = '@' + child.name
      if (child.params) name += ' ' + child.params
      if (typeof result[name] === 'undefined') {
        result[name] = atRule(child)
      } else if (Array.isArray(result[name])) {
        result[name].push(atRule(child))
      } else {
        result[name] = [result[name], atRule(child)]
      }
    } else if (child.type === 'rule') {
      result[child.selector] = process(child)
    } else if (child.type === 'decl') {
      name = camelcase(child.prop)
      child.value = child.important ? child.value + ' !important' : child.value
      if (typeof result[name] === 'undefined') {
        result[name] = child.value
      } else if (Array.isArray(result[name])) {
        result[name].push(child.value)
      } else {
        result[name] = [result[name], child.value]
      }
    }
  })
  console.log('result', result)
  return result
}

function stringifyCSSRoot (root) {
  return root.nodes.map((node, i) => {
    let str = ''
    stringify(node, x => {
      str += x
    })
    return str
  })
}

export function expandCSSFallbacks (style: { [string]: any }) {
  let flattened = Object.keys(style).reduce((accum, key) => {
    console.log(key)
    if (key === '@spread') {
      console.log(style[key][SPREAD])
      console.log(style[key].__spread_property)
    }
    if (Array.isArray(style[key])) {
      accum[key] = style[key].join(`; ${processStyleName(key)}: `)
    } else if (
      Object.prototype.toString.call(style[key]) === '[object Object]'
    ) {
      // console.log(style[key])
      accum[key] = expandCSSFallbacks(style[key])
    } else {
      accum[key] = style[key]
    }
    return accum
  }, {})
  // todo -
  // flatten arrays which haven't been flattened yet
  return flattened
}
