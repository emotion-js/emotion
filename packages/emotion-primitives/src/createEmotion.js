import * as React from 'react'
import reactPrimitives from 'react-primitives'
import {
  channel,
  contextTypes,
  setTheme,
  testAlwaysTrue,
  pickAssign
} from './utils'

import { getStyles } from './getStyles'
import { convertToRNStyles } from './convertToRNStyles'

const primitives = ['Text', 'View', 'Image']

const isValidPrimitive = primitive => primitives.indexOf(primitive) > -1

// Validate and return the primitive
const getPrimitive = primitive => {
  if (typeof primitive === 'string') {
    if (isValidPrimitive(primitive)) {
      return reactPrimitives[primitive]
    }
    throw new Error(
      `Cannot style invalid primitive ${primitive}. Expected primitive to be one of ['Text', 'View', 'Image']`
    )
  }

  return primitive
}

// Evaluate the styles and convert them to React Native using styled component context
function evalStyles(context, Comp, styles, styleOverrides) {
  // Convert styles with or without interpolations to React Native (StyleSheet.create)
  // TODO: Make the implementation more concrete
  // Assign static property so that the styles can be reused when using `withComponent` or composing styles via Comp.styles.
  Comp.styles = convertToRNStyles.call(context, styles)

  return getStyles.call(context, Comp.styles, context.props, styleOverrides)
}

/**
 * Creates a function that returns a styled component which render styles on multiple targets with same code
 */
export function createEmotionPrimitive(splitProps) {
  return function emotion(primitive) {
    return createStyledComponent

    function createStyledComponent(...styles) {
      class Styled extends React.Component {
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

          const { toForward, styleOverrides } = splitProps(primitive, props)

          const emotionStyles = evalStyles(this, Styled, styles, styleOverrides)

          return React.createElement(getPrimitive(primitive), {
            ...toForward,
            ref: props.innerRef,
            style: emotionStyles.length > 0 ? emotionStyles : {}
          })
        }
      }

      Styled.contextTypes = contextTypes

      Styled.withComponent = newPrimitive =>
        emotion(getPrimitive(newPrimitive))(...Styled.styles)

      Object.assign(
        Styled,
        getStyledMetadata({
          primitive,
          styles
        })
      )

      return Styled
    }
  }
}

const getStyledMetadata = ({ primitive, styles }) => ({
  styles: primitive.styles ? primitive.styles.concat(styles) : styles,
  displayName: `emotion(${getDisplayName(primitive)})`
})

const getDisplayName = primitive =>
  typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
