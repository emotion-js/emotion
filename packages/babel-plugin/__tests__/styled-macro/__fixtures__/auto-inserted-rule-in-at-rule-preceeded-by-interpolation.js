import styled from '@emotion/styled/macro'
import { css } from '@emotion/react'

const fullWidth = css`
  width: 100%;
`

const StyledRoot = styled.div`
  ${fullWidth}

  button {
    @media (min-width: 768px) {
      color: red;
    }
  }
`
