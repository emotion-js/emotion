// @flow
import React from 'react'
import Link from '../components/Link'
import Box from '../components/Box'
import Title from '../components/Title'
import { openColors } from '../utils/style'
import { getDocMap, docList } from '../utils/misc'
import '../components/Playground'
import Layout from '../layouts'
import DocMetadata from '../components/DocMetadata'
import DocWrapper from '../components/DocWrapper'

const H2 = Box.withComponent('h2')
const H3 = Box.withComponent('h3')

const centerText = { textAlign: 'center' }

type Props = {}

export default (props: Props) => {
  return (
    <DocMetadata
      render={data => {
        const docMap = getDocMap(data)
        return (
          <Layout>
            <DocWrapper>
              <Box>
                <Box flex={1}>
                  <Title>Documentation</Title>
                </Box>
                <Box display="flex" justify="center" column>
                  <Box
                    display="flex"
                    flex={1}
                    direction={['column', 'row']}
                    justify="space-around"
                  >
                    {docList.map(item => (
                      <Box flex={1} key={item.title}>
                        <H2 css={centerText} color={openColors.gray[7]}>
                          {item.title}
                          {item.items.map(item => {
                            return (
                              <Link key={item} to={`/docs/${item}`}>
                                <H3>{docMap[item] || item}</H3>
                              </Link>
                            )
                          })}
                        </H2>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </DocWrapper>
          </Layout>
        )
      }}
    />
  )
}
