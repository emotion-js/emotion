// @flow
import * as React from 'react'
import packageJson from '../package.json'

// $FlowFixMe
const context = require.context('./implementations/', true, /index\.js$/)
const { dependencies } = packageJson

type ComponentsType = {
  Box: React.ElementType,
  Dot: React.ElementType,
  Provider: React.ElementType,
  View: React.ElementType
}

type ImplementationType = {
  components: ComponentsType,
  name: string,
  version: string
}

const toImplementations = (context: Object): Array<ImplementationType> =>
  context.keys().map(path => {
    // $FlowFixMe
    const components = context(path).default
    const name = path.split('/')[1]
    const version = dependencies[name] || ''
    return { components, name, version }
  })

const toObject = (impls: Array<ImplementationType>): Object =>
  impls.reduce((acc, impl) => {
    acc[impl.name] = impl
    return acc
  }, {})

const map = toObject(toImplementations(context))

export default map
