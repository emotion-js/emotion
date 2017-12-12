---
title: "Media Queries"
---

Using media queries in emotion works just like using media queries in regular css except you don't have to specify a selector inside the block, you can put your css directly in the css block.

```jsx live
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


## Reusable Media Queries with Object Styles

Making media queries reusable can be really useful to create responsive apps, with emotion's object styles you can move them into constants so you can refer to them instead of rewriting them each time they're used.

```jsx live
const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)

const styles = css({
  color: 'green',
  [mq[0]]: {
    color: 'gray'
  },
  [mq[1]]: {
    color: 'hotpink'
  }
})
render(<div className={styles}>Some text.</div>)
```

### facepaint

While defining media queries in constants is great and is much easier than rewriting media queries each time, they're still quite verbose since usually you want to change the same property at different break points. [facepaint](https://github.com/emotion-js/facepaint) makes this easier by allowing you to define what each css property should be at each media query as an array.
```bash
npm install --save facepaint
```
```jsx live
import { css } from 'emotion'
import facepaint from 'facepaint'

const breakpoints = [576, 768, 992, 1200]

const mq = facepaint(
  breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  )
)

const styles = css(mq({
  color: ['green', 'gray', 'hotpink']
}))
render(<div className={styles}>Some text.</div>)
```

## Reusable Media Queries with String Styles

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
