// @flow
import { sheet } from 'emotion'

describe('sheet', () => {
  beforeEach(() => {
    sheet.flush()
  })

  test('speedy', () => {
    expect(sheet.isSpeedy).toBe(false)
    sheet.speedy(true)
    expect(sheet.isSpeedy).toBe(true)
    sheet.speedy(false)
    expect(sheet.isSpeedy).toBe(false)
  })

  test('tags', () => {
    sheet.speedy(true)
    const rule = '.foo { color: blue; }'
    sheet.insert(rule)
    expect(sheet.tags).toMatchSnapshot()
    expect(sheet.tags.length).toBe(1)
  })

  test('flush', () => {
    sheet.speedy(true)
    sheet.insert('.foo { color: blue; }')
    sheet.flush()
    expect(sheet.tags.length).toBe(0)
  })

  test('throws', () => {
    sheet.speedy(true)
    const spy = jest.spyOn(global.console, 'warn')
    sheet.insert('.asdfasdf4###112121211{')
    expect(spy).toHaveBeenCalled()
  })

  test('.speedy throws when a rule has already been inserted', () => {
    sheet.insert('.foo { color: blue; }')
    expect(() => {
      sheet.speedy(true)
    }).toThrowErrorMatchingSnapshot()
  })
})
