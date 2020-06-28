/* eslint-disable no-unused-vars */
// @flow
import * as React from 'react'
import styled from '../src'

type Props = { color: string }
const Foo = styled.div<Props>({
  color: 'red'
})

const valid = <Foo color="red" />

// $FlowExpectError: color must be string
const invalid = <Foo color={2} />

// components defined using the root method should be identical
// to the ones generated using the shortcuts
const root: typeof Foo = styled<Props>('div')`
  colors: red;
`
