/**
 * @jest-environment node
*/
import React from 'react'
import { renderToString } from 'react-dom/server'
import {
  getComponents,
  getInjectedRules,
  createBigComponent,
  getCssFromChunks
} from './util'
import { JSDOM } from 'jsdom'

let emotion
let emotionServer
let reactEmotion

describe('renderStylesToString', () => {
  beforeEach(() => {
    jest.resetModules()
    emotion = require('emotion')
    emotionServer = require('emotion-server')
    reactEmotion = require('react-emotion')
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
    emotion = require('emotion')
    emotionServer = require('emotion-server')
    reactEmotion = require('react-emotion')
  })
  test('only inserts rules that are not in the critical css', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const html = emotionServer.renderStylesToString(renderToString(<Page1 />))
    expect(html).toMatchSnapshot()
    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window
    jest.resetModules()
    emotion = require('emotion')
    expect(emotion.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(getInjectedRules(emotion)).toMatchSnapshot()
    expect(getCssFromChunks(document)).toMatchSnapshot()
  })
})
