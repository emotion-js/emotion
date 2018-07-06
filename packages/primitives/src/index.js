// @flow
import { Text, View, Image } from 'react-primitives'

import { createStyled } from './styled'

const assignPrimitives = styled => {
  createStyled.Text = createStyled(Text)
  createStyled.View = createStyled(View)
  createStyled.Image = createStyled(Image)

  return styled
}

export { css } from './css'

export default /* #__PURE__ */ assignPrimitives(createStyled)
