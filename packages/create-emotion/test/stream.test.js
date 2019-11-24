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
  emotion = require('./emotion-instance')
  emotionServer = require('./emotion-instance')
  reactEmotion = require('./emotion-instance')
  util = require('../../emotion-server/test/util')
}

describe('renderStylesToNodeStream', () => {
  beforeEach(resetAllModules)

  test('renders styles with ids', async () => {
    const { Page1, Page2 } = util.getComponents(emotion, reactEmotion)
    expect(
      await util.renderToStringWithStream(<Page1 />, emotionServer)
    ).toMatchSnapshot()
    expect(
      await util.renderToStringWithStream(<Page2 />, emotionServer)
    ).toMatchSnapshot()
  })
  test('renders large recursive component', async () => {
    const BigComponent = util.createBigComponent(emotion)
    expect(
      await util.renderToStringWithStream(
        <BigComponent count={200} />,
        emotionServer
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

  test('only inserts rules that are not in the critical css', async () => {
    const { Page1 } = util.getComponents(emotion, reactEmotion)
    const html = await util.renderToStringWithStream(<Page1 />, emotionServer)
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
