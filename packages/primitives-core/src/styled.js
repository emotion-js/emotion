// @flow
import * as React from 'react'
import { interleave } from './utils'
import { ThemeContext } from '@emotion/core'
import { createCss } from './css'

let testOmitPropsOnComponent = prop => prop !== 'theme'

type CreateStyledOptions = {
  getShouldForwardProp: (cmp: React.ElementType) => (prop: string) => boolean
}

type ShouldForwardPropsOptions = {
  /** If specified, exclude will not be used */
  include?: Array<string>,
  exclude?: Array<string>
}
type StyledOptions = {
  shouldForwardProp?: ShouldForwardPropsOptions | ((prop: string) => boolean)
}

const defaultInclude = ['children']
function createPropFilter({ include, exclude }: ShouldForwardPropsOptions) {
  if (include) {
    return (prop: string) =>
      defaultInclude.indexOf(prop) !== -1 || include.indexOf(prop) !== -1
  }

  if (exclude) {
    return (prop: string) => exclude.indexOf(prop) === -1
  }

  return undefined
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
        ? typeof options.shouldForwardProp === 'function'
          ? options.shouldForwardProp
          : createPropFilter(options.shouldForwardProp) ||
            getShouldForwardProp(component)
        : getShouldForwardProp(component)

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
        let mergedProps = props
        if (props.theme == null) {
          mergedProps = {}
          for (let key in props) {
            mergedProps[key] = props[key]
          }
          mergedProps.theme = React.useContext(ThemeContext)
        }

        let stylesWithStyleProp = styles
        if (props.style) {
          stylesWithStyleProp = styles.concat(props.style)
        }
        const emotionStyles = css.apply(mergedProps, stylesWithStyleProp)

        let newProps = {}

        for (let key in props) {
          if (shouldForwardProp(key)) {
            newProps[key] = props[key]
          }
        }

        newProps.style = emotionStyles
        newProps.ref = ref

        // $FlowFixMe
        return React.createElement(component, newProps)
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
