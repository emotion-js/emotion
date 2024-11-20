import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'

test('inserts source map', () => {
  let Comp = styled.div`
    color: hotpink;
  `
  renderer.create(<Comp />)
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed component', () => {
  let Comp = styled.div`
    color: hotpink;
  `
  let Comp2 = styled(Comp)`
    background: yellow;
  `
  renderer.create(<Comp2 />)
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed style', () => {
  let style = css({ color: 'green' })
  let Comp2 = styled.div`
    background: yellow;
    ${style}
  `
  renderer.create(<Comp2 />)
  expect(document.documentElement).toMatchSnapshot()
})
