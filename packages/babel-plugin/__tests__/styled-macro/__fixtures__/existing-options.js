import styled from '@emotion/styled/macro'

styled('div', { shouldForwardProp: window.whatever }, window.whatever)()

styled('div', { shouldForwardProp: window.whatever }, window.whatever)``

styled(
  window.whatever,
  { shouldForwardProp: window.whatever },
  window.whatever
)()

styled(
  window.whatever,
  { shouldForwardProp: window.whatever },
  window.whatever
)``

const cfg = { shouldForwardProp: window.whatever }
styled('button', cfg)({})
