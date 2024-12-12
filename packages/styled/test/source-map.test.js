import React from 'react'
import { act } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'

test('inserts source map', async () => {
  let Comp = styled.div`
    color: hotpink;
  `
  await act(() => renderer.create(<Comp />))
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed component', async () => {
  let Comp = styled.div`
    color: hotpink;
  `
  let Comp2 = styled(Comp)`
    background: yellow;
  `
  await act(() => renderer.create(<Comp2 />))
  expect(document.documentElement).toMatchSnapshot()
})

test('source map with composed style', async () => {
  let style = css({ color: 'green' })
  let Comp2 = styled.div`
    background: yellow;
    ${style}
  `
  await act(() => renderer.create(<Comp2 />))
  expect(document.documentElement).toMatchSnapshot()
})
