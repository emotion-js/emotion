// @flow
import type { Interpolation, ScopedInsertableStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

let fakeRegisteredCache = {}

function css(...args: Array<Interpolation>): ScopedInsertableStyles {
  return serializeStyles(undefined, fakeRegisteredCache, args)
}

export default css
