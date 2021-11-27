function isBenignClassNameMismatch(cache, serverClassName, browserClassName) {
  return false
}

/**
 * Runtime label extraction (getLabelFromStackTrace) will fail if the component
 * name is omitted from the stack trace due to a Proper Tail Call optimization.
 * Safari's JavaScriptCore is the only JS engine to implement Proper Tail Calls,
 * so, if server-side rendering and Safari are used at the same time, label
 * extraction can succeed on the server but fail in the browser. This causes
 * React to emit a hydration warning because the Emotion class names do not
 * match.
 *
 * We have no way to prevent the class name mismatch, so we override
 * console.error and hide class name mismatch warnings if the styles in the
 * cache are the same except the label.
 *
 * This code only runs in development.
 */
export function suppressSafariClassNameMismatch(cache) {
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
      if (isBenignClassNameMismatch(cache, args[2], args[3])) {
        // Suppress the warning by not calling originalConsoleError
        return
      }
    }

    originalConsoleError(...args)
  }
}
