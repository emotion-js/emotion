## CSS

`css` takes in styles and returns a class name. It is the foundation of emotion.

```jsx
import { css } from 'emotion'

const flex = css`
  display: flex;
`
const justifyCenter = css`
  ${flex};
  justifyContent: center;
`

<div className={justifyCenter}>
 Centered Content
</div>
```

### Objects as Styles

`css` can also take an object or array of objects as a parameter.
This allows you to use your existing object styles in the emotion ecosystem.
Another great benefit is that you can now use [polished](https://polished.js.org/) with emotion.

```jsx harmony
import { css } from 'emotion'
import { lighten, modularScale } from 'polished'

const cssA = {
  color: lighten(0.2, '#000'),
  "font-size": modularScale(1),
  [hiDPI(1.5)]: {
    "font-size": modularScale(1.25)
  }
}

const cssB = css`
  ${cssA};
  height: 64px;
`

const H1 = styled('h1')`
  ${cssB};
  font-size: ${modularScale(4)};
`

const H2 = styled(H1)`font-size:32px;`

<H2 scale={2} className={'legacy__class'}>
  hello world
</H2>
```