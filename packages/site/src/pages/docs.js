// @flow
import React from 'react'
import Link from '../components/Link'

type Props = {
  data: *
}

export default (props: Props) => {
  return (
    <ul>
      {props.data.allSitePage.edges.map(node => (
        <li key={node.node.path}>
          <Link to={node.node.path}>
            {node.node.path.replace('/docs/', '')}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const pageQuery = graphql`
  query DocsPageQuery {
    allSitePage(filter: { path: { glob: "/docs/*" } }) {
      edges {
        node {
          path
        }
      }
    }
  }
`
