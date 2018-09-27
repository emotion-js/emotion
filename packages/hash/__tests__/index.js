import hash from '@emotion/hash'

it('accepts a string and returns a string as a hash', () => {
  expect(hash('something')).toBe('crsxd7')
})
