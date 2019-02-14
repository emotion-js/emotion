// @flow
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts'
import RenderHAST from '../components/RenderHAST'
import Box from '../components/Box'
import * as markdownComponents from '../utils/markdown-styles'
import Title from '../components/Title'
import { mq } from '../utils/style'

const Community = (props: *) => (
  <Layout>
    <div
      css={mq({
        gridColumn: '1 / span 2'
      })}
    >
      <div>
        <Title>Community</Title>
        <RenderHAST
          componentMap={markdownComponents}
          hast={props.data.markdownRemark.htmlAst}
        />
        <markdownComponents.h2>Contributing</markdownComponents.h2>
        <markdownComponents.p>
          This list comes from{' '}
          <a href="https://github.com/emotion-js/awesome-emotion">
            awesome-emotion
          </a>
          . Anything added to that that list will appear here automatically.
        </markdownComponents.p>
        <markdownComponents.h2>Thanks!</markdownComponents.h2>
        <markdownComponents.p>
          Thanks to the styled-components team for the idea of embedding an
          awesome list into a website! ❤️
        </markdownComponents.p>
      </div>
    </div>
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
