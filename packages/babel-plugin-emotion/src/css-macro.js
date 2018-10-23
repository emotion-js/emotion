// @flow
import { createMacro } from 'babel-plugin-macros'
import { addDefault } from '@babel/helper-module-imports'
import { transformExpressionWithStyles } from './utils'

export const transformCssCallExpression = ({ babel, state, path }: *) => {
  let { node, isPure } = transformExpressionWithStyles({
    babel,
    state,
    path,
    shouldLabel: true
  })
  if (node) {
    path.replaceWith(node)
    if (isPure) {
      path.hoist()
    }
  } else {
    path.addComment('leading', '#__PURE__')
  }
}

export default createMacro(({ references, state, babel }) => {
  state.emotionSourceMap = true
  const t = babel.types
  if (references.default.length) {
    references.default.reverse().forEach(reference => {
      if (!state.cssIdentifier) {
        state.cssIdentifier = addDefault(reference, '@emotion/css', {
          nameHint: 'css'
        })
      }
      reference.replaceWith(t.cloneDeep(state.cssIdentifier))
      transformCssCallExpression({ babel, state, path: reference.parentPath })
    })
  }
})
