import createCache, { Options } from '@emotion/cache'

declare const testOptions: Options

// $ExpectType EmotionCache
createCache({ key: 'test-key' })
// $ExpectType EmotionCache
const cache = createCache(testOptions)

// $ExpectType StyleSheet
new cache.sheet.constructor({
  key: 'css',
  container: document.createElement('div')
})
