---
title: "CSS"
---

`css` is one of the most important parts of emotion, it accepts styles as a template literal, object, or array of objects and returns a class name.

`css` can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

```jsx live
import { css } from 'emotion'

const color = 'darkgreen'

render(
  <div
    className={css`
      background-color: hotpink;
      color: ${color};
    `}
  >
    This has a hotpink background.
  </div>
)
```

`css` also accepts styles as an object, for more usage with objects, go [here](https://emotion.sh/docs/object-styles).

```jsx live
import { css } from 'emotion'

render(
  <div
    className={css({
      backgroundColor: 'hotpink',
    })}
  >
    This has a hotpink background.
  </div>
)
```

```jsx
import { css } from 'emotion'
import { hiDPI, lighten, modularScale } from 'polished'

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

## `label` Property

`css` accepts a css property called `label` that will be appended to the end of the class name so it's more readable. `babel-plugin-emotion`'s `autoLabel` option will add these labels automatically based on the variable name and other information.

```jsx live
import { css } from 'emotion'

const className = css`
  color: hotpink;
  label: some-name;
`

const anotherClassName = css({
  color: 'lightgreen',
  label: 'another-name',
})

render(
  <div>
    <div className={className}>
      {className}
    </div>
    <div className={anotherClassName}>
      {anotherClassName}
    </div>
  </div>
)
```

## CSS Prop

###### [requires `babel-plugin-emotion`](https://emotion.sh/docs/babel-plugin-emotion)

With `babel-plugin-emotion`, the css prop can be used, this accepts styles like `css`

A shortcut for calling the css function and appending the result to the className prop. Done at compile time. _Note: CSS props are not compatible with babel's `"transform-react-inline-elements"` plugin. If you include it in your `.babelrc` no transformation will take place and your styles will silently fail._

```jsx live
function SomeComponent(props) {
  // Create styles as if you're calling css and the class will be applied to the component
  return (
    <div
      css={`
    color: blue;
    font-size: ${props.fontSize}px;

    &:hover {
      color: green;
    }

    & .some-class {
      font-size: 20px;
    }
  `}
    >
      This will be blue until hovered.
      <div className="some-class">This font size will be 20px</div>
      <div css={{ color: 'hotpink' }}>This is hotpink</div>
    </div>
  )
}
render(<SomeComponent fontSize={15} />)
```
