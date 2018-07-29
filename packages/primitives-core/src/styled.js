// @flow
import * as React from 'react'
import {
  channel,
  contextTypes,
  setTheme,
  testAlwaysTrue,
  pickAssign,
  interleave
} from './utils'
import { createCss } from './css'

type State = {
  theme: Object
} | null

let defaultPickTest = prop => prop !== 'theme' && prop !== 'innerRef'

type options = {
  getShouldForwardProp: (cmp: React.ElementType) => (prop: string) => boolean
}

export function createStyled(
  StyleSheet: Object,
  { getShouldForwardProp = () => defaultPickTest }: options = {}
) {
  const css = createCss(StyleSheet)

  return function createEmotion(component: React.ElementType) {
    let pickTest = getShouldForwardProp(component)

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
          createEmotion(newComponent)(...styles)

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
            pickAssign(pickTest, {}, props, {
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
}

const getDisplayName = primitive =>
  typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
