// @flow
import { Text, View, Image } from 'react-primitives'

import { createStyled } from './styled'

const assignPrimitives = styled => {
  // $FlowFixMe
  createStyled.Text = createStyled(Text)
  // $FlowFixMe
  createStyled.View = createStyled(View)
  // $FlowFixMe
  createStyled.Image = createStyled(Image)

  return styled
}

export { css } from './css'

export default /* #__PURE__ */ assignPrimitives(createStyled)
