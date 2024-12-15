import React from 'react'
import { jsxs } from 'react/jsx-runtime'
import { registerStyles, EmotionCache, SerializedStyles } from '@emotion/utils'

export const renderWithStyles = (
  element: React.ReactNode,
  cache: EmotionCache,
  serializedArray: SerializedStyles[],
  isStringTag: boolean
) => {
  const output: React.ReactNode[] = []

  for (let i = 0; i < serializedArray.length; i++) {
    debugger
    const serialized = serializedArray[i]
    registerStyles(cache, serialized, isStringTag)

    let className = `${cache.key}-${serialized.name}`

    let styles = ''
    const sheet: Pick<EmotionCache['sheet'], 'insert'> = {
      insert: rule => {
        styles += rule
      }
    }

    let current: SerializedStyles | undefined = serialized
    do {
      if (cache.inserted[current.name] === undefined) {
        styles = ''
        let maybeStyles = cache.insert(
          current === current ? `.${className}` : '',
          current,
          sheet,
          true
        )
        output.push(
          <style
            precedence={`emotion-${cache.key}`}
            nonce={cache.sheet.nonce}
            href={current.name}
          >
            {maybeStyles ?? styles}
          </style>
        )
      } else {
        output.push(
          <style
            precedence={`emotion-${cache.key}`}
            nonce={cache.sheet.nonce}
            href={current.name}
          />
        )
      }
      current = current.next
    } while (current !== undefined)
  }

  output.push(element)
  return jsxs(React.Fragment, { children: output })
}
