// @flow
import { parse, stringify } from 'css'

function getNodes(node, nodes = []) {
  if (node.children) {
    node.children.forEach(child => getNodes(child, nodes))
  }
  if (Array.isArray(node)) {
    node.forEach(child => getNodes(child, nodes))
  } else if (typeof node === 'object') {
    nodes.push(node)
  }

  return nodes
}

function markNodes(nodes) {
  nodes.forEach(node => {
    node.withNewStyles = true
  })
}

// i know this looks hacky but it works pretty well
// and most importantly it doesn't mutate the object that gets passed in
let re = /<style\n(\s+)dangerouslySetInnerHTML={\s+Object {\s+"__html": "(.*?)",\n\s+}\s+}\s+data-emotion-([\w-]+)="[^"]+"\s+\/>/g

const serializer = {
  test: (val: any) => {
    if (!val) {
      return false
    }
    if (!val.withNewStyles && val.$$typeof === Symbol.for('react.test.json')) {
      return true
    } else if (
      Array.isArray(val) &&
      val[0] &&
      !val[0].withNewStyles &&
      val[0].$$typeof === Symbol.for('react.test.json')
    ) {
      return true
    }
    return false
  },
  print: (val: any, printer: any => string) => {
    const nodes = getNodes(val)

    markNodes(nodes)
    let i = 0
    const classMap = {}
    let printed = printer(val).replace(
      re,
      (match, whiteSpace, cssString, key) => {
        return `<style>\n${whiteSpace}${stringify(
          parse(
            // for some reason the quotes seem to be escaped and that breaks the formatting
            cssString.replace(/\\"/g, '"').replace(/\\'/g, "'")
          )
        )
          .replace(new RegExp(`${key}-([a-zA-Z0-9-]+)`, 'g'), match => {
            if (classMap[match] !== undefined) {
              return classMap[match]
            }
            return (classMap[match] = `emotion-${i++}`)
          })
          .split('\n')
          .join('\n' + whiteSpace)}\n${whiteSpace.substring(2)}</style>`
      }
    )
    Object.keys(classMap).forEach(key => {
      printed = printed.replace(new RegExp(key, 'g'), classMap[key])
    })
    return printed
  }
}

// clsPattern,
// (match, p1) => {
//   if (classMap[p1] !== undefined) {
//     return classMap[p1]
//   }
//   return match
// }

export default serializer
