// @flow
import type { Interpolation, SerializedStyles } from '@emotion/utils'
import { basicSerializeStyles } from '@emotion/serialize'

function css(...args: Array<Interpolation>): SerializedStyles {
  return basicSerializeStyles(args)
}

export default css
