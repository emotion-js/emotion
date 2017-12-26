import styled from 'react-emotion'
import { constants, mq } from '../utils/style'

const Title = styled.h1(
  mq({
    fontSize: [constants.fontSizes[6], constants.fontSizes[7]],
    fontWeight: 500,
    marginTop: 0
  })
)

export default Title
