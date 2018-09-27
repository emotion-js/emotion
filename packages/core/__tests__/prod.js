import 'test-utils/prod-mode'
import { css } from '@emotion/core'

test('css works', () => {
  // css has a different return in prod so this is just making sure that isn't broken

  expect(css({ color: 'hotpink' })).toMatchInlineSnapshot(`
Object {
  "name": "1lrxbo5",
  "next": undefined,
  "styles": "color:hotpink;",
}
`)
})
