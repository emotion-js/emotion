// @flow
import React from 'react'
import { constants } from '../utils/style'
import Box from '../components/Box'
import Playground from '../components/Playground'
import styles from '../utils/markdown-styles'
import RenderHAST from '../components/RenderHAST'
import Title from '../components/Title'
import type { HASTRoot } from '../utils/types'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'

type Props = {
  data: {
    doc: {
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

const createHeading = (
  TagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
) => props => {
  if (props.id === undefined) {
    throw new Error(
      `id not found on heading with props "${JSON.stringify(props)}"`
    )
  }
  return (
    <TagName {...props}>
      <a href={`#${props.id}`} aria-hidden className="anchor">
        <svg
          aria-hidden
          height="16"
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
        >
          <path
            fillRule="evenodd"
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
          />
        </svg>
      </a>
      {props.children}
    </TagName>
  )
}

const createCode = (logoUrl: string) => (props: *) => {
  if (props.className === undefined) {
    return <code {...props} />
  }
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
              h1: createHeading('h1'),
              h2: createHeading('h2'),
              h3: createHeading('h3'),
              h4: createHeading('h4'),
              h5: createHeading('h5'),
              h6: createHeading('h6'),
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
