import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import * as renderer from 'react-test-renderer'
import styled from '@emotion/styled'

test("config merging works even if it's referenced by variable", async () => {
  const Button = ({ isRed, ...rest }) => (
    <button {...rest}>{isRed ? 'forwarded' : 'not forwarded'}</button>
  )

  const cfg = { shouldForwardProp: p => p !== 'isRed' }
  const StyledButton = styled(Button, cfg)({})
  const tree = (
    await act(() => renderer.create(<StyledButton isRed />))
  ).toJSON()
  expect(tree.children).toEqual(['not forwarded'])
})
