import 'test-utils/next-env'
import { safeQuerySelector } from 'test-utils'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { render } from '@testing-library/react'

test('throws correct error with invalid key', () => {
  expect(() => {
    createCache({ key: '.' })
  }).toThrowErrorMatchingSnapshot()
})

it('should accept insertionPoint option', () => {
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
