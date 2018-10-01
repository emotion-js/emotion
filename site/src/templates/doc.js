// @flow
import React from 'react'
import { mq, constants } from '../utils/style'
import Box from '../components/Box'
import * as markdownComponents from '../utils/markdown-styles'
import RenderHAST from '../components/RenderHAST'
import Title from '../components/Title'
import type { HASTRoot } from '../utils/types'
import memoize from '@emotion/memoize'
import Layout from '../layouts'
import { graphql } from 'gatsby'
import DocWrapper from '../components/DocWrapper'
import { getParameters } from 'codesandbox-import-utils/lib/api/define'

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

const createLiveCode = memoize(logoUrl => props => {
  const parameters = getParameters({
    files: {
      'package.json': {
        content: {
          name: 'emotion-example-base',
          version: '1.0.0',
          description: '',
          keywords: [],
          homepage: 'https://codesandbox.io/s/new',
          main: 'src/index.js',
          dependencies: {
            '@emotion/core': '0.13.1',
            '@emotion/css': '0.9.8',
            '@emotion/keyframes': '0.9.1',
            '@emotion/style': '0.8.0',
            '@emotion/styled': '0.10.6',
            '@emotion/styled-base': '0.10.6',
            emotion: '9.2.12',
            'emotion-theming': '9.2.9',
            facepaint: '1.2.1',
            react: '16.5.2',
            'react-dom': '16.5.2',
            'react-emotion': '9.2.12',
            'react-scripts': '1.1.5',
            recompose: '0.30.0'
          },
          devDependencies: {},
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test --env=jsdom',
            eject: 'react-scripts eject'
          }
        }
      },
      '.prettierrc': {
        content: {
          printWidth: 50,
          tabWidth: 2,
          useTabs: false,
          semi: false,
          singleQuote: true,
          trailingComma: 'none',
          bracketSpacing: true,
          jsxBracketSameLine: false
        }
      },
      'sandbox.config.json': {
        content: {
          infiniteLoopProtection: true,
          hardReloadOnChange: false
        }
      },
      'src/index.js': {
        content: `
          import React from 'react'
          import { render } from 'react-dom'
          
          import Example from './Example.js'
          
          render(<Example />, document.getElementById('root'))
        `
      },
      'src/Example.js': {
        content: props.code
      }
    }
  })

  const url = `https://codesandbox.io/api/v1/sandboxes/define?embed=1&parameters=${parameters}&query=module=%2Fsrc%2FExample.js%26view=split`

  return (
    <ClassName
      css={mq({
        maxWidth: constants.breakpoints[1] + 'em',
        paddingLeft: [32, 30],
        paddingRight: [32, 30]
      })}
    >
      {internalCodeStylesClassName => (
        <div className={internalCodeStylesClassName}>
          <iframe
            src={url}
            style={{
              width: '100%',
              height: 500,
              border: 0,
              borderRadius: 4,
              overflow: 'hidden'
            }}
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
        </div>
      )}
    </ClassName>
  )
})

export default class DocRoute extends React.Component<Props> {
  render() {
    const { data } = this.props
    const { doc, avatar } = data

    return (
      <Layout>
        <DocWrapper>
          <Box css={{ lineHeight: 1.4 }} className="docSearch-content">
            <Title>
              {doc.frontmatter.title || this.props.pageContext.slug}
            </Title>
            <Box pb={3}>
              <markdownComponents.a
                css={{ color: 'rgb(107, 107, 107)', fontSize: 14.5 }}
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
            </Box>
            <RenderHAST
              hast={doc.htmlAst}
              componentMap={{
                'live-code': createLiveCode(
                  avatar.childImageSharp.resolutions.src
                ),
                ...markdownComponents
              }}
            />
          </Box>
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
