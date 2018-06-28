// @flow
import styled from '@emotion/styled'
import { constants, mq } from '../utils/style'

const Title = styled.h1(
  mq({
    fontSize: [constants.fontSizes[6], constants.fontSizes[7]],
    fontWeight: 500,
    marginTop: 0,
    color: '#fb84bf',
    marginBottom: constants.space[1]
  })
)

export default Title
