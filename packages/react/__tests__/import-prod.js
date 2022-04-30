// @flow
import 'test-utils/prod-mode'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import prettify from '@emotion/css-prettifier'

// using styled instead of the css prop because there was a really weird flow error
// when using `jsx` from @emotion/react and Global
let Comp = styled.div({ color: 'hotpink' })

expect.addSnapshotSerializer({
  test: x => x instanceof StyleSheet,
  print: ({ cssRules }) => {
    let styles = ''
    for (let rule of cssRules) {
      styles += rule.cssText
    }
    return prettify(styles)
  }
})

// can't use RTL as production React 18 throws when it's trying to use `act`
const render = children =>
  new Promise(resolve => {
    const el = document.createElement('div')
    // $FlowFixMe
    document.body.appendChild(el)

    if ((ReactDOM: any).createRoot) {
      const root = (ReactDOM: any).createRoot(el)
      root.render(<div ref={resolve}>{children}</div>)
    } else {
      ReactDOM.render(children, el, resolve)
    }
  })

test('it works', async () => {
  await render(
    <div>
      <Comp>something</Comp>

      <Global
        styles={{
          html: {
            backgroundColor: 'yellow'
          }
        }}
      />
      <Global
        styles={css`
          @import url('something.com/file.css');
          body {
            padding: 0;
          }
        `}
      />
    </div>
  )
  // order should be
  // 1. html { background-color: yellow; }
  // 1. @import
  // 2. body { padding: 0; }
  // 3. styled comp

  // querying for style instead of [data-emotion] to appease flow
  let elements = Array.from(document.querySelectorAll('style')).filter(x =>
    x.getAttribute('data-emotion')
  )

  expect(elements.map(x => x.getAttribute('data-emotion'))).toEqual([
    'css-global',
    'css-global',
    'css'
  ])

  expect(elements[0].sheet).toMatchInlineSnapshot(`
    html {
      background-color: yellow;
    }
  `)
  expect(elements[1].sheet).toMatchInlineSnapshot(`
@import url(something.com/file.css);

body {
  padding: 0;
}
`)
  expect(elements[2].sheet).toMatchInlineSnapshot(`
.css-1lrxbo5 {
  color: hotpink;
}
`)
})
