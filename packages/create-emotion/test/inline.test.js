/**
 * @jest-environment node
 * @flow
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import {
  getComponents,
  getInjectedRules,
  createBigComponent,
  getCssFromChunks,
  setHtml
} from '../../emotion-server/test/util'
import { JSDOM } from 'jsdom'

let emotion
let emotionServer
let reactEmotion

describe('renderStylesToString', () => {
  beforeEach(() => {
    jest.resetModules()
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')
  })
  test('renders styles with ids', () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      emotionServer.renderStylesToString(renderToString(<Page1 />))
    ).toMatchSnapshot()
    expect(
      emotionServer.renderStylesToString(renderToString(<Page2 />))
    ).toMatchSnapshot()
  })
  test('renders large recursive component', () => {
    const BigComponent = createBigComponent(emotion)
    expect(
      emotionServer.renderStylesToString(
        renderToString(<BigComponent count={200} />)
      )
    ).toMatchSnapshot()
  })
})
describe('hydration', () => {
  afterAll(() => {
    global.document = undefined
    global.window = undefined
  })
  beforeEach(() => {
    jest.resetModules()
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')
  })
  test('only inserts rules that are not in the critical css', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const html = emotionServer.renderStylesToString(renderToString(<Page1 />))
    expect(html).toMatchSnapshot()
    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window
    setHtml(html, document)
    jest.resetModules()
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(getInjectedRules()).toMatchSnapshot()
    expect(getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
