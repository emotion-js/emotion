## Debugging With Named Selectors

You can add a `name` property to your styles and emotion will attach it to the generated class name.

If you do not provide a `name`, emotion will try to use the variable name.

```jsx harmony
// both examples produce the same class name
const BlueText = css`color: blue;`

const BlueText = css`
 name: BlueText;
 color: blue;
`
```

The `name` property will override the variable name.
