// @flow
import { safeQuerySelector } from 'test-utils'
import hashString from '@emotion/hash'
import createCache from '@emotion/cache'

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
