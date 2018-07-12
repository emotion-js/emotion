import memoize from '@emotion/memoize'

declare var codegen: { require: string => RegExp }

const reactPropsRegex = codegen.require('./props')

export default memoize(RegExp.prototype.test.bind(reactPropsRegex))
