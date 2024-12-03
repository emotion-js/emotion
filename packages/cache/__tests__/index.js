/** @jsx jsx */
import 'test-utils/next-env'
import { safeQuerySelector } from 'test-utils'
import createCache from '@emotion/cache'
import { jsx, CacheProvider } from '@emotion/react'
import { render } from '@testing-library/react'

test('throws correct error with invalid key', () => {
  expect(() => {
    createCache({ key: '.' })
  }).toThrowErrorMatchingSnapshot()
})

test('throws an error when cache is created with an empty key', () => {
  expect(() => {
    createCache({ key: '' })
  }).toThrowErrorMatchingSnapshot()
})

test('should accept insertionPoint option', () => {
  const head = safeQuerySelector('head')

  head.innerHTML = `
    <style id="first"></style>
    <style id="last"></style>
  `

  // the sheet should be inserted between the first and last style nodes
  const cache = createCache({
    key: 'test-insertion-point',
    insertionPoint: safeQuerySelector('#first')
  })

  render(
    <CacheProvider value={cache}>
      <div css={{ display: 'flex', color: 'blue' }} />
    </CacheProvider>
  )

  expect(document.head).toMatchSnapshot()
})

test('should accept container option', () => {
  const body = safeQuerySelector('body')

  body.innerHTML = `
    <div id="container" />
  `

  const cache = createCache({
    key: 'test-container',
    container: safeQuerySelector('#container')
  })

  render(
    <CacheProvider value={cache}>
      <div css={{ display: 'flex', color: 'blue' }} />
    </CacheProvider>
  )

  expect(document.body).toMatchSnapshot()
})
