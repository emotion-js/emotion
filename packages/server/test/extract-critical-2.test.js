/**
 * @jest-environment node
 * @flow
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import type { Emotion } from '@emotion/css/create-instance'
import { prettifyCritical2 } from './util'

let emotion = require('@emotion/css')
let reactEmotion = require('@emotion/styled')
let emotionServer = require('@emotion/server')

export const getComponents = (
  emotion: Emotion,
  { default: styled }: { default: Function }
) => {
  let Provider = require('@emotion/react').CacheProvider
  let Global = require('@emotion/react').Global
  let { css } = emotion

  const hoverStyles = css`
    color: hotpink;
    &:hover {
      color: white;
      background-color: lightgray;
      border-color: aqua;
      box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
    }
    label: hoverStyles;
  `

  // this is using @emotion/styled/base
  // so the call syntax has to be used
  const Main = styled('main')`
    ${hoverStyles};
    display: flex;
    label: Something_Main;
  `

  const Page1 = () => (
    <Provider value={emotion.cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Global styles={{ html: { background: 'red' } }} />
      <Main />
    </Provider>
  )

  const Page2 = () => (
    <Provider value={emotion.cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Main />
    </Provider>
  )
  return { Page1, Page2 }
}

describe('extractCritical2', () => {
  const { Page1, Page2 } = getComponents(emotion, reactEmotion)

  const page1Critical = emotionServer.extractCritical2(
    renderToString(<Page1 />)
  )
  const page2Critical = emotionServer.extractCritical2(
    renderToString(<Page2 />)
  )

  test('returns static css', () => {
    expect(prettifyCritical2(page1Critical)).toMatchSnapshot()
    expect(prettifyCritical2(page2Critical)).toMatchSnapshot()
  })

  test('generates correct style tags using constructStyleTags', () => {
    expect(emotionServer.constructStyleTags(page1Critical)).toMatchSnapshot()
    expect(emotionServer.constructStyleTags(page2Critical)).toMatchSnapshot()
  })
})
