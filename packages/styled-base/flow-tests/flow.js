/* eslint-disable no-unused-vars */
// @flow
import * as React from 'react'
import createStyled from '../src'
import type {
  CreateStyledComponent,
  StyledComponent,
  Interpolations
} from '../src/utils'

type Props = { color: string }

// It returns the expected type
export const valid: (
  ...args: Interpolations
) => StyledComponent<Props> = createStyled('div')

// $FlowExpectError: we can't cast a StyledComponent to string
export const invalid: string = createStyled('div')

const Div = createStyled.div < Props > { color: props => props.color }

const validProp = <Div color="red" />

// $FlowExpectError: color property should be a string
const invalidProp = <Div color={2} />

// $FlowExpectError: we don't expose the private StyledComponent properties
const invalidPropAccess = createStyled().__emotion_base

// We allow styled components not to specify their props types
// NOTE: this is allowed only if you don't attempt to export it!
const untyped: StyledComponent<empty> = createStyled.div({})

// Style a functional component
const styledFn =
  createStyled <
  Props >
  (props => <div {...props} />)`
  color: red;
`
