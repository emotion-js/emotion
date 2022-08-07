import * as React from 'react'
import { StyleSheet, View, Text, Image } from 'react-primitives'
import { createStyled } from '@emotion/primitives-core'
import {
  testPickPropsOnPrimitiveComponent,
  testPickPropsOnOtherComponent
} from './test-props'

function getShouldForwardProp(
  component: React.ElementType
): (prop: string) => boolean {
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
type CreateStyledComponent = (...styles: any) => React.FC<any> & {
  withComponent: (component: any) => React.FC<any>
}

/** @internal */
export type BaseStyled = (tag: React.ElementType) => CreateStyledComponent

export type Styled = BaseStyled & {
  View: CreateStyledComponent
  Text: CreateStyledComponent
  Image: CreateStyledComponent
}

let styled: BaseStyled = createStyled(StyleSheet, { getShouldForwardProp })

export { styled }
