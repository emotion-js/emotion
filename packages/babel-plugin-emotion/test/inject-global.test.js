// @flow
import { createInlineTests, createExtractTests } from './util'

const cases = {
  'injectGlobal basic': {
    code: `
      injectGlobal\`
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
    \`;`,
  },
  'injectGlobal with interpolation': {
    code: `
      injectGlobal\`
        body {
          margin: 0;
          padding: 0;
          display: \${display};
          & > div {
            display: none;
          }
        }
        html {
          background: green;
        }
    \`;`,
    extract: false,
  },
  'static change import': {
    code: `
      inject\`
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
    \`;
    injectGlobal\`
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
    \`;`,

    opts: { importedNames: { injectGlobal: 'inject' } },
  },
  'dynamic change import': {
    code: `
      import { injectGlobal as inject } from 'emotion'
      inject\`
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
    \`;
    injectGlobal\`
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
    \`;`,
  },
  'with @font-face': {
    code: `injectGlobal\`
    @font-face {
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'),
        url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
          format('woff2');
      unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
        U+2c60-2c7f, U+A720-A7FF;
    }
  \``,
  },
}

createInlineTests('injectGlobal', cases)

createExtractTests('injectGlobal extract', cases)
