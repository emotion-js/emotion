import 'test-utils/legacy-env'
import * as renderer from 'react-test-renderer'
import React from 'react'
import styled from '@emotion/styled'

import { ThemeProvider } from 'emotion-theming'

test('with styled', () => {
  const theme = { bg: 'green', color: 'red' }

  const ThemedComponent = styled.div`
    color: ${p => p.theme.color};
  `

  const ReThemedComponent = styled(ThemedComponent)`
    background-color: ${p => p.theme.bg};
  `
  const FinalComponent = styled(ReThemedComponent)`
    border: 1px solid blue;
  `

  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <FinalComponent />
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
