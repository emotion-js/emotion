// @flow
import React from 'react'
import { cx, css } from 'react-emotion'
import { mq } from '../utils/style'
import Box from '../components/Box'
import Playground from '../components/Playground'
import * as markdownComponents from '../utils/markdown-styles'
import RenderHAST from '../components/RenderHAST'
import Title from '../components/Title'
import type { HASTRoot } from '../utils/types'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'

type Props = {
  markdownNodes: *,
  data: {
    doc: {
      hast: HASTRoot,
      frontmatter: {
        title: string,
      },
    },
    avatar: {
      childImageSharp: {
        resolutions: {
          src: string,
        },
      },
    },
  },
  pathContext: {
    slug: string,
  },
}

const baseHeadingStyles = css`
  margin: 0.75rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.42;
`

const headingStylesMap = {
  h1: css`
    margin-top: 0;
    font-size: 3.998rem;
    ${baseHeadingStyles};
  `,
  h2: css`
    font-size: 2.827rem;
    ${baseHeadingStyles};
  `,
  h3: css`
    font-size: 1.999rem;
    ${baseHeadingStyles};
  `,
  h4: css`
    font-size: 1.414rem;
    ${baseHeadingStyles};
  `,
  h5: css`
    font-size: 1.121rem;
  `,
  h6: css`
    font-size: 0.88rem;
  `,
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
    <TagName
      {...props}
      className={cx(headingStylesMap[TagName], props.className)}
    >
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

const codeStyles = css(
  mq({
    marginLeft: [-32, -30],
    marginRight: [-32, -30],
    marginTop: 16,
    marginBottom: 16,
    borderRadius: [0, 8],
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  })
)

const inlineCodeStyles = css({
  backgroundColor: '#CEF6FF',
  'p &': {
    fontSize: 16,
  },
  'a &': {
    backgroundColor: 'inherit',
  },
})

const internalCodeStyles = css(
  mq({
    paddingLeft: [32, 30],
    paddingRight: [32, 30],
  })
)

const createCode = (logoUrl: string) => (props: *) => {
  if (props.className === undefined) {
    return <code className={inlineCodeStyles} {...props} />
  }
  if (props.className[0] === 'language-jsx-live') {
    return (
      <Playground
        className={codeStyles}
        editorClassName={internalCodeStyles}
        logoUrl={logoUrl}
        initialCompiledCode={props.compiled}
        code={props.children[0]}
      />
    )
  }
  const language = props.className[0].replace('language-', '')
  if (global.Prism.languages[language] === undefined) {
    throw new Error(`Language: "${language}" not found`)
  }
  const highlighted = global.Prism.highlight(
    props.children[0],
    global.Prism.languages[language]
  )
  return (
    <pre className={codeStyles}>
      <code className="prism-code">
        <div
          className={internalCodeStyles}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </code>
    </pre>
  )
}

export default class DocRoute extends React.Component<Props> {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { data, markdownNodes } = this.props
    const { doc, avatar } = data
    return (
      <Box>
        <Title>{doc.frontmatter.title || this.props.pathContext.slug}</Title>
        <Box pb={3}>
          <markdownComponents.a
            css={{ color: 'rgb(107, 107, 107)', fontSize: 14.5 }}
            href={
              doc.frontmatter.title
                ? `https://github.com/emotion-js/emotion/edit/master/docs/${this
                    .props.pathContext.slug}.md`
                : `https://github.com/emotion-js/emotion/edit/master/packages/${this
                    .props.pathContext.slug}/README.md`
            }
          >
            Edit this page
          </markdownComponents.a>
        </Box>
        <RenderHAST
          hast={doc.hast}
          componentMap={{
            h1: createHeading('h1'),
            h2: createHeading('h2'),
            h3: createHeading('h3'),
            h4: createHeading('h4'),
            h5: createHeading('h5'),
            h6: createHeading('h6'),
            code: createCode(avatar.childImageSharp.resolutions.src),
            ...markdownComponents,
          }}
        />
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
    avatar: file(name: { eq: "emotion" }) {
      childImageSharp {
        resolutions(width: 96, height: 96) {
          src
        }
      }
    }
  }
`
