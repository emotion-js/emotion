// @flow
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { cache as vanillaEmotionCache } from 'emotion'
import type { CSSContextType } from '@emotion/utils'
import { Provider } from '@emotion/core'

export let create = (
  element: React.Node,
  cache: CSSContextType = vanillaEmotionCache
) => {
  return renderer.create(<Provider value={cache}>{element}</Provider>)
}
