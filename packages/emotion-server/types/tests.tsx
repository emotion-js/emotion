import {
  extractCritical,
  renderStylesToNodeStream,
  renderStylesToString
} from 'emotion-server'

declare const renderedString: string
declare const renderedNodeStream: NodeJS.ReadableStream

// $ExpectType EmotionCritical
extractCritical(renderedString)
// $ExpectError
extractCritical()
// $ExpectError
extractCritical(renderedString, undefined as any)

// $ExpectType string
renderStylesToString(renderedString)
// $ExpectError
renderStylesToString()
// $ExpectError
renderStylesToString(renderedString, undefined as any)

// $ExpectType ReadWriteStream
renderStylesToNodeStream()
// $ExpectError
renderStylesToNodeStream(undefined as any)

renderedNodeStream.pipe(renderStylesToNodeStream())
