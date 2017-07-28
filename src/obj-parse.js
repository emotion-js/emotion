import postcss from 'postcss'
import isUnitlessNumber from './glamor/CSSPropertyOperations/CSSProperty'
import { processStyleName } from './glamor/CSSPropertyOperations'
import { forEach } from './utils'

function decl (parent, name, value) {
  if (value === false || value === null) return

  name = processStyleName(name)
  if (typeof value === 'number') {
    if (value === 0 || isUnitlessNumber[name] === 1) {
      value = value.toString()
    } else {
      value += 'px'
    }
  }

  if (name === 'css-float') name = 'float'

  parent.push(postcss.decl({ prop: name, value: value }))
}

function atRule (parent, parts, value, property) {
  const name = parts[1]
  const node = postcss.atRule({ name, params: parts[3] || '' })
  if (typeof value === 'object') {
    console.log('typeof value === object', value)
    node.nodes = []
    parseASTObject(value.props, node)
  }

  if (name === 'spread') {
    node.__spread_property = property
  }
  parent.push(node)
}

function parseASTObject (props, parent) {
  // console.log('obj', JSON.stringify(obj, null, 2))
  let node

  forEach(
    props,
    ({ property, key, value, computed: isComputedProperty, spread }, i) => {
      console.log(key, value, !!property)
      if (key && key.indexOf('@spread') === 0) {
        atRule(parent, [null, `spread`, null, i], {}, value.__spread_property)
      } else if (spread) {
        atRule(parent, [null, `spread`, null, i], i, property)
      } else if (key[0] === '@') {
        var parts = key.match(/@([^\s]+)(\s+([\w\W]*)\s*)?/)
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            atRule(parent, parts, value[i])
          }
        } else {
          atRule(parent, parts, value)
        }
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          decl(parent, key, value[i])
        }
      } else if (typeof value === 'object' && value !== null) {
        node = postcss.rule({ selector: key })
        parseASTObject(value, node)
        parent.push(node)
      } else {
        decl(parent, key, value)
      }
    }
  )
}

function jsAtRule (parent, parts, value, property) {
  const name = parts[1]
  const node = postcss.atRule({name, params: parts[3] || ''})
  if (typeof value === 'object') {
    console.log('typeof value === object', value)
    node.nodes = []
    parseJSObj(value.props, node)
  }

  if (name === 'spread') {
    node.__spread_property = property
  }
  parent.push(node)
}

function parseJSObj (obj, parent) {
  var name, value, node, i
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      value = obj[name]
      if (name[0] === '@') {
        console.log('IN PARSE', name, obj[name])
        var parts = name.match(/@([^\s]+)(\s+([\w\W]*)\s*)?/)
        if (Array.isArray(value)) {
          for (i = 0; i < value.length; i++) {
            jsAtRule(parent, parts, value[i])
          }
        } else {
          jsAtRule(parent, parts, value)
        }
      } else if (Array.isArray(value)) {
        for (i = 0; i < value.length; i++) {
          decl(parent, name, value[i])
        }
      } else if (typeof value === 'object' && value !== null) {
        node = postcss.rule({ selector: name })
        parseJSObj(value, node)
        parent.push(node)
      } else {
        decl(parent, name, value)
      }
    }
  }
}

export default function (obj, opts) {
  var root = postcss.root(opts)
  parseASTObject(obj.props, root)

  return root
}
