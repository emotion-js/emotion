// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { render, cleanup } from '@testing-library/react'
import { ignoreConsoleErrors } from 'test-utils'

afterEach(cleanup)

test('ref', () => {
  const H1 = styled.h1`
    font-size: 12px;
  `
  let node

  render(
    <H1
      ref={val => {
        node = val
      }}
      id="thing"
    >
      hello world
    </H1>
  )
  expect(node).toBe(document.getElementById('thing'))
})
