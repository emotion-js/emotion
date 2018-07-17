// @flow
import * as React from 'react'

// $FlowFixMe
let impls = require('./implementations/*/index.js')

console.log(impls)

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
