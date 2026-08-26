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

test('should correctly prefix margin-inline and padding-inline properties without stripping CSS variable names', () => {
  const cache = createCache({ key: 'test-inline-prefix' })

  try {
    cache.insert(
      '.test1',
      { name: '1', styles: 'margin-inline-end: var(--my-margin-inline-end);' },
      cache.sheet,
      true
    )
    cache.insert(
      '.test2',
      {
        name: '2',
        styles: 'padding-inline-start: var(--my-padding-inline-start);'
      },
      cache.sheet,
      true
    )

    expect(
      cache.sheet.tags
        .map(
          tag =>
            tag.textContent ||
            Array.from(tag.sheet.cssRules)
              .map(r => r.cssText)
              .join('')
        )
        .join('')
    ).toMatchInlineSnapshot(
      `".test1{-webkit-margin-end:var(--my-margin-inline-end);margin-inline-end:var(--my-margin-inline-end);}.test2{-webkit-padding-start:var(--my-padding-inline-start);padding-inline-start:var(--my-padding-inline-start);}"`
    )
  } finally {
    cache.sheet.flush()
  }
})
