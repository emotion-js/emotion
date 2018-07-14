// @flow
import 'test-utils/legacy-env'
import { injectGlobal, sheet } from 'emotion/macro'

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
      color: ${color};
      margin: 0;
      padding: 0;
    }
  `
  expect(sheet).toMatchSnapshot()
})
