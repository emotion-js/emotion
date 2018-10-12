// @flow
import * as React from 'react'
import type { Scope, Compiler } from './types'

const evalCode = (code: string, scope: Scope): React.Node => {
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  let element
  const render = val => {
    if (element !== undefined) {
      throw new SyntaxError('`render` cannot be called twice.')
    }
    element = val
  }
  /* eslint-disable no-new-func */
  // $FlowFixMe
  const func = new Function('React', 'render', ...scopeKeys, code)
  func(React, render, ...scopeValues)
  /* eslint-enable no-new-func */
  if (element === undefined) {
    throw new SyntaxError('`render` must be called')
  }
  return element
}

export const evaluate = (code: string, scope: Scope) => {
  let error = null
  let element = null
  try {
    element = evalCode(code, scope)
  } catch (e) {
    error = e
  }
  return { error, element }
}

export const compileAndEvaluate = (
  code: string,
  compiler: Compiler,
  scope: Scope
): Promise<{ error: Error | null, element: React.Node | null }> => {
  return compiler(code)
    .then(compiledCode => {
      return evaluate(compiledCode, scope)
    })
    .catch(error => {
      return { error, element: null }
    })
}
