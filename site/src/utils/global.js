import css from '@emotion/css'
import { mq, fonts } from './style'
import prismStyles from 'react-live/lib/constants/css.js'

const globalStyles = css`
  ${prismStyles
    .replace('prism-code', 'prism-code,pre[class*="language-"]')
    .replace(/0\.5rem/g, '')} html, body, #___gatsby {
    font-family: ${fonts.primary};
    color: #fffeff;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
  ${{
    'p code': {
      backgroundColor: '#CEF6FF',
      fontSize: 16
    },
    'a code': {
      backgroundColor: 'inherit'
    }
  }};
  pre[class*='language-'] {
    ${mq({
      marginLeft: [-32, -30],
      marginRight: [-32, -30],
      marginTop: 16,
      marginBottom: 16,
      borderRadius: [0, 8],
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      paddingLeft: [32, 30],
      paddingRight: [32, 30]
    })};
  }

  code,
  pre[class*='language-'],
  .prism-code {
    font-family: ${fonts.code};
  }

  pre[class*='language-'],
  .prism-code {
    ${mq({
      borderRadius: [0, 8]
    })};
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: normal;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .gatsy-highlight {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
  #___gatsby > div {
    height: 100%;
  }
`

export default globalStyles
