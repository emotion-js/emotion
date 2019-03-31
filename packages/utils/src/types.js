// @flow
/*::
import { StyleSheet } from '@emotion/sheet'

*/

export type RegisteredCache = { [string]: string }

export type Interpolation = any

export type SerializedStyles = {|
  name: string,
  styles: string,
  map?: string,
  next?: SerializedStyles
|}

export type EmotionCache = {
  inserted: { [string]: string | true },
  registered: RegisteredCache,
  sheet: StyleSheet,
  key: string,
  compat?: true,
  nonce?: string,
  emotionPlugins?: Array<(args: Array<Interpolation>) => Array<Interpolation>>,
  insert: (
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ) => string | void
}
