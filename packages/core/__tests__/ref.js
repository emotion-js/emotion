// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import { render, cleanup } from 'react-testing-library'

afterEach(cleanup)

test('ref works', () => {
  let ref = React.createRef()
  let { getByTestId } = render(
    <div data-testid="test" css={{ color: 'hotpink' }} ref={ref} />
  )

  expect(getByTestId('test')).toBe(ref.current)
})
