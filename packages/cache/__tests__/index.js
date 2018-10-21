// @flow
import createCache from '@emotion/cache'

test('throws correct error with invalid key', () => {
  expect(() => {
    createCache({ key: '.' })
  }).toThrowErrorMatchingSnapshot()
})

// test('with prefix option', () => {
//   let { stylis } = createCache({ prefix: false })

//   expect(stylis('.css-hash', 'display:flex;')).toEqual([
//     '.css-hash{display:flex;}'
//   ])
// })
