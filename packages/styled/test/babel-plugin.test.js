// @flow
import 'test-utils/legacy-env'
import React from 'react'
import * as renderer from 'react-test-renderer'
import styled from '@emotion/styled'

test("config merging works even if it's referenced by variable", () => {
  const Button = ({ isRed, ...rest }) => (
    <button {...rest}>{isRed ? 'forwarded' : 'not forwarded'}</button>
  )

  const cfg = { shouldForwardProp: p => p !== 'isRed' }
  const StyledButton = styled(Button, cfg)({})
  const tree = renderer.create(<StyledButton isRed />).toJSON()
  expect(tree.children).toEqual(['not forwarded'])
})
