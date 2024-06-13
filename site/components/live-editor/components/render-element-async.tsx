import React, { ReactElement } from 'react'
import { ErrorBoundary } from './error-boundary'

export type Scope = Record<string, unknown>

function evalCode(code: string, scope: Scope) {
  const scopeKeys = Object.keys(scope)
  const scopeValues = Object.values(scope)

  const func = new Function('React', ...scopeKeys, code)
  return func(React, ...scopeValues)
}

export async function renderElementAsync(
  code: string,
  scope: Scope,
  onError: (error: unknown) => void
): Promise<ReactElement> {
  return new Promise((resolve, reject) => {
    function render(element: ReactElement) {
      if (!element) reject(new Error('`render` must be called with valid JSX.'))

      resolve(<ErrorBoundary onError={onError}>{element}</ErrorBoundary>)
    }

    if (!/render\s*\(/.test(code)) {
      throw new Error('You must call `render`.')
    }

    evalCode(code, { ...scope, render })
  })
}
