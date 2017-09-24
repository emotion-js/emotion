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
    expect(sheet.sheet).toMatchSnapshot()
    expect(sheet.sheet[0]).toBe(rule)
  })

  test('flush', () => {
    sheet.insert('.foo { color: blue; }')
    sheet.flush()
    expect(sheet.sheet).toMatchSnapshot()
    expect(sheet.sheet.length).toBe(0)
  })
})
