import {
  extractCritical,
  renderStylesToNodeStream,
  renderStylesToString
} from '@emotion/server'

declare const renderedString: string
declare const renderedNodeStream: NodeJS.ReadableStream

// $ExpectType EmotionCritical
extractCritical(renderedString)
// @ts-expect-error
extractCritical()
// @ts-expect-error
extractCritical(renderedString, undefined as any)

// $ExpectType string
renderStylesToString(renderedString)
// @ts-expect-error
renderStylesToString()
// @ts-expect-error
renderStylesToString(renderedString, undefined as any)

// $ExpectType ReadWriteStream
renderStylesToNodeStream()
// @ts-expect-error
renderStylesToNodeStream(undefined as any)

renderedNodeStream.pipe(renderStylesToNodeStream())
