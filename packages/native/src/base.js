import { StyleSheet } from 'react-native'
import { createStyled } from '@emotion/primitives-core'

/**
 * a function that returns a styled component which render styles in React Native
 */
let styled = createStyled(StyleSheet)

export { styled }
