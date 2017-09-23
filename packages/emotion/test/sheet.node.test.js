/**
 * @jest-environment node
 */
import { flush, sheet } from 'emotion'

describe('sheet', () => {
  afterEach(() => {
    flush()
  })

  test('tags', () => {
    sheet.insert('.foo { color: blue; }')
    expect(sheet.tags.length).toBe(0)
  })

  test('cssRules', () => {
    const rule = '.foo { color: blue; }'
    sheet.insert(rule)
    expect(sheet.sheet.cssRules).toMatchSnapshot()
    expect(sheet.sheet.cssRules[0].cssText).toBe(rule)
  })

  test('flush', () => {
    sheet.insert('.foo { color: blue; }')
    sheet.flush()
    expect(sheet.sheet.cssRules).toMatchSnapshot()
    expect(sheet.sheet.cssRules.length).toBe(0)
  })
})
