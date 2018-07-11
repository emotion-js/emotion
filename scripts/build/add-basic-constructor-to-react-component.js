// this is to avoid the spread argument helper for react component constructors
// https://runkit.com/mitchellhamilton/5b370eeaf5b34c0012874d92
// without this, the constructor's arguments will be iterated over and put in an array
module.exports = function(babel) {
  const { types: t } = babel
  let isReactComponent = t.buildMatchMemberExpression('React.Component')
  let isReactPureComponent = t.buildMatchMemberExpression('React.PureComponent')

  let hasConstructor = body =>
    body.length &&
    body.some(node => {
      return (
        t.isClassMethod(node) &&
        t.isIdentifier(node.key) &&
        node.key.name === 'constructor'
      )
    })
  return {
    name: 'ast-transform', // not required
    visitor: {
      Class(path) {
        if (
          (isReactComponent(path.node.superClass) ||
            isReactPureComponent(path.node.superClass)) &&
          !hasConstructor(path.node.body.body)
        ) {
          path.node.body.body.unshift(
            babel.template`
              class Thing {
                constructor(props) {
                  super(props);
                }
              }
            `({}).body.body[0]
          )
        }
      }
    }
  }
}
