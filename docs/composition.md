---
title: "Composition"
---

Composition is one of the most powerful and useful patterns in Emotion. With regular css, you can compose styles together using multiple class names but this is very limited because the order that they're defined is the order they'll be applied. This can lead to hacks with `!important` and such to apply the correct styles.

For example, we have some base styles and a danger style, we want the danger styles to have precedence over the base styles but because `base` is in the stylesheet after `danger` it has higher [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). In regular CSS, you might do something to make `danger` have a higher specifity than `base` like move the `danger` class so it's more specific than `base`, use `!important` or abandon composition and rewrite the styles each time you need them.

```jsx live
import { css } from 'emotion'

const danger = css`
  color: red;
`

const base = css`
  background-color: lightgray;
  color: turquoise;
`

render(
  <div className={`${base} ${danger}`}>
    What color will this be?
  </div>
)
```

With Emotion though, it's much easier, all we have to change is add `css` before the template literal where we combine the classes and Emotion will use the styles that were passed to danger and base and merge them in the order that they're interpolated.

```jsx live
import { css } from 'emotion'

const danger = css`
  color: red;
`

const base = css`
  background-color: lightgray;
  color: turquoise;
`

render(
  <div className={css`${base} ${danger}`}>
    What color will this be?
  </div>
)
```

a

```jsx live
const imageBase = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const Avatar = styled('img')`
  ${imageBase};

  @media (min-width: 420px) {
    width: 96px;
    height: 96px;
  }
`

render(<Avatar src={logoUrl} />)
```

```javascript
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

// You can also use it in styled and the css prop
const FlexCenterComponent = styled.div`
  ${flexCenter};
`

const flexWrap = props => css`
  flex-wrap: ${props.wrap ? 'wrap' : 'nowrap'};
`

// You can compose with multiple classes
const ColumnCenteredComponent = styled.div`
  ${flexCenter};
  ${flexWrap};
`

// Composition can be very powerful. For example, styles are expanded where you interpolate,
// so the following class has flex-direction: column because ${flexCenterClass} is interpolated
// after flex-direction: row
const stillColumn = css`
  flex-direction: row;
  ${flexCenterClass};
`

// Nested composing is supported
const cls = css`
  & .flex {
    ${flexCenter};
  }
`
```
