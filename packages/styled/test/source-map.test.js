// @flow
import React from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'

test('inserts source map', () => {
  let Comp = styled.div`
    color: hotpink;
  `
  renderer.create(<Comp />)
  expect(document.documentElement).toMatchSnapshot()
})
