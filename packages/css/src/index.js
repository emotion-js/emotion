// @flow
import type { Interpolation, SerializedStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

let fakeRegisteredCache = {}

function css(...args: Array<Interpolation>): SerializedStyles {
  return serializeStyles(fakeRegisteredCache, args)
}

export default css
