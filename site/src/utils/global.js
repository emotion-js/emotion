import css from '@emotion/css'
import { mq, fonts } from './style'
import prismStyles from 'react-live/lib/constants/css.js'
import draculaStyles from './dracula-prism'

const globalStyles = css`
  ${prismStyles
    .replace('prism-code', 'prism-code,pre[class*="language-"]')
    .replace(/0\.5rem/g, '')} html, body, #___gatsby {
    font-family: ${fonts.primary};
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .gatsby-highlight,
  .prism-code {
    ${draculaStyles};
    pre[class*='language-'] {
      ${mq({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 32,
        marginBottom: 32,
        borderRadius: [0, 4],
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        paddingTop: [8, 16],
        paddingRight: [8, 16],
        paddingBottom: [8, 16],
        paddingLeft: [8, 16]
      })};
    }

    code,
    pre,
    pre[class*='language-'] {
      font-family: ${fonts.code};
      font-size: 14px;
    }

    .language-bash .token.function {
      color: #ccc;
    }
  }

  .gatsy-highlight {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
  #___gatsby > div {
    display: flex;
  }
`

export default globalStyles
