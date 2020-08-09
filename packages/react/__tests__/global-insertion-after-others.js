/** @jsx jsx */
import { jsx, Global } from '@emotion/react'
import { render } from '@testing-library/react'

let getDataAttributes = () =>
  Array.from(
    document.querySelectorAll('style[data-emotion]:not([data-eager-key])'),
    x => x.getAttribute('data-emotion')
  )

test('Global style element insertion after insertion of other styles', () => {
  let Comp = ({ second }) => (
    <div>
      <div
        css={{
          color: 'green'
        }}
      />
      {second && (
        <Global
          styles={{
            html: {
              backgroundColor: 'hotpink'
            }
          }}
        />
      )}
    </div>
  )
  let { rerender } = render(<Comp />)
  expect(getDataAttributes()).toEqual(['css'])
  rerender(<Comp second />)
  expect(getDataAttributes()).toEqual(['css', 'css-global'])
})
