// @flow
import * as React from 'react'
import { testAlwaysTrue, pickAssign, interleave } from './utils'
import { ThemeContext } from '@emotion/core'
import { createCss } from './css'

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

      // do we really want to use the same infra as the web since it only really uses theming?
      // $FlowFixMe
      let Styled = React.forwardRef((props, ref) => {
        return (
          <ThemeContext.Consumer>
            {theme => {
              let mergedProps = pickAssign(testAlwaysTrue, {}, props, {
                theme: props.theme || theme
              })
              let stylesWithStyleProp = styles
              if (props.style) {
                stylesWithStyleProp = styles.concat(props.style)
              }
              const emotionStyles = css.apply(mergedProps, stylesWithStyleProp)

              if (process.env.NODE_ENV !== 'production' && props.innerRef) {
                console.error(
                  'innerRef is no longer supported, please use ref instead'
                )
              }

              return React.createElement(
                component,
                pickAssign(pickTest, {}, props, {
                  ref: ref,
                  style: emotionStyles
                })
              )
            }}
          </ThemeContext.Consumer>
        )
      })
      // $FlowFixMe
      Styled.withComponent = (newComponent: React.ElementType) =>
        createEmotion(newComponent)(...styles)

      Styled.displayName = `emotion(${getDisplayName(component)})`

      return Styled
    }
  }
}

const getDisplayName = primitive =>
  typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
