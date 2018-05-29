import css from '@emotion/css'
import { mq, fonts } from './style'
import prismStyles from 'react-live/lib/constants/css.js'

const baseHeadingStyles = css`
  margin: 0.75rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.42;
`

const globalStyles = css`
  ${{
    h1: css`
      margin-top: 0;
      font-size: 3.998rem;
      ${baseHeadingStyles};
    `,
    h2: css`
      font-size: 2.827rem;
      ${baseHeadingStyles};
    `,
    h3: css`
      font-size: 1.999rem;
      ${baseHeadingStyles};
    `,
    h4: css`
      font-size: 1.414rem;
      ${baseHeadingStyles};
    `,
    h5: css`
      font-size: 1.121rem;
    `,
    h6: css`
      font-size: 0.88rem;
    `
  }} ${prismStyles.replace(
      'prism-code',
      'prism-code,pre[class*="language-"]'
    )} html,
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
  }
  .gatsy-highlight {
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`

export default globalStyles
