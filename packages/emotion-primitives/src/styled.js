// @flow
import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-primitives'
import {
  channel,
  contextTypes,
  setTheme,
  testAlwaysTrue,
  pickAssign
} from './utils'
import { getStyles } from './getStyles'
import { convertToRNStyles } from './convertToRNStyles'
import {
  testPickPropsOnPrimitiveComponent,
  testPickPropsOnOtherComponent
} from './test-props'

function isPrimitiveComponent(component: React.ElementType) {
  switch (component) {
    case View:
    case Text:
    case Image: {
      return true
    }
  }
  return false
}

// Evaluate the styles and convert them to React Native using styled component context
function evalStyles(context, Comp, styles) {
  // Convert styles with or without interpolations to React Native (StyleSheet.create)
  let otherStyles = convertToRNStyles.call(context, styles)

  return getStyles.call(context, otherStyles, context.props)
}

type State = {
  theme: Object
} | null

/**
 * a function that returns a styled component which render styles on multiple targets with same code
 */
export function createStyled(component: React.ElementType) {
  let isPrimitive = isPrimitiveComponent(component)
  let pick = isPrimitive
    ? testPickPropsOnPrimitiveComponent
    : testPickPropsOnOtherComponent
  return function createStyledComponent(...styles: *) {
    class Styled extends React.Component<*, State> {
      unsubscribe: number | void
      mergedProps: Object

      static withComponent = (newComponent: React.ElementType) =>
        createStyled(newComponent)(...styles)

      componentWillMount() {
        if (this.context[channel] !== undefined) {
          this.unsubscribe = this.context[channel].subscribe(
            setTheme.bind(this)
          )
        }
      }

      componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
          this.context[channel].unsubscribe(this.unsubscribe)
        }
      }

      render() {
        const { props, state } = this

        // Similar to create-emotion-styled component implementation
        this.mergedProps = pickAssign(testAlwaysTrue, {}, props, {
          theme: (state !== null && state.theme) || props.theme || {}
        })

        const emotionStyles = evalStyles(this, Styled, styles)

        return React.createElement(
          component,
          pickAssign(pick, {}, props, {
            ref: props.innerRef,
            style: StyleSheet.flatten(emotionStyles)
          })
        )
      }
    }

    Styled.contextTypes = contextTypes

    Styled.displayName = `emotion(${getDisplayName(component)})`

    return Styled
  }
}

const getDisplayName = primitive =>
  typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
