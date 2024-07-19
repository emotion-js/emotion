import hash from '@emotion/hash'

test('accepts a string and returns a string as a hash', () => {
  expect(hash('something')).toBe('crsxd7')
})
