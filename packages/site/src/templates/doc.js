// @flow
import React from 'react'
import styled from 'react-emotion'
import { constants } from '../utils/style'
import Box from '../components/Box'
import Playground from '../components/Playground'
import styles from '../utils/markdown-styles'
import RenderHAST from '../components/RenderHAST'
import type { HASTRoot } from '../utils/types'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'

const Title = styled.h1`
  font-size: ${constants.fontSizes[8]}px;
  font-weight: 500;
  margin-top: 0;
`

type Props = {
  data: {
    doc: {
      html: string,
      hast: HASTRoot,
      frontmatter: {
        title: string
      }
    },
    allCodeExample: {
      edges: Array<{ node: { content: string } }>
    },
    avatar: {
      childImageSharp: {
        resolutions: {
          src: string
        }
      }
    }
  },
  pathContext: {
    slug: string
  }
}

const createCode = (logoUrl: string) => (props: *) => {
  if (props.className === undefined) {
    return <code {...props} />
  }
  console.log(props.className)
  if (props.className[0] === 'language-jsx-live') {
    return <Playground logoUrl={logoUrl} code={props.children[0][0]} />
  }
  const language = props.className[0].replace('language-', '')
  if (global.Prism.languages[language] === undefined) {
    throw new Error(`Language: "${language}" not found`)
  }
  const highlighted = global.Prism.highlight(
    props.children[0][0],
    global.Prism.languages[language]
  )
  return (
    <code
      className="prism-code"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  )
}

export default class DocRoute extends React.Component<Props> {
  render() {
    const { data } = this.props
    const { doc, allCodeExample, avatar } = data
    return (
      <Box>
        <Title>{doc.frontmatter.title}</Title>
        <Box pb={3} className={styles}>
          {/* The URL below should change when this is on master */}
          <a
            href={`https://github.com/emotion-js/emotion/edit/gatsby/docs/${this
              .props.pathContext.slug}.md`}
          >
            Edit this page
          </a>
        </Box>
        {allCodeExample && (
          <Box mb={constants.space[3]}>
            <Playground
              logoUrl={avatar.childImageSharp.resolutions.src}
              code={allCodeExample.edges[0].node.content}
            />
          </Box>
        )}
        <div className={styles}>
          <RenderHAST
            hast={doc.hast}
            componentMap={{
              code: createCode(avatar.childImageSharp.resolutions.src)
            }}
          />
        </div>
      </Box>
    )
  }
}

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      hast
      frontmatter {
        title
      }
    }
    allCodeExample(filter: { name: { eq: $slug } }) {
      edges {
        node {
          content
        }
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
