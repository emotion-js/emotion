/* eslint-env jest */

export function throwIfFalsy(something) {
  if (something) {
    return something
  }
  throw new Error('something is falsy')
}

export function ignoreConsoleErrors(cb /*: () => mixed */) {
  let oldConsoleError = console.error
  console.error = jest.fn()

  try {
    cb()
  } finally {
    console.error = oldConsoleError
  }
}

export let safeQuerySelector = (selector /*: string */) /*: HTMLElement */ => {
  let element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Could not find element matching selector "${selector}"`)
  }
  return element
}

// React 18 doesn't use this attribute anymore
// we normalize this to avoid snapshot mismatches between React versions
export let stripDataReactRoot = (html /*: string*/) /*: string*/ =>
  html.replace(' data-reactroot=""', '')

const removeGlobalProp = prop => {
  let descriptor = Object.getOwnPropertyDescriptor(global, prop)
  Object.defineProperty(global, prop, {
    value: undefined,
    writable: true,
    configurable: true
  })
  // $FlowFixMe
  return () => Object.defineProperty(global, prop, descriptor)
}

// TODO: export async function disableBrowserEnvTemporarily<T>(fn: () => T): Promise<T> {
export async function disableBrowserEnvTemporarily(fn) {
  let restoreDocument = removeGlobalProp('document')
  let restoreWindow = removeGlobalProp('window')
  let restoreHTMLElement = removeGlobalProp('HTMLElement')
  try {
    return fn()
  } finally {
    restoreDocument()
    restoreWindow()
    restoreHTMLElement()
  }
}
