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

  .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
  }
  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    visibility: hidden;
  }
  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg,
  h1 .anchor:focus svg,
  h2 .anchor:focus svg,
  h3 .anchor:focus svg,
  h4 .anchor:focus svg,
  h5 .anchor:focus svg,
  h6 .anchor:focus svg {
    visibility: visible;
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
