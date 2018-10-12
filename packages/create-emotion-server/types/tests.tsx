import createEmotionServer from 'create-emotion-server'
import { EmotionCache } from '@emotion/utils'

declare const cache: EmotionCache

// $ExpectType EmotionServer
createEmotionServer(cache)
// $ExpectError
createEmotionServer()

const emotionServer = createEmotionServer(cache)

// $ExpectType EmotionCritical
emotionServer.extractCritical('<div></div>')
// $ExpectError
emotionServer.extractCritical()
// $ExpectError
emotionServer.extractCritical('<div></div>', undefined as any)

// $ExpectType string
emotionServer.renderStylesToString('<div></div>')
// $ExpectError
emotionServer.renderStylesToString()
// $ExpectError
emotionServer.renderStylesToString('<div></div>', undefined as any)

// $ExpectType ReadWriteStream
emotionServer.renderStylesToNodeStream()
// $ExpectError
emotionServer.renderStylesToNodeStream(undefined as any)

declare const stream: NodeJS.ReadableStream
stream.pipe(emotionServer.renderStylesToNodeStream())
