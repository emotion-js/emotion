module.exports = function findAndReplaceAttrs (path, t) {
  let quasis = path.node.quasi.quasis
  let stubs = path.node.quasi.expressions
  let didFindAtLeastOneMatch = false

  let [nextQuasis, nextStubs] = quasis.reduce(
    (accum, quasi, i) => {
      const str = quasi.value.cooked
      const regex = /attr\(([\S]+)(?:\s*(em|ex|px|rem|vw|vh|vmin|vmax|mm|cm|in|pt|pc|%)?)(?:,\s*([\S^)]+))?\)/gm
      let attrMatch
      let matches = []
      while ((attrMatch = regex.exec(str)) !== null) {
        didFindAtLeastOneMatch = true
        matches.push({
          value: attrMatch[0],
          propName: attrMatch[1],
          valueType: attrMatch[2],
          defaultValue: attrMatch[3],
          index: attrMatch.index
        })
      }
      let cursor = 0
      for (let j = 0; j < matches.length; ++j) {
        const match = matches[j]
        const value = match.value
        const propName = match.propName
        const valueType = match.valueType
        const defaultValue = match.defaultValue
        const index = match.index

        const preAttr = `${str.slice(cursor, index)}`
        cursor = index + value.length
        const postAttr = `${str.slice(cursor)}`

        if (preAttr) {
          accum[0].push(
            t.templateElement({raw: preAttr, cooked: preAttr}, false)
          )
        }

        if (postAttr && j === matches.length - 1) {
          accum[0].push(
            t.templateElement(
              {raw: postAttr, cooked: postAttr},
              i === quasis.length - 1
            )
          )
        }

        let createMemberExpression = () =>
          t.memberExpression(t.identifier('props'), t.identifier(propName))

        let returnValue = createMemberExpression()

        if (valueType) {
          returnValue = t.binaryExpression(
            '+',
            createMemberExpression(),
            t.stringLiteral(valueType)
          )
        }

        if (defaultValue) {
          returnValue = t.conditionalExpression(
            createMemberExpression(),
            createMemberExpression(),
            t.parenthesizedExpression(
              t.binaryExpression(
                '+',
                t.stringLiteral(defaultValue),
                t.stringLiteral(valueType || '')
              )
            )
          )
        }

        const body = t.blockStatement([t.returnStatement(returnValue)])

        const expr = t.functionExpression(
          t.identifier(
            `get${propName.charAt(0).toUpperCase() + propName.slice(1)}`
          ),
          [t.identifier('props')],
          body
        )
        accum[1].push(expr)
      }

      if (matches.length === 0) {
        accum[0].push(quasi)
        if (stubs[i]) {
          accum[1].push(stubs[i])
        }
      } else if (stubs[i]) {
        accum[1].push(stubs[i])
      }

      return accum
    },
    [[], []]
  )

  if (didFindAtLeastOneMatch) {
    return t.templateLiteral(nextQuasis, nextStubs)
  }

  return path.node.quasi
}
