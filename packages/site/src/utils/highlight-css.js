require('react-live')
require('prismjs/components/prism-css')

global.Prism.languages.insertBefore('jsx', 'template-string', {
  'styled-template-string': {
    // eslint-disable-next-line no-useless-escape
    pattern: /(styled(\.\w+|\([^\)]*\))(\.\w+(\([^\)]*\))*)*|css|injectGlobal|keyframes|\.extend)`(?:\$\{[^}]+\}|\\\\|\\?[^\\])*?`/,
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
