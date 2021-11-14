// @flow
import * as React from 'react'

import * as EmotionCssFunc from './implementations/emotion-css-func'
import * as EmotionCssProp from './implementations/emotion-css-prop'
import * as EmotionStyled from './implementations/emotion-styled'

const impls = {
  'emotion-css-func': EmotionCssFunc,
  'emotion-css-prop': EmotionCssProp,
  'emotion-styled': EmotionStyled
}

type ComponentsType = {
  Box: React.ElementType,
  Dot: React.ElementType,
  Provider: React.ElementType,
  View: React.ElementType
}

type ImplementationType = {
  components: ComponentsType,
  name: string
}

const implementations: Array<ImplementationType> = Object.keys(impls).map(
  name => {
    const components = impls[name]
    return { components, name }
  }
)

const toObject = (
  impls: Array<ImplementationType>
): { [name: string]: ImplementationType } =>
  impls.reduce((acc, impl) => {
    acc[impl.name] = impl
    return acc
  }, {})

const map = toObject(implementations)

export default map
