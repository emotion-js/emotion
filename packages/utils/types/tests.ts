import {
  EmotionCache,
  RegisteredCache,
  getRegisteredStyles,
  insertStyles
} from '@emotion/utils'

declare const testCache: EmotionCache
declare const testRegisteredCache: RegisteredCache

getRegisteredStyles(testRegisteredCache, [], 'abc')
getRegisteredStyles(testRegisteredCache, [], 'abc def')
getRegisteredStyles(testRegisteredCache, [], 'dead end')
getRegisteredStyles(testRegisteredCache, ['color: red;'], 'black parade')
// @ts-expect-error
getRegisteredStyles()
// @ts-expect-error
getRegisteredStyles(testRegisteredCache)

insertStyles(
  testCache,
  {
    name: 'abc',
    styles: 'color: green;background: red;'
  },
  false
)
// @ts-expect-error
insertStyles()
// @ts-expect-error
insertStyles(testCache)
// @ts-expect-error
insertStyles(testCache, {})
// @ts-expect-error
insertStyles(testCache, {
  name: 'abc',
  styles: 'font-size: 18px;'
})
