// @flow
import styled from '@emotion/styled'
import { constants, mq, colors } from '../utils/style'
import * as markdownComponents from '../utils/markdown-styles'

type Props = {
  children: React$Node
}
export default styled<Props>(markdownComponents.h1)(
  mq({
    paddingTop: 0,
    marginTop: 0,
    marginBottom: constants.space[2],
    fontWeight: 700,
    color: [colors.hightlight, colors.hightlight, colors.color]
  })
)
