import { flush, sheet } from 'emotion'

describe('sheet', () => {
  beforeEach(() => {
    sheet.isSpeedy = true
  })

  afterEach(() => {
    sheet.isSpeedy = false
    flush()
  })

  test('speedy', () => {
    expect(sheet.isSpeedy).toBe(true)
  })

  test('tags', () => {
    const rule = '.foo { color: blue; }'
    sheet.insert(rule)
    expect(sheet.tags).toMatchSnapshot()
    expect(sheet.tags.length).toBe(1)
  })

  test('cssRules', () => {
    const rule = '.foo { color: blue; }'
    sheet.insert(rule)
    expect(sheet.sheet).toBeFalsy()
  })

  test('flush', () => {
    sheet.insert('.foo { color: blue; }')
    sheet.flush()
    expect(sheet.tags).toMatchSnapshot()
    expect(sheet.tags.length).toBe(0)
  })

  test('throws', () => {
    const spy = jest.spyOn(global.console, 'warn')
    sheet.insert('.asdfasdf4###112121211{')
    expect(spy).toHaveBeenCalled()
  })

  test('inject method throws if the sheet is already injected', () => {
    expect(() => {
      sheet.inject()
    }).toThrowErrorMatchingSnapshot()
  })

  test('nonce', () => {
    sheet.flush()
    const el = document.createElement('style')
    el.setAttribute('nonce', '123456')
    document.head.appendChild(el)
    sheet.inject()
    expect(sheet.tags).toMatchSnapshot()
  })
})
