/**
 * @jest-environment node
 * @flow
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { getComponents, prettifyCritical2 } from './util'

let emotion = require('@emotion/css')
let reactEmotion = require('@emotion/styled')
let emotionServer = require('@emotion/server')

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
