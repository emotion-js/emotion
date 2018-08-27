// @flow
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import * as emotion from 'emotion'
import createCompatCache from '@emotion/compat-cache'
import { Provider } from '@emotion/core'

let compatCache = createCompatCache(emotion)

export let create = (element: React.Node) => {
  return renderer.create(<Provider value={compatCache}>{element}</Provider>)
}
