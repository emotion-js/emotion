import React from 'react'
import styled, { css } from 'react-emotion'
import { constants, openColors } from '../utils/style'
import Box from '../components/Box'
import Playground from '../components/Playground'

const Title = styled.h1`
  font-size: ${constants.fontSizes[8]}px;
  font-weight: 500;
  margin-top: 0;
`

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

const contentCls = css`
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  margin-left: ${constants.space[2]}px;
`

class DocRoute extends React.Component {
  render() {
    const { data } = this.props
    const { doc, allCodeExample } = data
    return (
      <Box className={contentCls}>
        <Title>{doc.frontmatter.title}</Title>
        <Box pb={3} className={styles}>
          {/* The URL below should change when this is on master */}
          <a
            href={`https://github.com/emotion-js/emotion/edit/gatsby/packages/site/src/docs/${this
              .props.pathContext.slug}.md`}
          >
            Edit this page
          </a>
        </Box>
        {allCodeExample && (
          <Box mb={constants.space[3]}>
            <Playground code={allCodeExample.edges[0].node.content} />
          </Box>
        )}
        <div
          className={styles}
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </Box>
    )
  }
}

export default DocRoute

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    allCodeExample(filter: { name: { eq: $slug } }) {
      edges {
        node {
          content
        }
      }
    }
  }
`
