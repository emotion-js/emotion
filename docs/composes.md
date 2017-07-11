## Composes Property

The composes property is based on [css modules' composes property](https://github.com/css-modules/css-modules#composition).

```jsx
import { css } from 'emotion'
import styled from 'emotion/react'

// Define a class
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

// You can use compose them with the composes property
const flexCenterClass = css`
  composes: ${flexCenter};
  flex-direction: column;
`

// You can also use them in styled.* and the css prop
const FlexCenterComponent = styled.div`
  composes: ${flexCenter};
`


const flexWrap = css`
  flex-wrap: wrap;
`

// You can compose with use multiple classes
const ColumnCenteredComponent = styled.div`
  composes: ${flexCenter} ${flexWrap};
`

// You can also use composes with regular classes or classes from a css module
const CssModuleComponent = styled.h1`
  composes: ${'some-class'} ${styles.header};
`

// composes MUST be the first rule, e.g. this doesn't work
const cls = css`
  font-size: 20px;
  composes: ${flexCenter}
`

// composes also does not work in nested selectors, e.g. this doesn't work
const cls = css`
  & .flex {
      composes: ${flexCenter}
  }
`

```
