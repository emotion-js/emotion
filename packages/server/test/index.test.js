/**
 * @jest-environment node
 * @flow
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { getComponents, prettifyCritical, getInjectedRules } from './util'
import { JSDOM } from 'jsdom'
import { ignoreConsoleErrors } from 'test-utils'

let emotion = require('@emotion/css')
let reactEmotion = require('@emotion/styled')
let emotionServer = require('@emotion/server')

describe('extractCritical', () => {
  test('returns static css', () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      prettifyCritical(emotionServer.extractCritical(renderToString(<Page1 />)))
    ).toMatchSnapshot()
    expect(
      prettifyCritical(emotionServer.extractCritical(renderToString(<Page2 />)))
    ).toMatchSnapshot()
  })

  test('does not warn when using extract critical', () => {
    let Provider = require('@emotion/react').CacheProvider
    const WithNthSelector = reactEmotion.default('div')({
      ':nth-child(1)': {}
    })

    ignoreConsoleErrors(() => {
      emotionServer.extractCritical(
        renderToString(
          <Provider value={emotion.cache}>
            <WithNthSelector />
          </Provider>
        )
      )

      expect((console.error: any).mock.calls).toMatchObject([])
    })
  })
})
describe('hydration', () => {
  test('only rules that are not in the critical css are inserted', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const { html, ids, css } = emotionServer.extractCritical(
      renderToString(<Page1 />)
    )
    expect(prettifyCritical({ html, css, ids })).toMatchSnapshot()
    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window

    jest.resetModules()
    emotion = require('@emotion/css')
    emotionServer = require('@emotion/server')

    expect(emotion.cache.inserted).toEqual({})
    emotion.hydrate(ids)
    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(getInjectedRules()).toMatchSnapshot()
  })
})
