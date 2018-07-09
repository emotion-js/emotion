// @flow
import * as React from 'react'
import { StyleSheet, View, Text, Image } from 'react-primitives'
import { createStyled } from 'primitives-core'
import {
  testPickPropsOnPrimitiveComponent,
  testPickPropsOnOtherComponent
} from './test-props'

function isPrimitiveComponent(component: React.ElementType) {
  switch (component) {
    case View:
    case Text:
    case Image: {
      return testPickPropsOnPrimitiveComponent
    }
  }
  return testPickPropsOnOtherComponent
}

/**
 * a function that returns a styled component which render styles on multiple targets with same code
 */

// type CreateStyledComponent = (...styles: any) => React.ElementType

// type BaseStyled = (tag: React.ElementType) => CreateStyledComponent

// export type Styled = BaseStyled & {
//   View: CreateStyledComponent,
//   Text: CreateStyledComponent,
//   Image: CreateStyledComponent
// }

let styled = createStyled(StyleSheet, isPrimitiveComponent)

export { styled }
