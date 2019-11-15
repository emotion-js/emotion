// @flow
import { transformExpressionWithStyles, createTransformerMacro } from './utils'

export const transformCssCallExpression = ({
  babel,
  state,
  path,
  sourceMap
}: {
  babel: *,
  state: *,
  path: *,
  sourceMap?: string
}) => {
  let { node, isPure } = transformExpressionWithStyles({
    babel,
    state,
    path,
    shouldLabel: true,
    sourceMap
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

export let coreCssTransformer = ({
  state,
  babel,
  reference
}: {
  state: any,
  babel: any,
  reference: any
}) => {
  transformCssCallExpression({ babel, state, path: reference.parentPath })
}

export default createTransformerMacro(
  { css: coreCssTransformer },
  { importSource: '@emotion/core' }
)
