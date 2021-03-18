// @flow
import * as React from 'react'
import { interleave } from './utils'
import { ThemeContext } from '@emotion/react'
import { createCss } from './css'

let testOmitPropsOnComponent = prop => prop !== 'theme' && prop !== 'as'

type CreateStyledOptions = {
  getShouldForwardProp: (cmp: React.ElementType) => (prop: string) => boolean
}

type StyledOptions = {
  shouldForwardProp?: (prop: string) => boolean
}

export function createStyled(
  StyleSheet: Object,
  {
    getShouldForwardProp = () => testOmitPropsOnComponent
  }: CreateStyledOptions = {}
) {
  const css = createCss(StyleSheet)

  return function createEmotion(
    component: React.ElementType,
    options?: StyledOptions
  ) {
    let shouldForwardProp =
      options && options.shouldForwardProp
        ? options.shouldForwardProp
        : undefined
    let defaultShouldForwardProp =
      shouldForwardProp || getShouldForwardProp(component)
    let shouldUseAs = !defaultShouldForwardProp('as')

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
        const finalTag = (shouldUseAs && props.as) || component

        let mergedProps = props
        if (props.theme == null) {
          mergedProps = {}
          for (let key in props) {
            mergedProps[key] = props[key]
          }
          mergedProps.theme = React.useContext(ThemeContext)
        }

        let finalShouldForwardProp =
          shouldUseAs && shouldForwardProp === undefined
            ? getShouldForwardProp(finalTag)
            : defaultShouldForwardProp

        let newProps = {}

        for (let key in props) {
          if (shouldUseAs && key === 'as') continue

          if (finalShouldForwardProp(key)) {
            newProps[key] = props[key]
          }
        }

        newProps.style = [css.apply(mergedProps, styles), props.style]
        newProps.ref = ref

        // $FlowFixMe
        return React.createElement(finalTag, newProps)
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
