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
  ).innerHTML = `<style data-emotion-css="${hash}">.css-${hash}{${css}}</style>`
  let cache = createCache()
  expect(cache.inserted).toEqual({ [hash]: true })
  expect(document.documentElement).toMatchSnapshot()
})

test('rehydrated styles to head can be flushed', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)
  safeQuerySelector(
    'head'
  ).innerHTML = `<style data-emotion-emo="${hash}">.emo-${hash}{${css}}</style>`

  // this moves emotion style tags at initialization time
  jest.resetModules()
  require('@emotion/react')

  let cache = createCache({ key: 'emo' })
  expect(document.documentElement).toMatchSnapshot()
  cache.sheet.flush()
  expect(document.documentElement).toMatchSnapshot()
})
