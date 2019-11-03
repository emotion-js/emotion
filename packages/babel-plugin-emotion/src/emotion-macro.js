// @flow
import { transformExpressionWithStyles } from './utils'
import { addNamed } from '@babel/helper-module-imports'
import { createMacro } from 'babel-plugin-macros'

const isAlreadyTranspiled = path => {
  if (!path.isCallExpression()) {
    return false
  }

  const firstArgPath = path.get('arguments.0')

  if (!firstArgPath) {
    return false
  }

  if (!firstArgPath.isConditionalExpression()) {
    return false
  }

  const alternatePath = firstArgPath.get('alternate')

  if (!alternatePath.isObjectExpression()) {
    return false
  }

  const properties = new Set(
    alternatePath.get('properties').map(p => p.node.key.name)
  )

  return ['name', 'styles'].every(p => properties.has(p))
}

export let createEmotionMacro = (instancePath: string) =>
  createMacro(function macro({ references, state, babel, isEmotionCall }) {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }

    let t = babel.types
    Object.keys(references).forEach(referenceKey => {
      let isPure = true
      let runtimeNode = addNamed(state.file.path, referenceKey, instancePath)

      switch (referenceKey) {
        case 'injectGlobal': {
          isPure = false
        }
        // eslint-disable-next-line no-fallthrough
        case 'css':
        case 'keyframes': {
          references[referenceKey].reverse().forEach(reference => {
            const path = reference.parentPath

            if (isAlreadyTranspiled(path)) {
              return
            }

            reference.replaceWith(t.cloneDeep(runtimeNode))
            if (isPure) {
              path.addComment('leading', '#__PURE__')
            }
            let { node } = transformExpressionWithStyles({
              babel,
              state,
              path,
              shouldLabel: true
            })
            if (node) {
              path.node.arguments[0] = node
            }
          })
          break
        }
        default: {
          references[referenceKey].reverse().forEach(reference => {
            reference.replaceWith(t.cloneDeep(runtimeNode))
          })
        }
      }
    })
  })
