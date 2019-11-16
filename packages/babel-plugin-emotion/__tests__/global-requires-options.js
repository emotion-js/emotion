// @flow
import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

const cases = {
  'source maps can be disabled': {
    code: `
import * as React from 'react'
import { Global } from '@emotion/core'

export default () => <Global styles={{ color: 'hotpink' }} />
    `,
    plugins: [[plugin, { sourceMap: false }]]
  }
}

babelTester('Global inline', cases)
