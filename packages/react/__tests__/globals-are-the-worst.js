// @flow
import 'test-utils/dev-mode'
import { render } from '@testing-library/react'
import * as React from 'react'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'

test('specificity with globals', () => {
  let SomeComponent = styled.p`
    color: hotpink;
  `
  let Comp = ({ itShouldNotBeThisColor }) => (
    <div id="root">
      <Global
        styles={{
          '.some-class': {
            color: itShouldNotBeThisColor
          }
        }}
      />
      {/* this should be hotpink */}
      <SomeComponent id="text" className="some-class">
        some text
      </SomeComponent>
    </div>
  )

  const { rerender } = render(<Comp itShouldNotBeThisColor="green" />)
  expect(document.documentElement).toMatchSnapshot()
  rerender(<Comp itShouldNotBeThisColor="yellow" />)
  expect(document.documentElement).toMatchSnapshot()
})
