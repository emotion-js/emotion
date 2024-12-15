import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { render } from '@testing-library/react'

test('inserts source map', () => {
  let Comp = styled.div`
    color: hotpink;
  `
  render(<Comp />)
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed component', () => {
  let Comp = styled.div`
    color: hotpink;
  `
  let Comp2 = styled(Comp)`
    background: yellow;
  `
  render(<Comp2 />)
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed style', () => {
  let style = css({ color: 'green' })
  let Comp2 = styled.div`
    background: yellow;
    ${style}
  `
  render(<Comp2 />)
  expect(document.documentElement).toMatchSnapshot()
})
