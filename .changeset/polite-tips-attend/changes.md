Added createStyled overload to handle when shouldForwardProp is a custom type guard for intrinsic props

As an example, if you want to override the type of the `color` prop:

```ts
export const Box = styled('div', {
  shouldForwardProp: (
    propName
  ): propName is Exclude<keyof JSX.IntrinsicElements['div'], 'color'> =>
    propName !== 'color'
})<{ color: Array<string> }>(props => ({
  color: props.color[0]
}))
;<Box color={['green']} />
```
