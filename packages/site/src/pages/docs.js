// @flow
import React from 'react'
import Link from '../components/Link'
import Box from '../components/Box'
import Title from '../components/Title'
// $FlowFixMe
import docNames from '../../../../docs/index.yaml'
import { openColors } from '../utils/style'
import { getDocMap } from '../utils/misc'

const H2 = Box.withComponent('h2')
const H3 = Box.withComponent('h3')

const centerText = { textAlign: 'center' }

type Props = {
  data: *
}

export default (props: Props) => {
  const docMap = getDocMap(props.data.allMarkdownRemark.edges)
  return (
    <Box>
      <Box flex={1}>
        <Title>Documentation</Title>
      </Box>
      <Box display="flex" justify="center" column>
        <Box
          display="flex"
          flex={1}
          css={{ maxWidth: 800 }}
          direction={['column', 'row']}
          justify="space-around"
        >
          {docNames.map(docName => (
            <Box flex={1} key={docName.title}>
              <H2 css={centerText} color={openColors.gray[7]}>
                {docName.title}
                {docName.items.map(item => {
                  return (
                    <Link to={`/docs/${item}`}>
                      <H3>{docMap[item]}</H3>
                    </Link>
                  )
                })}
              </H2>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export const pageQuery = graphql`
  query IndexDocsPage {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
