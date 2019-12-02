import 'test-utils/prod-mode'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import renderer from 'react-test-renderer'

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

test('props work', () => {
  let tree = renderer.create(<div css={{ color: 'hotpink' }} hidden />)
  expect(tree.toJSON().props.hidden).toBe(true)
})
