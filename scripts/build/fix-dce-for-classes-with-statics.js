// this is temporary fix until https://github.com/babel/babel/pull/6963
// i know this is super hacky
module.exports = function plugin(babel) {
  let t = babel.types
  return {
    visitor: {
      CallExpression(path, state) {
        let programPath = state.file.path
        if (
          looksLike(path.node, {
            leadingComments: val =>
              val && val.some(comment => /[@#]__PURE__/.test(comment.value)),
            callee: {
              type: 'FunctionExpression'
            }
          }) &&
          t.isVariableDeclarator(path.parentPath.node)
        ) {
          programPath.get('body').forEach(statementPath => {
            if (
              looksLike(statementPath.node, {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: path.parent.id.name
                    }
                  }
                }
              })
            ) {
              path.node.callee.body.body.splice(
                path.node.callee.body.body.length - 1,
                0,
                t.cloneDeep(statementPath.node)
              )
              statementPath.remove()
            }
          })
        }
      }
    }
  }
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
