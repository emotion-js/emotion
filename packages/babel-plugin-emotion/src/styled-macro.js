// @flow
import {
  transformExpressionWithStyles,
  getStyledOptions,
  addImport,
  createTransformerMacro
} from './utils'

export let styledTransformer = ({
  state,
  babel,
  importPath,
  reference,
  importSpecifierName,
  options: {
    baseImport: [
      baseImportPath = importPath,
      baseImportSpecifierName = importSpecifierName
    ] = [],
    isWeb
  }
}: Object) => {
  let getStyledIdentifier = () => {
    return addImport(state, baseImportPath, baseImportSpecifierName, 'styled')
  }
  let getOriginalImportPathStyledIdentifier = () => {
    return addImport(state, importPath, importSpecifierName, 'styled')
  }
  let t = babel.types
  let isCall = false
  if (
    t.isMemberExpression(reference.parent) &&
    reference.parent.computed === false
  ) {
    isCall = true
    if (
      // checks if the first character is lowercase
      // becasue we don't want to transform the member expression if
      // it's in primitives/native
      reference.parent.property.name.charCodeAt(0) > 96
    ) {
      reference.parentPath.replaceWith(
        t.callExpression(getStyledIdentifier(), [
          t.stringLiteral(reference.parent.property.name)
        ])
      )
    } else {
      reference.replaceWith(getStyledIdentifier())
    }
  } else if (
    reference.parentPath &&
    reference.parentPath.parentPath &&
    t.isCallExpression(reference.parentPath) &&
    reference.parent.callee === reference.node
  ) {
    isCall = true
    reference.replaceWith(getStyledIdentifier())
  } else {
    reference.replaceWith(getOriginalImportPathStyledIdentifier())
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

  if (isCall) {
    reference.addComment('leading', '#__PURE__')
    if (isWeb) {
      reference.parentPath.node.arguments[1] = getStyledOptions(
        t,
        reference.parentPath,
        state
      )
    }
  }
}

export let createStyledMacro = ({
  importPath,
  originalImportPath = importPath,
  baseImportSpecifierName = 'default',
  isWeb
}: {
  importPath: string,
  originalImportPath?: string,
  isWeb: boolean
}) =>
  createTransformerMacro(
    {
      default: [
        styledTransformer,
        {
          baseImport: [importPath, baseImportSpecifierName],
          isWeb
        }
      ]
    },
    originalImportPath
  )
