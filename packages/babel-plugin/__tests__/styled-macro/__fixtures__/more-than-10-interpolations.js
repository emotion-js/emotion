import styled from '@emotion/styled/macro'

// yes, this was actually a bug at one point
const H1 = styled.h1`
  text-decoration: ${'underline'};
  border-right: solid blue ${54}px;
  background: ${'white'};
  color: ${'black'};
  display: ${'block'};
  border-radius: ${'3px'};
  padding: ${'25px'};
  width: ${'500px'};
  z-index: ${100};
  font-size: ${'18px'};
  text-align: ${'center'};
  border-left: ${p => p.theme.blue};
`
