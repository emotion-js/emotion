// @flow
import * as React from 'react'
import styled from '../src'

type Props = { color: string }
const Foo = styled.div<Props>({
  color: 'red'
})

export const valid = <Foo color="red" />

// $FlowExpectError: color must be string
export const invalid = <Foo color={2} />
