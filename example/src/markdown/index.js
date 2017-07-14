import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'emotion/react'
import colors from 'open-color'
import styles from './index.css'

const MarkdownContainer = styled('div')`
  composes: ${styles.markdownContainer};
  h1, h2, h3, h4, h5 {
    margin: 16px 0 8px 0;
    letter-spacing: 1px;
  }
`

const Link = styled('a')`
  font-size: 1rem;
  margin-left: auto;
  margin-right: 8px;
  text-decoration: none;
  color: ${p => p.theme.purple};
  
  p & {
    margin: 0;
  }
  
  &:hover {
    color: ${p => p.theme.gold};
  }
`

const Paragraph = styled('p')`
  margin: 16px 0;
  padding: 2px;
  font-size: 0.85rem;
  color: ${colors.gray[8]};
  
  a {
    font-size: 0.85rem;
  }
  
`

const Code = styled('code')`
  font-family: monospace;
  font-size: 0.75rem;
  color: ${colors.gray[8]};
  background-color: ${colors.gray[1]};
  padding: 1px;
  maxWidth: 100%;
  
  p & {
    font-size: 0.99rem;
  }
`

const CodeBlock = styled('pre')`
  margin: 0 auto;
  padding: 4px;
  color: ${colors.gray[6]};
  background-color: ${colors.gray[1]};
  border-radius: attr(radius, 6px);
  maxWidth: 98%;
`

export default ({ markdown }) => {
  return (
    <MarkdownContainer>
      <ReactMarkdown
        source={markdown}
        renderers={{
          Heading: ({ children, level, ...rest }) => {
            const tag = `h${level}`

            if (Array.isArray(children)) {
              if (typeof children[0] === 'string') {
                rest.id = ('' + children[0].toLowerCase())
                  .replace(/\s+/g, ' ')
                  .replace(/\s/g, '-')
              }
            }

            return React.createElement(tag, { children, ...rest })
          },
          Link,
          Paragraph,
          Code,
          CodeBlock: props => {
            return (
              <CodeBlock key={props.nodeKey} className={props.className}>
                <Code>{props.literal}</Code>
              </CodeBlock>
            )
          }
        }}
      />

    </MarkdownContainer>
  )
}
