// @flow
import { css } from 'react-emotion'
import { openColors } from './style'

const styles = css`
  p {
    font-size: 1.25rem;
    margin-bottom: 1.3rem;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0.75rem 0 0.5rem;
    font-weight: inherit;
    line-height: 1.42;
  }

  h1 {
    margin-top: 0;
    font-size: 3.998rem;
  }

  h2 {
    font-size: 2.827rem;
  }

  h3 {
    font-size: 1.999rem;
  }

  h4 {
    font-size: 1.414rem;
  }

  h5 {
    font-size: 1.121rem;
  }

  h6 {
    font-size: 0.88rem;
  }

  small {
    font-size: 0.707em;
  }

  /* https://github.com/mrmrs/fluidity */

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  img {
    max-height: 360px;
    margin: 0 auto;
  }

  a,
  a:visited {
    background-color: #faebf8;
    color: inherit;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a:active {
    background-color: #f5d0f0;
  }

  a.anchor {
    background-color: initial;
  }

  blockquote {
    margin: 0;
    border-left: 5px solid ${openColors.gray[5]};
    font-style: italic;
    padding: 1.33em;
    text-align: left;
  }

  ul,
  ol,
  li {
    text-align: left;
  }

  p {
    color: ${openColors.gray[8]};
  }
`

export default styles
