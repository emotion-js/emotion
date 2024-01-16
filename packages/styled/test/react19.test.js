/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css } from '@emotion/react'
import { render } from '@testing-library/react'

test('basic', () => {
  render(<div css={{ color: 'hotpink' }}>{'Test'}</div>)

  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="css 3sn2xs"
          data-href="css-3sn2xs"
          data-precedence="emotion"
        >
          .css-3sn2xs{color:hotpink;}/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlYWN0MTkudGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNYyIsImZpbGUiOiJyZWFjdDE5LnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCAndGVzdC11dGlscy9uZXh0LWVudidcbmltcG9ydCB7IGpzeCwgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdAdGVzdGluZy1saWJyYXJ5L3JlYWN0J1xuXG50ZXN0KCdiYXNpYycsICgpID0+IHtcbiAgcmVuZGVyKDxkaXYgY3NzPXt7IGNvbG9yOiAnaG90cGluaycgfX0+eydUZXN0J308L2Rpdj4pXG5cbiAgZXhwZWN0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkudG9NYXRjaElubGluZVNuYXBzaG90KClcbn0pXG4iXX0= */
        </style>
      </head>
      <body>
        <div>
          <div
            class="css-3sn2xs"
          >
            Test
          </div>
        </div>
      </body>
    </html>
  `)
})
