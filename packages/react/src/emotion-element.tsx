import isDevelopment from '#is-development'
import { Interpolation, serializeStyles } from '@emotion/serialize'
import { getRegisteredStyles } from '@emotion/utils'
import React from 'react'
import { withEmotionCache } from './context'
import { getLabelFromStackTrace } from './get-label-from-stack-trace'
import { renderWithStyles } from './render-with-styles'
import { Theme, ThemeContext } from './theming'
import { hasOwn } from './utils'

const typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__'

const labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'

interface EmotionProps {
  css: Interpolation<Theme>
  [typePropName]: React.ElementType
  [labelPropName]?: string
  [key: string]: unknown
}

export const createEmotionProps = (
  type: React.ElementType,
  props: { css: Interpolation<Theme> }
): EmotionProps => {
  if (
    isDevelopment &&
    typeof props.css === 'string' &&
    // check if there is a css declaration
    props.css.indexOf(':') !== -1
  ) {
    throw new Error(
      `Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css\`${props.css}\``
    )
  }

  let newProps = {} as EmotionProps

  for (let key in props) {
    if (hasOwn.call(props, key)) {
      newProps[key] = props[key as keyof typeof props]
    }
  }

  newProps[typePropName] = type

  // Runtime labeling is an opt-in feature because:
  // - It causes hydration warnings when using Safari and SSR
  // - It can degrade performance if there are a huge number of elements
  //
  // Even if the flag is set, we still don't compute the label if it has already
  // been determined by the Babel plugin.
  if (
    isDevelopment &&
    typeof globalThis !== 'undefined' &&
    !!(globalThis as any).EMOTION_RUNTIME_AUTO_LABEL &&
    !!props.css &&
    (typeof props.css !== 'object' ||
      !('name' in props.css) ||
      typeof props.css.name !== 'string' ||
      props.css.name.indexOf('-') === -1)
  ) {
    const label = getLabelFromStackTrace(new Error().stack)
    if (label) newProps[labelPropName] = label
  }

  return newProps
}

let Emotion = /* #__PURE__ */ withEmotionCache<EmotionProps>((props, cache) => {
  let cssProp = props.css as EmotionProps['css']

  // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible
  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp]
  }

  let WrappedComponent = props[
    typePropName
  ] as EmotionProps[typeof typePropName]
  let registeredStyles = [cssProp]
  let className = ''

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(
      cache.registered,
      registeredStyles,
      props.className
    )
  } else if (props.className != null) {
    className = `${props.className} `
  }

  let serialized = serializeStyles(
    registeredStyles,
    undefined,
    React.useContext(ThemeContext)
  )

  if (isDevelopment && serialized.name.indexOf('-') === -1) {
    let labelFromStack = props[labelPropName]
    if (labelFromStack) {
      serialized = serializeStyles([
        serialized,
        'label:' + labelFromStack + ';'
      ])
    }
  }

  className += `${cache.key}-${serialized.name}`

  const newProps: Record<string, unknown> = {}
  for (let key in props) {
    if (
      hasOwn.call(props, key) &&
      key !== 'css' &&
      key !== typePropName &&
      (!isDevelopment || key !== labelPropName)
    ) {
      newProps[key] = props[key]
    }
  }
  newProps.className = className

  return renderWithStyles(
    <WrappedComponent {...newProps} />,
    cache,
    [serialized],
    typeof WrappedComponent === 'string'
  )
})

if (isDevelopment) {
  Emotion.displayName = 'EmotionCssPropInternal'
}

export default Emotion
