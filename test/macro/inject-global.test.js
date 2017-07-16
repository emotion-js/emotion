/* eslint-env jest */
import { injectGlobal } from '../../src/macro'
import { sheet } from '../../src/index'

test('injectGlobal', () => {
  injectGlobal`
    html {
      background: pink;
    }
    html.active {
      background: red;
    }
  `

  const color = 'yellow'
  injectGlobal`
    body {
      color: ${color}
      margin: 0;
      padding: 0;
    }
  `
  expect(
    sheet.tags.map(tag => tag.textContent || '').join('')
  ).toMatchSnapshot()
})
