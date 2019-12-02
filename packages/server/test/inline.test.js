/**
 * @jest-environment node
 * @flow
 */
import { JSDOM } from 'jsdom'

let React
let renderToString
let emotion
let emotionServer
let reactEmotion
let util

const resetAllModules = () => {
  jest.resetModules()
  React = require('react')
  renderToString = require('react-dom/server').renderToString
  emotion = require('emotion')
  emotionServer = require('emotion-server')
  reactEmotion = require('@emotion/styled')
  util = require('./util')
}

describe('renderStylesToString', () => {
  beforeEach(resetAllModules)

  test('renders styles with ids', () => {
    const { Page1, Page2 } = util.getComponents(emotion, reactEmotion)
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
    const BigComponent = util.createBigComponent(emotion)
    expect(
      emotionServer.renderStylesToString(
        renderToString(<BigComponent count={200} />)
      )
    ).toMatchSnapshot()
  })
})
describe('hydration', () => {
  beforeEach(resetAllModules)

  afterAll(() => {
    global.document = undefined
    global.window = undefined
  })

  test('only inserts rules that are not in the critical css', () => {
    const { Page1 } = util.getComponents(emotion, reactEmotion)
    const html = emotionServer.renderStylesToString(renderToString(<Page1 />))
    expect(html).toMatchSnapshot()

    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window
    util.setHtml(html, document)

    resetAllModules()

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = util.getComponents(emotion, reactEmotion)

    renderToString(<NewPage1 />)
    expect(util.getInjectedRules()).toMatchSnapshot()
    expect(util.getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
