// @flow
import { StyleSheet } from '@emotion/sheet'

const rule = 'html { color: hotpink; }'

describe('StyleSheet', () => {
  it('should be speedy by default in production', () => {
    process.env.NODE_ENV = 'production'
    const sheet = new StyleSheet()
    expect(sheet.isSpeedy).toBe(true)
    process.env.NODE_ENV = 'test'
  })

  it('should not be speedy in a non-production environment by default', () => {
    const sheet = new StyleSheet()
    expect(sheet.isSpeedy).toBe(false)
  })

  it('should remove its style elements from the document when flushed', () => {
    const sheet = new StyleSheet()
    sheet.insert(rule)
    expect(document.querySelector('html')).toMatchSnapshot()
    sheet.flush()
    expect(document.querySelector('html')).toMatchSnapshot()
  })

  it('should set the data-emotion attribute to the key option', () => {
    const key = 'some-key'
    const sheet = new StyleSheet({ key })
    sheet.insert(rule)
    expect(document.querySelector('html')).toMatchSnapshot()
    expect(
      // $FlowFixMe
      document.querySelector('[data-emotion]').getAttribute('data-emotion')
    ).toBe(key)
    sheet.flush()
  })

  it('should insert a rule into the DOM when not in speedy', () => {
    const sheet = new StyleSheet({})
    sheet.insert(rule)
    expect(document.querySelector('html')).toMatchSnapshot()
    sheet.flush()
  })

  it('should insert a rule with insertRule when in speedy', () => {
    const sheet = new StyleSheet({ speedy: true })
    sheet.insert(rule)
    expect(document.querySelector('html')).toMatchSnapshot()
    expect(sheet.tags).toHaveLength(1)
    // $FlowFixMe
    expect(sheet.tags[0].sheet.cssRules).toMatchSnapshot()
    sheet.flush()
  })

  it('should throw when inserting a bad rule in speedy mode', () => {
    const sheet = new StyleSheet({ speedy: true })
    const oldConsoleWarn = console.warn
    // $FlowFixMe
    console.warn = jest.fn()
    sheet.insert('.asdfasdf4###112121211{')
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn.mock.calls[0][0]).toBe(
      'There was a problem inserting the following rule: ".asdfasdf4###112121211{"'
    )
    // $FlowFixMe
    console.warn = oldConsoleWarn
    sheet.flush()
  })

  it('should set the nonce option as an attribute to style elements', () => {
    let nonce = 'some-nonce'
    const sheet = new StyleSheet({ nonce })
    sheet.insert(rule)
    expect(sheet.tags[0]).toBe(document.querySelector('[data-emotion]'))
    expect(sheet.tags).toHaveLength(1)
    expect(sheet.tags[0].getAttribute('nonce')).toBe(nonce)
    sheet.flush()
  })

  it("should use the container option instead of document.head to insert style elements into if it's passed", () => {
    const container = document.createElement('div')
    // $FlowFixMe
    document.body.appendChild(container)
    const sheet = new StyleSheet({ container })
    expect(sheet.container).toBe(container)
    sheet.insert(rule)
    expect(document.querySelector('html')).toMatchSnapshot()
    expect(sheet.tags).toHaveLength(1)
    expect(sheet.tags[0].parentNode).toBe(container)
    sheet.flush()
    // $FlowFixMe
    document.body.removeChild(container)
  })
})
