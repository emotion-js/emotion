---
title: "CSS Prop"
---

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

**Notes:**
- This feature requires the `"emotion"` babel plugin.
- CSS props are not compatible with babel's `"transform-react-inline-elements"` plugin. If you include it in your `.babelrc`, no transformation will take place and your styles will silently fail.
