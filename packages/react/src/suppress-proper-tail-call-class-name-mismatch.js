import { serializeStyles } from '@emotion/serialize'
import { getRegisteredStyles } from '@emotion/utils'

function getLabelFromClassName(className, cacheKey) {
  // This is safe because cacheKey can only contain lowercase letters and hyphen
  return className.match(new RegExp(`^${cacheKey}-.+-(.+)`))?.[1]
}

// We don't use exec so it's fine to reuse a single RegExp instance
const labelPattern = /label:[^\s;\n{]+;/g

function areClassNamesEquivalent(serverClassName, browserClassName, cache) {
  if (serverClassName === browserClassName) return true

  const serverLabel = getLabelFromClassName(serverClassName, cache.key)
  if (!serverLabel) return false

  // This code must be equivalent to the code used in emotion-element.js to add the
  // runtime-generated label so that the serialized styles have the same hash
  const browserStyles = cache.registered[browserClassName]
  if (typeof browserStyles !== 'string') return false

  const serverLabelProperty = `label:${serverLabel};`
  let newBrowserStyles

  if (labelPattern.test(browserStyles)) {
    // browserClassName contains the wrong label

    newBrowserStyles = serializeStyles(
      browserStyles.replace(labelPattern, serverLabelProperty)
    )
  } else {
    // browserClassName does not contain a label

    // We add a semicolon here because that's what emotion-element.js /
    // getRegisteredStyles does
    newBrowserStyles = serializeStyles([
      browserStyles + ';',
      serverLabelProperty
    ])
  }

  const newBrowserClassName = `${cache.key}-${newBrowserStyles.name}`

  return serverClassName === newBrowserClassName
}

function classNameBelongsToCache(className, cacheKey) {
  // return className.startsWith(cacheKey + '-')

  // The following implementation is used because startsWith is not available in
  // IE. We can change this once IE support is dropped.
  return className.substring(0, cacheKey.length + 1) === cacheKey + '-'
}

const allCacheKeys = new Set()

export function __addCacheKeyForTesting(cacheKey) {
  allCacheKeys.add(cacheKey)
}

function groupClassNames(classNameString, cacheKey) {
  const thisCacheClassNames = []
  const otherCacheClassNames = []
  const nonEmotionClassNames = []

  classNameString.split(' ').forEach(className => {
    if (classNameBelongsToCache(className, cacheKey)) {
      thisCacheClassNames.push(className)
      return
    }

    if (
      Array.from(allCacheKeys).some(key =>
        classNameBelongsToCache(className, key)
      )
    ) {
      otherCacheClassNames.push(className)
      return
    }

    nonEmotionClassNames.push(className)
  })

  return {
    thisCacheClassNames,
    otherCacheClassNames,
    nonEmotionClassNames
  }
}

export function isBenignClassNameMismatch(
  serverClassNameString,
  browserClassNameString,
  cache
) {
  const {
    thisCacheClassNames: cacheServerClassNames,
    nonEmotionClassNames: nonEmotionServerClassNames
  } = groupClassNames(serverClassNameString, cache.key)

  const {
    thisCacheClassNames: cacheBrowserClassNames,
    nonEmotionClassNames: nonEmotionBrowserClassNames
  } = groupClassNames(browserClassNameString, cache.key)

  // Different number of class names - not benign.
  if (nonEmotionServerClassNames.length !== nonEmotionBrowserClassNames.length)
    return false

  if (cacheServerClassNames.length !== cacheBrowserClassNames.length)
    return false

  for (let i = 0; i < nonEmotionServerClassNames.length; i++) {
    if (nonEmotionServerClassNames[i] !== nonEmotionBrowserClassNames[i]) {
      return false
    }
  }

  let allExactMatches = true

  for (let i = 0; i < cacheServerClassNames.length; i++) {
    if (cacheServerClassNames[i] !== cacheBrowserClassNames[i]) {
      allExactMatches = false
      break
    }
  }
  if (allExactMatches) {
    // All class names for this cache match, so something else must be causing
    // the hydration warning.
    return false
  }

  // For each server class name, try to find the matching browser class name.
  for (let i = 0; i < cacheServerClassNames.length; i++) {
    if (
      !cacheBrowserClassNames.some(c =>
        areClassNamesEquivalent(cacheServerClassNames[i], c, cache)
      )
    ) {
      // Could not find a browser class name that was equivalent to the server
      // class except for the label, so this is not benign.
      return false
    }
  }

  // All the server class names have an equivalent browser class name, so this
  // hydration warning is benign.
  return true
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
  allCacheKeys.add(cache.key)

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
      const serverClassNameString = args[2].replace(/"/g, '')
      const browserClassNameString = args[3].replace(/"/g, '')

      if (
        isBenignClassNameMismatch(
          serverClassNameString,
          browserClassNameString,
          cache
        )
      ) {
        // Suppress the warning by not calling originalConsoleError
        return
      }
    }

    originalConsoleError(...args)
  }
}
