import React from 'react'
import { interleave } from './utils'
import { ThemeContext } from '@emotion/react'
import { createCss } from './css'
import { AbstractStyleSheet } from './types'

let testOmitPropsOnComponent = (prop: string) =>
  prop !== 'theme' && prop !== 'as'

interface CreateStyledOptions {
  getShouldForwardProp(cmp: React.ElementType): (prop: string) => boolean
}

interface StyledOptions {
  shouldForwardProp?(prop: string): boolean
}

type StyledProps = Record<string, unknown> & {
  as?: React.ElementType
}

export function createStyled(
  StyleSheet: AbstractStyleSheet,
  options?: CreateStyledOptions
) {
  const getShouldForwardProp =
    options?.getShouldForwardProp ?? (() => testOmitPropsOnComponent)

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

    return function createStyledComponent(...rawStyles: any[]) {
      let styles: any[]

      if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
        styles = rawStyles
      } else {
        styles = interleave(rawStyles as [any, ...any[]])
      }

      // do we really want to use the same infra as the web since it only really uses theming?
      let Styled: React.FC<StyledProps> = props => {
        const finalTag =
          (shouldUseAs && (props.as as React.ElementType)) || component

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

        let newProps: Record<string, unknown> = {}

        for (let key in props) {
          if (shouldUseAs && key === 'as') continue

          if (finalShouldForwardProp(key)) {
            newProps[key] = props[key]
          }
        }
        newProps.style = [css.apply(mergedProps, styles), props.style]

        return React.createElement(finalTag, newProps)
      }

      Styled.displayName = `emotion(${getDisplayName(component)})`

      const withComponent = (newComponent: React.ElementType) =>
        createEmotion(newComponent)(...styles)

      const castedStyled = Styled as typeof Styled & {
        withComponent: typeof withComponent
      }

      castedStyled.withComponent = withComponent

      return castedStyled
    }
  }
}

const getDisplayName = (
  primitive: string | { displayName?: string; name?: string }
) =>
  typeof primitive === 'string'
    ? primitive
    : primitive.displayName || primitive.name || 'Styled'
