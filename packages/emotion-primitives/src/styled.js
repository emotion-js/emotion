// @flow
import * as React from 'react'
import { View, Text, Image } from 'react-primitives'
import {
  channel,
  contextTypes,
  setTheme,
  testAlwaysTrue,
  pickAssign,
  interleave
} from './utils'
import {
  testPickPropsOnPrimitiveComponent,
  testPickPropsOnOtherComponent
} from './test-props'
import { css } from './css'

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
  return function createStyledComponent(...rawStyles: *) {
    let styles

    if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
      styles = rawStyles
    } else {
      styles = interleave(rawStyles)
    }
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
        let stylesWithStyleProp = styles
        if (props.style) {
          stylesWithStyleProp = styles.concat(props.style)
        }
        const emotionStyles = css.apply(this, stylesWithStyleProp)

        return React.createElement(
          component,
          pickAssign(pick, {}, props, {
            ref: props.innerRef,
            style: emotionStyles
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
