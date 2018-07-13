// @flow
import 'test-utils/dev-mode'
import { throwIfFalsy } from 'test-utils'
import * as React from 'react'
import { render } from 'react-dom'
import { Global } from '@emotion/core'
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
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`
  let root = throwIfFalsy(document.getElementById('root'))

  render(<Comp itShouldNotBeThisColor="green" />, root)
  expect(document.documentElement).toMatchSnapshot()
  render(<Comp itShouldNotBeThisColor="yellow" />, root)
  expect(document.documentElement).toMatchSnapshot()
})
