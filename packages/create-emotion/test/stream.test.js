// @flow
/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import {
  getComponents,
  getInjectedRules,
  createBigComponent,
  getCssFromChunks,
  setHtml,
  renderToStringWithStream
} from '../../emotion-server/test/util'
import { JSDOM } from 'jsdom'

let emotion
let emotionServer
let reactEmotion

describe('renderStylesToNodeStream', () => {
  beforeEach(() => {
    global.__SECRET_EMOTION__ = undefined
    jest.resetModules()
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')
  })
  test('renders styles with ids', async () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      await renderToStringWithStream(<Page1 />, emotionServer)
    ).toMatchSnapshot()
    expect(
      await renderToStringWithStream(<Page2 />, emotionServer)
    ).toMatchSnapshot()
  })
  test('renders large recursive component', async () => {
    const BigComponent = createBigComponent(emotion)
    expect(
      await renderToStringWithStream(
        <BigComponent count={200} />,
        emotionServer
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
    global.__SECRET_EMOTION__ = undefined
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')
  })
  test('only inserts rules that are not in the critical css', async () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const html = await renderToStringWithStream(<Page1 />, emotionServer)
    expect(html).toMatchSnapshot()
    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window
    global.__SECRET_EMOTION__ = undefined
    setHtml(html, document)
    jest.resetModules()
    emotion = require('./emotion-instance')
    emotionServer = require('./emotion-instance')
    reactEmotion = require('./emotion-instance')
    expect(emotion.caches.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(getInjectedRules(emotion)).toMatchSnapshot()
    expect(getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
