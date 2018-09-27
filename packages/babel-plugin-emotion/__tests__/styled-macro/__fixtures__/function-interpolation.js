import styled from '@emotion/styled/macro'

let Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.borderColor};
`
