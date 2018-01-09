// @flow
import React from 'react'
import Link from '../components/Link'
import Box from '../components/Box'
import Title from '../components/Title'
import { openColors } from '../utils/style'
import { getDocMap, docList } from '../utils/misc'
import '../components/Playground'

const H2 = Box.withComponent('h2')
const H3 = Box.withComponent('h3')

const centerText = { textAlign: 'center' }

type Props = {
  markdownNodes: *,
}

export default (props: Props) => {
  const docMap = getDocMap(props.markdownNodes)
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
          {docList.map(item => (
            <Box flex={1} key={item.title}>
              <H2 css={centerText} color={openColors.gray[7]}>
                {item.title}
                {item.items.map(item => {
                  return (
                    <Link to={`/docs/${item}`}>
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
  )
}
