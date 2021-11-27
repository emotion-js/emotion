import {
  isPossiblyBenignClassNameMismatch,
  suppressSafariClassNameMismatch
} from '../src/suppress-safari-class-name-mismatch'
import createCache from '@emotion/cache'

describe('isPossiblyBenignClassNameMismatch', () => {
  it('returns true when browser is missing label', () => {
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent',
        'emo-def456'
      )
    ).toBe(true)
  })

  it('returns true when browser has wrong label', () => {
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent',
        'emo-def456-ParentComponent'
      )
    ).toBe(true)
  })

  it('returns false for class names that do not belong to the cache', () => {
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'css-abc123-MyComponent',
        'css-def456'
      )
    ).toBe(false)

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent',
        'css-def456'
      )
    ).toBe(false)

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'some-class',
        'some-class2'
      )
    ).toBe(false)
  })
})

describe('suppressSafariClassNameMismatch', () => {
  it('is a no-op in Node', () => {
    const originalConsoleError = console.error

    const cache = createCache({ key: 'emo' })
    suppressSafariClassNameMismatch(cache)

    expect(console.error).toBe(originalConsoleError)
  })
})
