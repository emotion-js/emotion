import { StyleSheet, Text, View, Image } from 'react-primitives'
import { createCss } from '@emotion/primitives-core'

import { styled as createStyled, Styled, BaseStyled } from './styled'

const css = createCss(StyleSheet)

const assignPrimitives = (styled: BaseStyled): Styled => {
  // bind it to avoid mutating the original function
  const newStyled = styled.bind(undefined) as Styled

  newStyled.Text = createStyled(Text)
  newStyled.View = createStyled(View)
  newStyled.Image = createStyled(Image)

  return newStyled
}

export { css }
export type { Styled }

export default /* #__PURE__ */ assignPrimitives(createStyled)
