// @flow
import React from 'react'
// import styled from 'react-emotion'
import Box from '../components/Box'
import Title from '../components/Title'
import * as Markdown from '../utils/markdown-styles'

type Props = {}

const PackagesPage = (props: Props) => {
  return (
    <Box p={3}>
      <Title>Packages</Title>
      <Markdown.p>
        emotion is made up of many different packages that all live in a
        monorepo. Below, you can read all the packages' READMEs.
      </Markdown.p>
      <Box>l</Box>
    </Box>
  )
}

export default PackagesPage
