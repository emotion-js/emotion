// @flow
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { createStyled } from 'primitives-core'

/**
 * a function that returns a styled component which render styles in React Native environment
 */

type CreateStyledComponent = (...styles: any) => React.ElementType

type BaseStyled = (tag: React.ElementType) => CreateStyledComponent

let styled: BaseStyled = createStyled(StyleSheet)

export { styled }
