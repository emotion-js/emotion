// @flow
import React from 'react'
import { mq } from '../utils/style'
import Playground from '../components/Playground'
import * as markdownComponents from '../utils/markdown-styles'
import RenderHAST from '../components/RenderHAST'
import Title from '../components/Title'
import type { HASTRoot } from '../utils/types'
import memoize from '@emotion/memoize'
import Layout from '../layouts'
import { graphql } from 'gatsby'
import DocWrapper from '../components/DocWrapper'

type Props = {
  data: {
    doc: {
      htmlAst: HASTRoot,
      frontmatter: {
        title: string
      }
    },
    avatar: {
      childImageSharp: {
        resolutions: {
          src: string
        }
      }
    }
  },
  pageContext: {
    slug: string
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function(event) {
    var hash = window.decodeURI(window.location.hash)
    if (hash !== '' && hash !== '#') {
      var element = document.getElementById(`.docSearch-content ${hash} a`)
      if (element) {
        // Wait for the browser to finish rendering before scrolling.
        setTimeout(function() {
          if (element) {
            element.click()
          }
        }, 0)
      }
    }
  })
}

const ClassName = (props: any) => {
  return props.children(props.className)
}

const createLiveCode = memoize(logoUrl => props => (
  <ClassName
    css={mq({
      paddingTop: [16, 24],
      paddingRight: [24, 30],
      paddingBottom: [16, 24],
      paddingLeft: [24, 30]
    })}
  >
    {internalCodeStylesClassName => (
      <Playground
        css={mq({
          marginLeft: [0],
          marginRight: [0],
          marginTop: [16, 24],
          marginBottom: [16, 24],
          borderRadius: [0, 4],
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        })}
        editorClassName={internalCodeStylesClassName}
        logoUrl={logoUrl}
        initialCompiledCode={props.compiled}
        code={props.code}
      />
    )}
  </ClassName>
))

export default class DocRoute extends React.Component<Props> {
  render() {
    const { data } = this.props
    const { doc, avatar } = data
    return (
      <Layout>
        <DocWrapper>
          <div
            css={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gridTemplateRows: 'auto 1fr',
              alignItems: 'center',
              gap: 8,
              maxWidth: '52em',
              margin: '0 auto'
            }}
            className="docSearch-content"
          >
            <Title>
              {doc.frontmatter.title || this.props.pageContext.slug}
            </Title>
            <markdownComponents.a
              css={{ color: 'rgb(107, 107, 107)', fontSize: 12 }}
              href={
                doc.frontmatter.title
                  ? `https://github.com/emotion-js/emotion/edit/master/docs/${
                      this.props.pageContext.slug
                    }.md`
                  : `https://github.com/emotion-js/emotion/edit/master/packages/${
                      this.props.pageContext.slug
                    }/README.md`
              }
            >
              Edit this page
            </markdownComponents.a>
            <div css={{ gridColumn: 'span 2' }}>
              <RenderHAST
                hast={doc.htmlAst}
                componentMap={{
                  'live-code': createLiveCode(
                    avatar.childImageSharp.resolutions.src
                  ),
                  ...markdownComponents
                }}
              />
            </div>
          </div>
        </DocWrapper>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
    avatar: file(name: { eq: "emotion" }) {
      childImageSharp {
        resolutions(width: 96, height: 96) {
          src
        }
      }
    }
  }
`
