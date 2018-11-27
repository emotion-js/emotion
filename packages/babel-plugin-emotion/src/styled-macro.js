// @flow
import { createMacro } from 'babel-plugin-macros'
import { addDefault, addNamed } from '@babel/helper-module-imports'
import { transformExpressionWithStyles, getStyledOptions } from './utils'

export let createStyledMacro = ({
  importPath,
  isWeb
}: {
  importPath: string,
  isWeb: boolean
}) =>
  createMacro(({ references, state, babel, isEmotionCall }) => {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }
    const t = babel.types
    if (references.default && references.default.length) {
      let styledIdentifier = addDefault(state.file.path, importPath, {
        nameHint: 'styled'
      })
      references.default.forEach(reference => {
        if (
          t.isMemberExpression(reference.parent) &&
          reference.parent.computed === false &&
          // checks if the first character is lowercase
          // becasue we don't want to transform the member expression if
          // it's in primitives/native
          reference.parent.property.name.charCodeAt(0) > 96
        ) {
          reference.parentPath.replaceWith(
            t.callExpression(t.cloneDeep(styledIdentifier), [
              t.stringLiteral(reference.parent.property.name)
            ])
          )
        } else {
          reference.replaceWith(t.cloneDeep(styledIdentifier))
        }
        if (reference.parentPath && reference.parentPath.parentPath) {
          const styledCallPath = reference.parentPath.parentPath
          let { node } = transformExpressionWithStyles({
            path: styledCallPath,
            state,
            babel,
            shouldLabel: false
          })
          if (node && isWeb) {
            // we know the argument length will be 1 since that's the only time we will have a node since it will be static
            styledCallPath.node.arguments[0] = node
          }
        }
        reference.addComment('leading', '#__PURE__')

        if (t.isCallExpression(reference.parentPath)) {
          reference.parentPath.node.arguments[1] = getStyledOptions(
            t,
            reference.parentPath,
            state
          )
        }
      })
    }
    Object.keys(references)
      .filter(x => x !== 'default')
      .forEach(referenceKey => {
        let runtimeNode = addNamed(state.file.path, referenceKey, importPath)

        references[referenceKey].reverse().forEach(reference => {
          reference.replaceWith(t.cloneDeep(runtimeNode))
        })
      })
  })
