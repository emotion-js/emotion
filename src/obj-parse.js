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
  var node = postcss.atRule({ name, params: parts[3] || '' })
  if (typeof value === 'object') {
    node.nodes = []
    parse(value, node)
  }

  if (name === 'spread') {
    node.__spread_property = property
  }

  parent.push(node)
}

function parse (props, parent) {
  let node
  forEach(
    props,
    ({ property, key, value, computed: isComputedProperty, spread }, i) => {
      if (spread) {
        atRule(parent, [null, `spread`, null, i], i, property)
      } else if (key[0] === '@') {
        var parts = key.match(/@([^\s]+)(\s+([\w\W]*)\s*)?/)
        if (Array.isArray(value)) {
          for (i = 0; i < value.length; i++) {
            atRule(parent, parts, value[i])
          }
        } else {
          atRule(parent, parts, value)
        }
      } else if (Array.isArray(value)) {
        for (i = 0; i < value.length; i++) {
          decl(parent, key, value[i])
        }
      } else if (typeof value === 'object' && value !== null) {
        node = postcss.rule({ selector: key })
        parse(value, node)
        parent.push(node)
      } else {
        decl(parent, key, value)
      }
    }
  )
}

export default function (obj, opts) {
  var root = postcss.root(opts)
  parse(obj, root)
  return root
}
