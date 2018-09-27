// @flow
import createEmotion from 'create-emotion'
import { container, css, sheet } from './emotion-instance'

describe('general instance tests', () => {
  test('inserts style tags into container', () => {
    css`
      display: flex;
    `
    sheet.tags.forEach(tag => {
      expect(tag.getAttribute('data-emotion')).toBe('some-key')
      expect(tag.getAttribute('nonce')).toBe('some-nonce')
      expect(tag.parentNode).toBe(container)
    })
  })
  test('throws with invalid key', () => {
    expect(() => {
      createEmotion({ key: 'css1' })
    }).toThrowErrorMatchingSnapshot()
  })
})
