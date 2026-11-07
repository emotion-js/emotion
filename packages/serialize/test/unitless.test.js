import { serializeStyles } from '../src'

test.each([
  ['fontSizeAdjust', 0.5, 'font-size-adjust:0.5;'],
  ['initialLetter', 3, 'initial-letter:3;'],
  ['mathDepth', 2, 'math-depth:2;'],
  ['gridArea', 2, 'grid-area:2;']
])('serializes %s as a unitless value', (property, value, expected) => {
  expect(serializeStyles([{ [property]: value }]).styles).toBe(expected)
})

test('continues to add units to lengths', () => {
  expect(serializeStyles([{ width: 2, opacity: 0.5 }]).styles).toBe(
    'width:2px;opacity:0.5;'
  )
})
