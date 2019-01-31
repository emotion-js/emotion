// @flow
import styled from '@emotion/styled'
import { constants, mq, colors } from '../utils/style'

export default styled.h1(
  mq({
    fontSize: [constants.fontSizes[4], constants.fontSizes[5]],
    fontWeight: 800,
    margin: 0,
    color: colors.hightlight
  })
)
