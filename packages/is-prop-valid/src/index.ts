import memoize from '@emotion/memoize'

declare const codegen: { require: (path: string) => any }

// eslint-disable-next-line no-undef
const reactPropsRegex: RegExp = codegen.require('./props')

// https://esbench.com/bench/5bfee68a4cd7e6009ef61d23
const isPropValid = /* #__PURE__ */ memoize<PropertyKey, boolean>(
  prop =>
    typeof prop === 'string' &&
    (reactPropsRegex.test(prop) ||
      (prop.charCodeAt(0) === 111 /* o */ &&
        prop.charCodeAt(1) === 110 /* n */ &&
        prop.charCodeAt(2) < 91)) /* Z+1 */
)

export default isPropValid
