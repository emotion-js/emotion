// @flow
import styled from './base'
import { tags } from './tags'

// bind it to avoid mutating the original function
const newStyled = styled.bind()

tags.forEach(tagName => {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName)
})

export default newStyled
