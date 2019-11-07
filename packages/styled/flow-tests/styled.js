/* eslint-disable no-unused-vars */
// @flow
import React from 'react'
import styled from '../src'
import type { CreateStyledComponent, StyledComponent } from '../src/utils'

type Props = { color: string }
const Div = styled.div<Props>({ color: 'red' })

const validProp = <Div color="red" />

// $FlowExpectError: color property should be a string
const invalidProp = <Div color={2} />
