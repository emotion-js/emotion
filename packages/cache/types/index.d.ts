export type Options = {
  nonce?: string
  stylisPlugins?: StylisPlugin[]
  key: string
  container?: HTMLElement
  speedy?: boolean
  prepend?: boolean
}
export default createCache
import { StylisPlugin } from './types'
declare function createCache(options: Options): any
