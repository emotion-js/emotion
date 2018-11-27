// @flow
import styled from '@emotion/styled'
import { constants, mq } from '../utils/style'

export default styled.h1(
  mq({
    fontSize: [constants.fontSizes[5], constants.fontSizes[6]],
    fontWeight: 500,
    marginTop: 0,
    color: '#fb84bf',
    marginBottom: constants.space[1]
  })
)
