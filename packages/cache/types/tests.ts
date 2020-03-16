import createCache, { Options } from '@emotion/cache'

declare const testOptions: Options

// $ExpectType EmotionCache
createCache({ key: 'test-key' })
// $ExpectType EmotionCache
createCache(testOptions)
