// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { safeQuerySelector } from 'test-utils'
import createCache from '@emotion/cache'
import { jsx, CacheProvider } from '@emotion/react'
import renderer from 'react-test-renderer'

test('throws correct error with invalid key', () => {
  expect(() => {
    createCache({ key: '.' })
  }).toThrowErrorMatchingSnapshot()
})

function render(ele) {
  return renderer.create(ele).toJSON()
}

it('should accept insertionPoint option', () => {
  const head = safeQuerySelector('head')
  const firstStyle = document.createElement('style')
  firstStyle.setAttribute('id', 'first')
  head.appendChild(firstStyle)

  const thirdStyle = document.createElement('style')
  thirdStyle.setAttribute('id', 'third')
  head.appendChild(thirdStyle)

  // the sheet should be inserted between the first and third style node
  const cache = createCache({
    key: 'test-insertion-point',
    insertionPoint: firstStyle
  })

  render(
    <CacheProvider value={cache}>
      <div css={{ display: 'flex', color: 'blue' }} />
    </CacheProvider>
  )

  expect(document.documentElement).toMatchSnapshot()
})
