// @flow
import createStyled from '../src'
import type { CreateStyledComponent } from '../src/utils'

export const valid: CreateStyledComponent = createStyled('div')

// $FlowExpectError: we can't cast a StyledComponent to string
export const invalid: string = createStyled('div')
