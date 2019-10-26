// @flow
import * as React from 'react'
import createStyled from '../src'
import type { CreateStyledComponent } from '../src/utils'

export const valid: CreateStyledComponent = createStyled('div')

// $FlowExpectError: we can't cast a StyledComponent to string
export const invalid: string = createStyled('div')

const styled = createStyled('div')
type Props = { color: string }
const Div = styled<Props>({ color: props => props.color })

export const validProp = <Div color="red" />

// $FlowExpectError: color property should be a string
export const invalidProp = <Div color={2} />

// $FlowExpectError: we don't expose the private StyledComponent properties
export const invalidPropAccess = styled().__emotion_base
