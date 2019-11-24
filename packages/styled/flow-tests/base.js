/* eslint-disable no-unused-vars */
// @flow
import React from 'react'
import createStyled from '../src/base'
import type { CreateStyledComponent, StyledComponent } from '../src/utils'

const valid: StyledComponent<empty> = createStyled('div')({
  color: 'red'
})

// $FlowExpectError: we can't cast a StyledComponent to string
const invalid: string = createStyled('div')({ color: 'red' })

const styled = createStyled('div')

// $FlowExpectError: we don't expose the private StyledComponent properties
const invalidPropAccess = styled().__emotion_base

// We allow styled components not to specify their props types
// NOTE: this is allowed only if you don't attempt to export it!
const untyped: StyledComponent<empty> = styled({})
