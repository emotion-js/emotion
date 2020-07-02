import { injectGlobal } from '@emotion/css/macro'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    & > div {
      display: flex;
    }
  }
  html {
    background: green;
  }
`
