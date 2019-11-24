// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup)

test('can cloneElement with element with css prop', () => {
  let element = <div css={{ color: 'hotpink' }} id="initial" />

  let cloned = React.cloneElement(element, { id: 'cloned' })

  let { container } = render(cloned)

  expect(container.firstChild.id).toBe('cloned')
})
