// @flow
import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'

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
          allMdx {
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
        return props.render(data.allMdx.edges)
      }}
    />
  )
}
export default DocMetadata
