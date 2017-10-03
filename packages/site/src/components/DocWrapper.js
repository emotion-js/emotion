import React from 'react'
import { css } from 'react-emotion'
import Link from './Link'
import Box from './Box'

const containerCls = css`
  display: grid;
  grid-template-columns: auto minmax(25%, 1fr);
  grid-template-rows: auto minmax(min-content, 1fr) auto;
`

const sidebarCls = css`
  grid-column: 1;
  grid-row: 1;
`

export default props => (
  <Box flex={1} className={containerCls}>
    <Box className={sidebarCls}>
      {props.sidebarNodes.map(({ node }) => {
        return (
          <Box key={node.name}>
            <Link to={`/docs/${node.name}`}>
              {node.childMarkdownRemark.frontmatter.title || node.name}
            </Link>
          </Box>
        )
      })}
    </Box>
    {props.children}
  </Box>
)
