// @flow
import { safeQuerySelector } from 'test-utils'
import hashString from '@emotion/hash'
import createCache from '@emotion/cache'

beforeEach(() => {
  safeQuerySelector('head').innerHTML = ''
  safeQuerySelector('body').innerHTML = ''
})

test('it works', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)
  safeQuerySelector(
    'body'
  ).innerHTML = `<style data-emotion="css ${hash}">.css-${hash}{${css}}</style>`
  let cache = createCache({ key: 'css' })
  expect(cache.inserted).toEqual({ [hash]: true })
  expect(document.documentElement).toMatchSnapshot()
})

test('rehydrated styles to head can be flushed', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)
  safeQuerySelector(
    'head'
  ).innerHTML = `<style data-emotion="emo ${hash}">.emo-${hash}{${css}}</style>`

  // this moves emotion style tags at initialization time
  jest.resetModules()
  require('@emotion/react')

  let cache = createCache({ key: 'emo' })
  expect(document.documentElement).toMatchSnapshot()
  cache.sheet.flush()
  expect(document.documentElement).toMatchSnapshot()
})

test('flushing rehydrated styles in the head only affect styles matching the cache key', () => {
  const css = `color:hotpink;`
  const hash = hashString(css)
  safeQuerySelector('head').innerHTML = [
    '<style data-emotion="emo 1lrxbo5">.emo-1lrxbo5{color:hotpink;}</style>',
    '<style data-emotion="css qweqwee">.css-qweqwee{color:red;}</style>'
  ].join('')

  // this moves emotion style tags at initialization time
  jest.resetModules()
  require('@emotion/react')

  const cache = createCache({ key: 'emo' })
  expect(document.documentElement).toMatchSnapshot()

  cache.sheet.flush()
  expect(document.documentElement).toMatchSnapshot()
})

test('Should only mount style elements matching the cache key', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)

  safeQuerySelector(
    'body'
  ).innerHTML = `<style data-emotion="emo ${hash}">.css-${hash}{${css}}</style>`

  const cache = createCache({ key: 'css' })

  expect(cache.inserted).toEqual({})
  expect(document.documentElement).toMatchSnapshot()

  const cache2 = createCache({ key: 'emo' })

  expect(cache2.inserted).toEqual({ [hash]: true })
  expect(document.documentElement).toMatchSnapshot()
})

describe('In production mode', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production'
  })

  afterEach(() => {
    process.env.NODE_ENV = 'test'
  })

  test('Existing head styles should not be remounted', () => {
    safeQuerySelector('head').innerHTML = [
      '<style data-emotion="css-global"></style>',
      '<style data-emotion="css"></style>',
      '<style>.my-div{color: red;}</style>'
    ].join('')

    const css = `color:hotpink;`
    const hash = hashString(css)

    safeQuerySelector(
      'body'
    ).innerHTML = `<style data-emotion="css ${hash}">.css-${hash}{${css}}</style>`

    createCache({ key: 'css' })

    expect(document.documentElement).toMatchSnapshot()
  })
})
