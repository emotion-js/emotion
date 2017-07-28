import postcss from 'postcss'
import isUnitlessNumber from './glamor/CSSPropertyOperations/CSSProperty'
import { processStyleName } from './glamor/CSSPropertyOperations'

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

function atRule (parent, parts, value) {
  var node = postcss.atRule({ name: parts[1], params: parts[3] || '' })
  if (typeof value === 'object') {
    node.nodes = []
    parse(value, node)
  }
  parent.push(node)
}

function parse (obj, parent) {
  var name, value, node, i
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      value = obj[name]
      if (name[0] === '@') {
        var parts = name.match(/@([^\s]+)(\s+([\w\W]*)\s*)?/)
        if (Array.isArray(value)) {
          for (i = 0; i < value.length; i++) {
            atRule(parent, parts, value[i])
          }
        } else {
          atRule(parent, parts, value)
        }
      } else if (Array.isArray(value)) {
        for (i = 0; i < value.length; i++) {
          decl(parent, name, value[i])
        }
      } else if (typeof value === 'object' && value !== null) {
        node = postcss.rule({ selector: name })
        parse(value, node)
        parent.push(node)
      } else {
        decl(parent, name, value)
      }
    }
  }
}

export default function (obj, opts) {
  var root = postcss.root(opts)
  parse(obj, root)
  return root
}
