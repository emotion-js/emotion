import { injectGlobal } from 'emotion'
import { mq, fonts } from './style'
import prismStyles from 'react-live/lib/constants/css.js'

injectGlobal(
  prismStyles.replace('prism-code', 'prism-code,pre[class*="language-"]')
)

injectGlobal`
html, body, #___gatsby {
  font-family: ${fonts.primary};
  color: #FFFEFF;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

pre[class*="language-"],.prism-code {
  ${mq({
    borderRadius: [0, 8]
  })}
  overflow: auto; 
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
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}`
