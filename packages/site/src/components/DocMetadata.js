// @flow
import * as React from 'react'
import { StaticQuery } from 'gatsby'

type Props = {
  render: (
    data: Array<{
      node: {
        frontmatter: {
          title: string
        },
        fields: {
          slug: string
        }
      }
    }>
  ) => React.Node
}

const DocMetadata = (props: Props) => {
  return (
    <StaticQuery
      query={graphql`
        query DocMetadata {
          allMarkdownRemark(
            filter: { fileAbsolutePath: { glob: "**/docs/*.md" } }
          ) {
            edges {
              node {
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        return props.render(data.allMarkdownRemark.edges)
      }}
    />
  )
}
export default DocMetadata
