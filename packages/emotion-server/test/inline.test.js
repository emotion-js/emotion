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
    reactEmotion = require('@emotion/styled')
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
  test('skip undefined styles', () => {
    const { css } = emotion
    const style = css`
      color: red;
    `
    const component = <a href={`${emotion.cache.key}-fail`} className={style} />
    const output = emotionServer.renderStylesToString(renderToString(component))

    expect(output).toEqual(expect.not.stringContaining('undefined'))
    expect(output).toMatchSnapshot()
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
    reactEmotion = require('@emotion/styled')
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
    emotion = require('emotion')
    emotionServer = require('emotion-server')
    reactEmotion = require('@emotion/styled')

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)

    renderToString(<NewPage1 />)
    expect(getInjectedRules()).toMatchSnapshot()
    expect(getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
