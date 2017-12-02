---
title: "Media Queries"
---

```jsx
const Avatar = styled('img')`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  @media (min-width: 420px) {
    width: 96px;
    height: 96px;
  }
`

render(<Avatar src={logoUrl} rounded />)
```

## Reusable Media Queries

[Demo](https://stackblitz.com/edit/react-wudbyn)

```jsx
const breakpoints = {
  // Numerical values will result in a min-width query
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
  // String values will be used as is
  tallPhone: '(max-width: 360px) and (min-height: 740px)'
}

export const queries = Object.keys(breakpoints).reduce((accumulator, label) => {
  if (typeof breakpoints[label] === 'string') {
    accumulator[label] = (...args) =>
      css`
        @media (${breakpoints[label]}) {
          ${css(...args)};
        }
      `
  } else {
    accumulator[label] = (...args) =>
      css`
        @media (min-width: ${breakpoints[label]}px) {
          ${css(...args)};
        }
      `
  }

  return accumulator
}, {})
```

```jsx
import { queries } from './mediaQueries.js`;

const paragraph = css`
  font-size: 12px;

  ${queries.medium`
    font-size: 14px;
  `}

  ${queries.large`
    font-size: 16px;
  `}
`;
```
