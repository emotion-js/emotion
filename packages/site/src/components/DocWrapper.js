import React from 'react'
import { css } from 'react-emotion'
import Link from 'gatsby-link'
import Box from './Box'
import { constants } from '../utils/style'

const containerCls = css`
  display: grid;
  grid-template-columns: minmax(25%, 1fr) auto;
  grid-template-rows: auto minmax(min-content, 1fr) auto;
`

const sidebarCls = css`
  grid-column: 2;
  grid-row: 1;
`

export default props => (
  <Box flex={1} className={containerCls}>
    <Box p={4}>{props.children}</Box>
    <Box bg="#f5f5f5" p={3} className={sidebarCls}>
      {props.sidebarNodes.map(({ node }) => {
        return (
          <Box key={node.name}>
            <Link
              className={css`
                display: block;
                text-decoration: none;
                margin: 16px;
                font-size: ${constants.fontSizes[2]}px
                color: inherit;
              `}
              activeClassName={css`
                font-weight: bold;
                &::before {
                  content: '';
                  height: 32px;
                  width: 8px;
                  margin-right: 16px;
                  transform: translateX(-32px) translateY(-8px);
                  position: absolute;
                  display: inline-block;
                  background-color: hotpink;
                }
              `}
              to={`/docs/${node.name}`}
            >
              {node.childMarkdownRemark.frontmatter.title || node.name}
            </Link>
          </Box>
        )
      })}
    </Box>
  </Box>
)
