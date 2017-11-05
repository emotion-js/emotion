---
title: "CSS"
---
`css` accepts styles as a template literal, object, or array of objects and returns a class name. It is the foundation of emotion.

```jsx harmony
import { css } from 'emotion'
import { lighten, modularScale } from 'polished'

// Write your css as normal.
const flex = css`
  display: flex;
`
const justifyCenter = css`
  ${flex};
  justifyContent: center;
`

// As an object
const cssA = {
  // Easily use [polished](https://polished.js.org/)
  color: lighten(0.2, '#000'),
  "font-size": modularScale(1),
  [hiDPI(1.5)]: {
    "font-size": modularScale(1.25)
  }
}

const H1 = styled('h1')`
  ${cssA};
  font-size: ${modularScale(4)};
`

const H2 = styled(H1)`font-size:32px;`
<div className={justifyCenter}>
  <H2 scale={2} className={'legacy__class'}>
    Centered Content
  </H2>
</div>
```

## CSS Prop 
###### [requires babel plugin](babel.md)
A shortcut for calling the css function and appending the result to the className prop. Done at compile time.
_Note: CSS props are not compatible with babel's `"transform-react-inline-elements"` plugin. If you include it in your `.babelrc` no transformation will take place and your styles will silently fail._

```jsx
function SomeComponent (props) {
  // Create styles as if you're calling css and the class will be applied to the component
  return (<div css={`
    color: blue;
    font-size: ${props.fontSize}px;

    &:hover {
      color: green;
    }

    & .some-class {
      font-size: 20px;
    }
  `}>
    This will be blue until hovered.
    <div className="some-class">
      This font size will be 20px
    </div>
  </div>)
}

```
