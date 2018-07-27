# @emotion/provider

> A React component to provide a theme to child components

## Install

```bash
yarn add @emotion/provider
```

## Usage

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/jsx'
import styled from '@emotion/styled'
import * as React from 'react'
import ThemeProvider from '@emotion/provider'

let SomeParagraph = styled.p`
  color: ${props => props.theme.primaryColor};
`

class SomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        primaryColor: 'hotpink'
      }
    }
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <h1 css={theme => ({ color: theme.primaryColor })}>some heading</h1>
        <SomeParagraph>some text</SomeParagraph>
      </ThemeProvider>
    )
  }
}
```
