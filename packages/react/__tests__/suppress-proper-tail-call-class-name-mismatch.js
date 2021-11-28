import {
  isPossiblyBenignClassNameMismatch,
  suppressProperTailCallClassNameMismatch
} from '../src/suppress-proper-tail-call-class-name-mismatch'
import createCache from '@emotion/cache'

const originalConsoleError = console.error

beforeEach(() => {
  console.error = originalConsoleError
})

afterEach(() => {
  console.error = originalConsoleError
})

describe('isPossiblyBenignClassNameMismatch', () => {
  it('returns true when browser is missing label', () => {
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent',
        'emo-def456'
      )
    ).toBe(true)

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'user-class emo-abc123-MyComponent',
        'user-class emo-def456'
      )
    ).toBe(true)

    // It is possible to get multiple class names from the same cache
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent emo-abc456-MyComponent',
        'emo-def456 emo-def123'
      )
    ).toBe(true)

    // It is possible to get class names from different Emotion classes
    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent css-abc456-MyComponent',
        'emo-def456 css-def123'
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

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'user-class emo-abc123-MyComponent',
        'user-class emo-def456-ParentComponent'
      )
    ).toBe(true)

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent emo-abc456-MyComponent',
        'emo-def456-ParentComponent emo-def123-ParentComponent'
      )
    ).toBe(true)

    expect(
      isPossiblyBenignClassNameMismatch(
        createCache({ key: 'emo' }),
        'emo-abc123-MyComponent css-abc456-MyComponent',
        'emo-def456-ParentComponent css-def123-ParentComponent'
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

describe('suppressProperTailCallClassNameMismatch', () => {
  it('is a no-op in Node', () => {
    const cache = createCache({ key: 'emo' })
    suppressProperTailCallClassNameMismatch(cache)

    expect(console.error).toBe(originalConsoleError)
  })
})
