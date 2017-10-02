import React from 'react'
import styled, { css } from 'react-emotion'
import { constants } from 'styled-system'
import colors from 'open-color'

import Box from '../components/Box'
import Playground from '../components/Playground'

const Title = styled.h1`font-size: ${constants.fontSizes[6]}px;`

const styles = css`
  p {
    font-size: 1.25rem;
    margin-bottom: 1.3rem;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 1.414rem 0 0.5rem;
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
    color: ${colors.grape[8]};
  }

  a:hover,
  a:focus,
  a:active {
    color: ${colors.grape[6]};
  }

  blockquote {
    margin: 0;
    border-left: 5px solid ${colors.gray[5]};
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
    color: ${colors.gray[8]};
  }
`

const docs = [
  { name: 'install', hasCodeExample: false },
  { name: 'nested', hasCodeExample: true },
  { name: 'pseudo', hasCodeExample: true },
  { name: 'media', hasCodeExample: true },
  { name: 'styling-any-component', hasCodeExample: true },
  { name: 'styled-with-component', hasCodeExample: true },
  { name: 'props', hasCodeExample: true },
  { name: 'keyframes', hasCodeExample: true },
  { name: 'composition', hasCodeExample: true },
  { name: 'objects', hasCodeExample: true },
  { name: 'styled-with-object', hasCodeExample: true },
  { name: 'css-prop', hasCodeExample: true },
  { name: 'theming', hasCodeExample: true },
  { name: 'source-maps', hasCodeExample: false },
  { name: 'inject-global', hasCodeExample: false }
]

class DocRoute extends React.Component {
  render() {
    const { data, pathContext } = this.props
    const { markdownRemark: doc } = data
    console.log(this.props)
    const documentContextIndex = docs.findIndex(
      ({ name }) => name === pathContext.slug
    )
    const docContext = docs[documentContextIndex]
    return (
      <div className={styles}>
        <Title>{doc.frontmatter.title}</Title>
        {docContext &&
          docContext.hasCodeExample === true && (
            <Box mb={constants.space[3]}>
              <Playground
                code={require(`!raw-loader!../blocks/${docContext.name}.example`)}
              />
            </Box>
          )}
        <div dangerouslySetInnerHTML={{ __html: doc.html }} />
      </div>
    )
  }
}

export default DocRoute

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
