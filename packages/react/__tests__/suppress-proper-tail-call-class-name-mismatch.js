import { css } from '@emotion/react'
import { serializeStyles } from '@emotion/serialize'
import createCache from '@emotion/cache'
import {
  isBenignClassNameMismatch,
  suppressProperTailCallClassNameMismatch
} from '../src/suppress-proper-tail-call-class-name-mismatch'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'

const originalConsoleError = console.error

beforeEach(() => {
  console.error = originalConsoleError
})

afterEach(() => {
  console.error = originalConsoleError
})

const isStringTag = true
const cssObject0 = { color: 'orchid' }
const cssObject1 = { color: 'turquoise' }

function getClassNameWithLabel(cache, cssObject, label = 'MyComponent') {
  const serializedStyles = serializeStyles([cssObject, `label:${label};`])
  insertStyles(cache, serializedStyles, isStringTag)

  return `${cache.key}-${serializedStyles.name}`
}

function getClassNameWithoutLabel(cache, cssObject) {
  const serializedStyles = css(cssObject)
  insertStyles(cache, serializedStyles, isStringTag)

  return `${cache.key}-${serializedStyles.name}`
}

describe('isBenignClassNameMismatch', () => {
  describe('it returns true when browser is missing label', () => {
    test('basic', () => {
      const serverCache = createCache({ key: 'emo' })
      const serverClassName = getClassNameWithLabel(serverCache, cssObject0)

      const browserCache = createCache({ key: 'emo' })
      const browserClassName = getClassNameWithoutLabel(
        browserCache,
        cssObject0
      )

      expect(
        isBenignClassNameMismatch(
          serverClassName,
          browserClassName,
          browserCache
        )
      ).toBe(true)

      expect(
        isBenignClassNameMismatch(
          `user-class ${serverClassName}`,
          `user-class ${browserClassName}`,
          browserCache
        )
      ).toBe(true)
    })

    test('multiple class names from single cache', () => {
      const serverCache = createCache({ key: 'emo' })
      const serverClassName0 = getClassNameWithLabel(serverCache, cssObject0)
      const serverClassName1 = getClassNameWithLabel(serverCache, cssObject1)

      const browserCache = createCache({ key: 'emo' })
      const browserClassName0 = getClassNameWithoutLabel(
        browserCache,
        cssObject0
      )
      const browserClassName1 = getClassNameWithoutLabel(
        browserCache,
        cssObject1
      )

      expect(
        isBenignClassNameMismatch(
          `${serverClassName0} ${serverClassName1}`,
          `${browserClassName0} ${browserClassName1}`,
          browserCache
        )
      ).toBe(true)
    })

    test('class names from 2 different caches', () => {
      const serverCache0 = createCache({ key: 'emo-zero' })
      const serverClassName0 = getClassNameWithLabel(serverCache0, cssObject0)

      const serverCache1 = createCache({ key: 'emo-one' })
      const serverClassName1 = getClassNameWithLabel(serverCache1, cssObject1)

      const browserCache0 = createCache({ key: 'emo-zero' })
      const browserClassName0 = getClassNameWithoutLabel(
        browserCache0,
        cssObject0
      )

      const browserCache1 = createCache({ key: 'emo-one' })
      const browserClassName1 = getClassNameWithoutLabel(
        browserCache1,
        cssObject1
      )

      expect(
        isBenignClassNameMismatch(
          `${serverClassName0} ${serverClassName1}`,
          `${browserClassName0} ${browserClassName1}`,
          browserCache0
        )
      ).toBe(true)
    })
  })

  it('returns true when browser has wrong label', () => {
    const serverCache = createCache({ key: 'emo' })
    const serverClassName = getClassNameWithLabel(serverCache, cssObject0)

    const browserCache = createCache({ key: 'emo' })
    const browserClassName = getClassNameWithLabel(
      browserCache,
      cssObject0,
      'MyParentComponent'
    )

    expect(
      isBenignClassNameMismatch(serverClassName, browserClassName, browserCache)
    ).toBe(true)

    expect(
      isBenignClassNameMismatch(
        `user-class ${serverClassName}`,
        `user-class ${browserClassName}`,
        browserCache
      )
    ).toBe(true)
  })

  it('returns false for class names that do not belong to the cache', () => {
    const serverCache0 = createCache({ key: 'emo-zero' })
    const serverCache1 = createCache({ key: 'emo-one' })
    const serverClassName1 = getClassNameWithLabel(serverCache1, cssObject1)

    const browserCache0 = createCache({ key: 'emo-zero' })
    const browserCache1 = createCache({ key: 'emo-one' })
    const browserClassName1 = getClassNameWithoutLabel(
      browserCache1,
      cssObject1
    )

    expect(
      isBenignClassNameMismatch(
        serverClassName1,
        browserClassName1,
        browserCache0
      )
    ).toBe(false)

    expect(
      isBenignClassNameMismatch('user-class0', 'user-class1', browserCache0)
    ).toBe(false)
  })

  it('returns false when there is a benign class name mismatch and a legit class name mismatch', () => {
    const serverCache = createCache({ key: 'emo' })
    const serverClassName = getClassNameWithLabel(serverCache, cssObject0)

    const browserCache = createCache({ key: 'emo' })
    const browserClassName = getClassNameWithoutLabel(browserCache, cssObject0)

    expect(
      isBenignClassNameMismatch(
        serverClassName,
        `browser-only-class ${browserClassName}`,
        browserCache
      )
    ).toBe(false)

    expect(
      isBenignClassNameMismatch(
        `server-only-class ${serverClassName}`,
        `browser-only-class ${browserClassName}`,
        browserCache
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
