---
'@emotion/native': patch
'@emotion/primitives': patch
'@emotion/primitives-core': patch
---

Fixed an issue with styles being lost for nested factory calls like:

```js
const bgColor = color => css`
  background-color: ${color};
`

const Text = styled.Text`
  color: hotpink;
  ${({ backgroundColor }) => bgColor(backgroundColor)};
`
```
