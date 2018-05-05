// this is to avoid the spread argument helper for react component constructors
module.exports = function(babel) {
  const { types: t } = babel

  return {
    name: 'ast-transform', // not required
    visitor: {
      Class(path) {
        if (
          path.node.superClass &&
          path.node.superClass.object &&
          path.node.superClass.object.name === 'React' &&
          path.node.superClass.property &&
          path.node.superClass.property.name === 'Component' &&
          path.node.body.body.length &&
          !path.node.body.body.some(node => {
            return (
              t.isClassMethod(node) &&
              t.isIdentifier(node.key) &&
              node.key.name === 'constructor'
            )
          })
        ) {
          path.node.body.body.unshift(
            t.classMethod(
              'constructor',
              t.identifier('constructor'),
              [t.identifier('props')],
              t.blockStatement([
                t.expressionStatement(
                  t.callExpression(t.super(), [t.identifier('props')])
                )
              ])
            )
          )
        }
      }
    }
  }
}
