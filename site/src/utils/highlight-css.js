require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-tsx')

global.Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    pattern: /(styled(\.\w+|\([^)]*\))(\.\w+(\([^)]*\))*)*|css|injectGlobal|keyframes|css={)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
    lookbehind: true,
    greedy: true,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: global.Prism.languages.jsx
        }
      },
      string: {
        pattern: /[^$;]+/,
        inside: global.Prism.languages.css,
        alias: 'language-css'
      }
    }
  }
})
