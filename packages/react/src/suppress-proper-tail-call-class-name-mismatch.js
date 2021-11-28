function classNameBelongsToCache(className, cacheKey) {
  // return className.startsWith(cacheKey + '-')

  // The following implementation is used because startsWith is not available in
  // IE. We can change this once IE support is dropped.
  return className.substring(0, cacheKey.length + 1) === cacheKey + '-'
}

function getLabelFromClassName(className, cacheKey) {
  // This is safe because cacheKey can only contain lowercase letters and hyphen
  return className.match(new RegExp(`^${cacheKey}-.+-(.+)`))?.[1]
}

function isPossiblyBenignClassNameMismatchCore(
  cache,
  serverClassName,
  browserClassName
) {}

export function isPossiblyBenignClassNameMismatch(
  cache,
  serverClassNames,
  browserClassNames
) {
  const serverClassNamesForCache = serverClassNames
    .split(' ')
    .filter(c => classNameBelongsToCache(c, cache.key))

  const browserClassNamesForCache = browserClassNames
    .split(' ')
    .filter(c => classNameBelongsToCache(c, cache.key))

  // Server is missing a label. This is not the result of PTC and therefore is
  // not benign.
  if (serverClassNamesForCache.some(c => !getLabelFromClassName(c, cache.key)))
    return false

  if (
    serverClassNamesForCache.length >= 1 &&
    browserClassNamesForCache.length >= 1 &&
    serverClassNamesForCache.length === browserClassNamesForCache.length
  ) {
    for (let i = 0; i < serverClassNamesForCache.length; i++) {
      const serverLabel = getLabelFromClassName(
        serverClassNamesForCache[i],
        cache.key
      )
      const browserLabel = getLabelFromClassName(
        browserClassNamesForCache[i],
        cache.key
      )

      const isPossibleBenign =
        typeof browserLabel === 'undefined' || serverLabel !== browserLabel

      if (!isPossibleBenign) return false
    }

    // All mismatchs are benign
    return true
  }

  // This code can be reached for a few reasons:
  // - These are non-Emotion class names.
  // - The class names are from a different Emotion cache.
  // - There were a different number of class names for this cache between the
  //   server and browser.
  //
  // In any of these cases, we should not suppress the warning.
  return false
}

const jsEngineDoesProperTailCalls = /* #__PURE__ */ (() => {
  function getStackTrace() {
    return new Error().stack
  }

  function __properTailCallTestFunction() {
    return getStackTrace()
  }

  return !__properTailCallTestFunction().includes(
    '__properTailCallTestFunction'
  )
})()

// WeakSet would be more appropriate, but only WeakMap is supported in IE11
const cachesForWhichConsoleErrorHasBeenOverridden =
  /* #__PURE__ */ new WeakMap()

/**
 * Runtime label extraction (getLabelFromStackTrace) will fail if the component
 * name is omitted from the stack trace due to a Proper Tail Call (PTC).
 * Safari's JavaScriptCore is the only JS engine to implement Proper Tail Calls,
 * so, if server-side rendering and Safari are used at the same time, label
 * extraction can succeed on the server but fail in the browser. This causes
 * React to emit a hydration warning because the Emotion class names do not
 * match.
 *
 * There are two ways label extraction can fail due to PTC:
 *
 * 1. getLabelFromStackTrace returns undefined.
 * 2. getLabelFromStackTrace returns the name of the PARENT of the component
 *    that used the CSS prop. (Or the parent's parent, .etc)
 *
 * We have no way to prevent the class name mismatch, so we override
 * console.error and hide class name mismatch warnings if it looks to be the
 * result of failed label extraction.
 *
 * This code only runs in development.
 */
export function suppressProperTailCallClassNameMismatch(cache) {
  if (!jsEngineDoesProperTailCalls) return
  if (cachesForWhichConsoleErrorHasBeenOverridden.get(cache)) return

  cachesForWhichConsoleErrorHasBeenOverridden.set(cache, true)

  const originalConsoleError = console.error

  // When a class name mismatch occurs, args will look like this:
  // [
  //   'Warning: Prop `%s` did not match. Server: %s Client: %s%s',
  //   'className',
  //   '"css-hm924o-MyComponent"',
  //   '"css-1hjg072"',
  //   'stack trace here'
  // ]

  console.error = (...args) => {
    if (
      Array.isArray(args) &&
      args.length >= 4 &&
      args[0] === 'Warning: Prop `%s` did not match. Server: %s Client: %s%s' &&
      args[1] === 'className'
    ) {
      const serverClassNames = args[2].replace(/"/g, '')
      const browserClassNames = args[3].replace(/"/g, '')

      if (
        isPossiblyBenignClassNameMismatch(
          cache,
          serverClassNames,
          browserClassNames
        )
      ) {
        // Suppress the warning by not calling originalConsoleError
        return
      }
    }

    originalConsoleError(...args)
  }
}
