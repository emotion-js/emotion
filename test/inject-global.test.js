/* eslint-env jest */
import { injectGlobal, sheet, fragment } from '../src/index'

test('injectGlobal', () => {
  injectGlobal`
    html {
      background: pink;
    }
  `
  const bodyStyles = fragment`
    margin: 0;
    padding: 0;
  `
  const color = 'yellow'
  injectGlobal`
    body {
      color: ${color}
      @apply ${bodyStyles}
    }
  `
  expect(
    sheet.tags.map(tag => tag.textContent || '').join('')
  ).toMatchSnapshot()
})
