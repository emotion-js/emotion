function classNameBelongsToCache(className, cacheKey) {
  return className.startsWith(cacheKey + '-')
}

function getLabelFromClassName(className, cacheKey) {
  const withoutCacheKey = className.replace(cacheKey + '-', '')
  const parts = withoutCacheKey.split('-')

  return parts.length === 2 ? parts[1] : undefined
}

export function isPossiblyBenignClassNameMismatch(
  cache,
  serverClassName,
  browserClassName
) {
  const serverLabel = getLabelFromClassName(serverClassName, cache.key)
  const browserLabel = getLabelFromClassName(browserClassName, cache.key)

  const browserIsMissingLabel =
    typeof serverLabel === 'string' && typeof browserLabel === 'undefined'

  const browserHasDifferentLabel =
    typeof serverLabel === 'string' &&
    typeof browserLabel === 'string' &&
    serverLabel !== browserLabel

  return (
    classNameBelongsToCache(serverClassName, cache.key) &&
    classNameBelongsToCache(browserClassName, cache.key) &&
    (browserIsMissingLabel || browserHasDifferentLabel)
  )
}

function getStackTrace() {
  return new Error().stack
}

function __properTailCallTestFunction() {
  return getStackTrace()
}

const jsEngineDoesProperTailCalls = !__properTailCallTestFunction().includes(
  '__properTailCallTestFunction'
)

/**
 * Runtime label extraction (getLabelFromStackTrace) will fail if the component
 * name is omitted from the stack trace due to a Proper Tail Call optimization.
 * Safari's JavaScriptCore is the only JS engine to implement Proper Tail Calls,
 * so, if server-side rendering and Safari are used at the same time, label
 * extraction can succeed on the server but fail in the browser. This causes
 * React to emit a hydration warning because the Emotion class names do not
 * match.
 *
 * There are two ways label extraction can fail in Safari:
 *
 * 1. getLabelFromStackTrace returns undefined.
 * 2. getLabelFromStackTrace returns the name of the PARENT of the component
 *    that used the CSS prop. (Or the parent's parent, .etc)
 *
 * We have no way to prevent the class name mismatch, so we override
 * console.error and hide class name mismatch warnings if the styles in the
 * cache are the same except the label.
 *
 * This code only runs in development.
 */
export function suppressSafariClassNameMismatch(cache) {
  if (!jsEngineDoesProperTailCalls) return
  if (cache.consoleErrorOverridden) return

  cache.consoleErrorOverridden = true

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
      if (
        isPossiblyBenignClassNameMismatch(
          cache,
          args[2].replace(/"/g, ''),
          args[3].replace(/"/g, '')
        )
      ) {
        // Suppress the warning by not calling originalConsoleError
        return
      }
    }

    originalConsoleError(...args)
  }
}
