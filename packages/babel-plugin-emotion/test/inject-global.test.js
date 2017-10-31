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
    \`;`
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
    extract: false
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

    opts: { importedNames: { injectGlobal: 'inject' } }
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
    \`;`
  }
}

createInlineTests('injectGlobal', cases)

createExtractTests('injectGlobal extract', cases)
