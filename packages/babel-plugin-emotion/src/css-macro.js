// @flow
import { createMacro } from 'babel-plugin-macros'
import { addDefault, addNamed } from '@babel/helper-module-imports'
import { transformExpressionWithStyles, addImport } from './utils'

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

let coreCssTransformer = ({ state, babel, importPath, reference }) => {
  reference.replaceWith(addImport(state, importPath, 'default', 'css'))
  transformCssCallExpression({ babel, state, path: reference.parentPath })
}

export default createMacro(({ references, state, babel, isEmotionCall }) => {
  if (!isEmotionCall) {
    state.emotionSourceMap = true
  }
  const t = babel.types
  if (references.default && references.default.length) {
    references.default.reverse().forEach(reference => {
      coreCssTransformer({
        state,
        babel,
        importPath: '@emotion/css',
        reference
      })
    })
  }
  Object.keys(references)
    .filter(x => x !== 'default')
    .forEach(referenceKey => {
      let runtimeNode = addNamed(
        state.file.path,
        referenceKey,
        '@emotion/css',
        { nameHint: referenceKey }
      )

      references[referenceKey].reverse().forEach(reference => {
        reference.replaceWith(t.cloneDeep(runtimeNode))
      })
    })
})
