// @flow
import React from 'react'
import Layout from '../layouts'
import RenderHAST from '../components/RenderHAST'
import Box from '../components/Box'
import * as markdownComponents from '../utils/markdown-styles'

const Community = (props: *) => (
  <Layout>
    <Box
      p={[3, 4]}
      css={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: 'auto'
      }}
    >
      <div>
        <RenderHAST
          componentMap={markdownComponents}
          hast={props.data.markdownRemark.htmlAst}
        />
      </div>
    </Box>
  </Layout>
)

export const pageQuery = graphql`
  query Community {
    markdownRemark(
      fileAbsolutePath: { glob: "**/.cache/gatsby-source-filesystem/*.md" }
    ) {
      htmlAst
    }
  }
`

export default Community
