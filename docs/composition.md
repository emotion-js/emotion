## Composition

`css` can be used in emotion to build styles that can compose with other styles.

```jsx
import { css } from 'emotion'
import styled from 'react-emotion'

// Define a class
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

// interpolate it where you want to apply the styles
const flexCenterClass = css`
  ${flexCenter};
  flex-direction: column;
`

// You can also it in in styled and the css prop too
const FlexCenterComponent = styled.div`
  ${flexCenter};
`


const flexWrap = props => css`
  flex-wrap: ${props.wrap};
`

// You can compose with use multiple classes
const ColumnCenteredComponent = styled.div`
  ${flexCenter};
  ${flexWrap};
`

// composition can get very powerful because the styles are expanded where you interpolate
// for example, this class still has flex-direction: column; since
// the style is interpolated after the flex-direction: row;
const stillColumn = css`
  flex-direction: row;
  ${flexCenter}
`

// you can compose styles in nested selectors too
const cls = css`
  & .flex {
      ${flexCenter};
  }
`

```
