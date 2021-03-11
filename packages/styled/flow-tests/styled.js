/* eslint-disable no-unused-vars */
// @flow
import React from 'react'
import styled from '../src'
import type { CreateStyledComponent, StyledComponent } from '../src/utils'

type Props = { color: string }
const Div = styled.div<Props>({ color: 'red' })

const validProp = <Div color="red" />

// $FlowFixMe: expect error - color property should be a string
const invalidProp = <Div color={2} />

styled<Props>(props => <div className={props.className}>{props.color}</div>)`
  color: ${props => props.color};
`

styled<Props>(props => {
  const color: string = props.color
  const className: string = props.className
  // $FlowFixMe: expect error - color should be a string
  const colorTest: number = props.color
  return <div className={props.className}>{props.color}</div>
})``
