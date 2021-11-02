// those identifiers come from error stacks, so they have to be valid JS identifiers
// thus we only need to replace what is a valid character for JS, but not for CSS
const sanitizeIdentifier = (identifier: string) =>
  identifier.replace(/\$/g, '-')

export const getFunctionNameFromIdentifier = (identifier: string): ?string => {
  if (!identifier) return undefined

  const parts = identifier.split('.')
  return parts[parts.length - 1]
}

export const getFunctionNameFromStackTraceLine = (line: string): ?string => {
  if (/^\s+at\s+/.test(line)) {
    // V8
    const match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line)

    if (match) return getFunctionNameFromIdentifier(match[1])
  } else {
    // Safari / Firefox
    const match = /^([A-Za-z0-9$.]+)@/.exec(line)

    if (match) return match[1]
  }

  return undefined
}

export const getLabelFromStackTrace = (stackTrace: string): ?string => {
  if (!stackTrace) return undefined

  const lines = stackTrace.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const functionName = getFunctionNameFromStackTraceLine(lines[i])
  }

  // Chrome
  // let match = stackTrace.match(
  //   /at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z0-9$]+) /
  // )
  // if (!match) {
  //   // Safari and Firefox — get the first function name that starts with a capital letter
  //   match = stackTrace.match(/.*\n([A-Z][A-Za-z0-9$]+)@/)
  // }
  // if (match) {
  //   return sanitizeIdentifier(match[1])
  // }

  return undefined
}
