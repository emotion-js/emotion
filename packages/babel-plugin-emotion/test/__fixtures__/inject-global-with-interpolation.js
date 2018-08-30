import { injectGlobal } from 'emotion'

let display = window.whatever

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    display: ${display};
    & > div {
      display: none;
    }
  }
  html {
    background: green;
  }
`
