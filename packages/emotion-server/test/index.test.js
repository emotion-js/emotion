/**
 * @jest-environment node
*/
import React from 'react'
import { renderToString } from 'react-dom/server'
import { getComponents, prettyifyCritical } from './util'

let emotion = require('emotion')
let reactEmotion = require('react-emotion')
let emotionServer = require('emotion-server')

describe('extractCritical', () => {
  test('returns static css', () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      prettyifyCritical(
        emotionServer.extractCritical(renderToString(<Page1 />))
      )
    ).toMatchSnapshot()
    expect(
      prettyifyCritical(
        emotionServer.extractCritical(renderToString(<Page2 />))
      )
    ).toMatchSnapshot()
  })
})
describe('hydration', () => {
  test('only rules that are not in the critical css are inserted', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const { html, ids, css } = emotionServer.extractCritical(
      renderToString(<Page1 />)
    )
    expect(prettyifyCritical({ html, css, ids })).toMatchSnapshot()
    jest.resetModules()
    global.__SECRET_EMOTION__ = undefined
    emotion = require('emotion')
    emotionServer = require('emotion-server')
    expect(emotion.inserted).toEqual({})
    expect(emotion.inserted).toBe(global.__SECRET_EMOTION__)
    emotion.hydrate(ids)
    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(emotion.sheet.sheet).toMatchSnapshot()
  })
})
