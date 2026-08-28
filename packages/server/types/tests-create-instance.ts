import createEmotionServer from '@emotion/server/create-instance'
import { EmotionCache } from '@emotion/utils'

declare const cache: EmotionCache

// $ExpectType EmotionServer
createEmotionServer(cache)
// @ts-expect-error
createEmotionServer()

const emotionServer = createEmotionServer(cache)

// $ExpectType EmotionCritical
emotionServer.extractCritical('<div></div>')
// @ts-expect-error
emotionServer.extractCritical()
// @ts-expect-error
emotionServer.extractCritical('<div></div>', undefined as any)

// $ExpectType string
emotionServer.renderStylesToString('<div></div>')
// @ts-expect-error
emotionServer.renderStylesToString()
// @ts-expect-error
emotionServer.renderStylesToString('<div></div>', undefined as any)

// $ExpectType ReadWriteStream
emotionServer.renderStylesToNodeStream()
// @ts-expect-error
emotionServer.renderStylesToNodeStream(undefined as any)

declare const stream: NodeJS.ReadableStream
stream.pipe(emotionServer.renderStylesToNodeStream())
