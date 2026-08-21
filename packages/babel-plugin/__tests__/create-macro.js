import { macros } from '@emotion/babel-plugin'
import { createMacro, MacroError } from '../src/utils/create-macro'

// The real babel-plugin-macros package checks `macro.isBabelMacro` and reads
// `configName` from `macro.options` when users consume our /macro entrypoints
// (e.g. @emotion/react/macro) through it. These tests pin that contract.
test('macros expose the babel-plugin-macros interop contract', () => {
  expect(Object.keys(macros).length).toBeGreaterThan(0)
  Object.keys(macros).forEach(name => {
    expect(macros[name].isBabelMacro).toBe(true)
    expect(macros[name].options).toEqual({})
  })
})

test('calling a macro outside of a macros-aware compilation throws MacroError', () => {
  const macro = createMacro(() => {})
  expect(() => macro({ source: 'some/macro' })).toThrow(
    /is being executed outside the context of compilation/
  )
  let error
  try {
    macro({ source: 'some/macro' })
  } catch (e) {
    error = e
  }
  expect(error.name).toBe('MacroError')
  // the same guard protects the shipped macros (e.g. @emotion/react/macro)
  expect(() => macros.core({ source: '@emotion/react/macro' })).toThrow(
    /is being executed outside the context of compilation/
  )
})

test('invokes the wrapped macro and returns its result when isBabelMacrosCall is set', () => {
  const inner = jest.fn(() => ({ keepImports: true }))
  const macro = createMacro(inner)
  const args = { source: 'some/macro', isBabelMacrosCall: true }
  expect(macro(args)).toEqual({ keepImports: true })
  expect(inner).toHaveBeenCalledTimes(1)
  expect(inner).toHaveBeenCalledWith(args)
})

test('stamps the provided options on the wrapper', () => {
  const macro = createMacro(() => {}, { configName: 'emotion' })
  expect(macro.isBabelMacro).toBe(true)
  expect(macro.options).toEqual({ configName: 'emotion' })
})

test('throws when the reserved configName "options" is used', () => {
  expect(() => createMacro(() => {}, { configName: 'options' })).toThrow(
    /You cannot use the configName "options"/
  )
})

test('MacroError is an Error subclass with the correct name and message', () => {
  const error = new MacroError('boom')
  expect(error).toBeInstanceOf(Error)
  expect(error.name).toBe('MacroError')
  expect(error.message).toBe('boom')
})
