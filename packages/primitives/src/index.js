// @flow
import { StyleSheet, Text, View, Image } from 'react-primitives'
import { createCss } from '@emotion/primitives-core'

import { styled as createStyled } from './styled'

const css = createCss(StyleSheet)

const assignPrimitives = styled => {
  createStyled.Text = createStyled(Text)
  createStyled.View = createStyled(View)
  createStyled.Image = createStyled(Image)

  return styled
}

export { css }

export default /* #__PURE__ */ assignPrimitives(createStyled)
