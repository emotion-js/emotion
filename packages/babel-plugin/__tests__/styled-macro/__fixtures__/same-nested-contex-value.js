import styled from '@emotion/styled/macro'

export const Comp = styled.div`
  > div {
    color: blue;

    > div {
      color: hotpink;
    }
  }
`
