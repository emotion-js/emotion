---
title: "CSS"
---

The primary way to style things in emotion is with `css`, it accepts styles as a template literal, object, or array of objects and returns a class name.

`css` can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

```jsx live
import { css } from 'emotion'

const color = 'darkgreen'

render(
  <div
    className={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

`css` also accepts styles as an object, for more usage with objects, go [here](/docs/object-styles.md).

```jsx live
import { css } from 'emotion'

render(
  <div
    className={css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    })}
  >
    This has a hotpink background.
  </div>
)
```

## CSS Prop

> Note:

> [The css prop requires `babel-plugin-emotion`](/packages/babel-plugin-emotion).


With `babel-plugin-emotion`, the css prop can be used, it accepts styles like `css` and adds it to the className of the element it's on. This happens at compile time by converting the css prop to a css call and prepending it to the className of the element. It will only work if you use it as an actual JSX attribute, if it's in an object that's spread onto the element it won't work.

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

> Note:

> The css prop is not compatible with `babel-plugin-transform-react-inline-elements`. If you include it in your `.babelrc` no transformation will take place and your styles won't be applied.