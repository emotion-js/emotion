// @flow
import React from 'react'
import Layout from '../layouts'
import RenderHAST from '../components/RenderHAST'
import Box from '../components/Box'
import * as markdownComponents from '../utils/markdown-styles'
import Title from '../components/Title'

const Community = (props: *) => (
  <Layout>
    <Box
      p={[3, 4]}
      css={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: 'auto',
        lineHeight: 1.4
      }}
    >
      <div>
        <Title>Community</Title>
        <RenderHAST
          componentMap={markdownComponents}
          hast={props.data.markdownRemark.htmlAst}
        />
        <markdownComponents.h1>Contributing</markdownComponents.h1>

        <markdownComponents.h1>Thanks!</markdownComponents.h1>
        <markdownComponents.p>
          Thanks to the styled-components team for the idea of embedding an
          awesome list into a website! ❤️
        </markdownComponents.p>
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
