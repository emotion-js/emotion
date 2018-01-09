import { injectGlobal } from 'emotion'
import { mq, fonts } from './style'
import prismStyles from 'react-live/lib/constants/css.js'

injectGlobal(
  prismStyles.replace('prism-code', 'prism-code,pre[class*="language-"]')
)

injectGlobal`
  html,
  body,
  #___gatsby {
    font-family: ${fonts.primary};
    color: #fffeff;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  code,
  pre[class*='language-'],
  .prism-code {
    font-family: ${fonts.code};
  }

  pre[class*='language-'],
  .prism-code {
    ${mq({
      borderRadius: [0, 8],
    })} white-space: pre-wrap;
    word-break: break-word;
    word-wrap: normal;
  }
  .gatsy-highlight {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Oxygen';
    font-style: normal;
    font-weight: 400;
    src: local('Oxygen Regular'), local('Oxygen-Regular'),
      url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2)
        format('woff2');
    unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
      U+2000-206f, U+2074, U+20ac, U+2212, U+2215;
  }
`
