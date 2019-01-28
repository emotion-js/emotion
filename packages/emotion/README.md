# emotion

The [emotion](https://www.npmjs.com/package/emotion) package is framework agnostic and the simplest way to use Emotion.

## Table of Contents

- [Quick Start](#quick-start)
- [API](#api)
  - [Generate Class Names — `css`](#css)
    _ [String Styles](#string-styles)
    _ [Object Styles](#object-styles) \* [Array of Object Styles](#array-of-object-styles)
  - [Global Styles — `insertGlobal`](#global-styles)
  - [Animation Keyframes — `keyframes`](#animation-keyframes)
  - [Composing Class Names — `cx`](#cx)
- [Server Side Rendering](/docs/ssr.md#api)
- [Babel Plugin](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion)

## Quick Start

Get up and running with a single import.

```bash
npm install --save emotion
```

```javascript
import { css } from 'emotion'

const app = document.getElementById('root')
const myStyle = css`
  color: rebeccapurple;
`
app.classList.add(myStyle)
```

## API

### css

The `css` function accepts styles as a template literal, object, or array of objects and returns a class name. It is the foundation of emotion.

#### String Styles

```jsx
// @live
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

#### Object Styles

```jsx
// @live
import { css } from 'emotion'

const color = 'darkgreen'

render(
  <div
    className={css({
      backgroundColor: 'hotpink',
      '&:hover': {
        color
      }
    })}
  >
    This has a hotpink background.
  </div>
)
```

#### Array of Object Styles

```jsx
// @live
import { css } from 'emotion'

const color = 'darkgreen'
const isDanger = true

render(
  <div
    className={css([
      {
        backgroundColor: 'hotpink',
        '&:hover': {
          color
        }
      },
      isDanger && {
        color: 'red'
      }
    ])}
  >
    This has a hotpink background.
  </div>
)
```

### Global Styles

`injectGlobal` injects styles into the global scope and is useful for applications such as css resets or font faces.

```jsx
import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Patrick Hand SC';
    font-style: normal;
    font-weight: 400;
    src: local('Patrick Hand SC'),
      local('PatrickHandSC-Regular'),
      url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
        format('woff2');
    unicode-range: U+0100-024f, U+1-1eff,
      U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
      U+A720-A7FF;
  }
`
```

### Animation Keyframes

`keyframes` is used to define a single [`@keyframes` CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes). The generated rule name is returned and can be used in your styles anywhere an [animation-name](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name) is accepted.

**String Styles**

```jsx
// @live
import { css, keyframes } from 'emotion'

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const Avatar = () => {
  return (
    <div
      className={css`
        width: 96px;
        height: 96px;
        border-radius: 50%;
        animation: ${bounce} 1s ease infinite;
        transform-origin: center bottom;
      `}
    />
  )
}

render(<Avatar src={logoUrl} />)
```

**Object Styles**

```jsx
// @live
import { css, keyframes } from 'emotion'

const bounce = keyframes({
  'from, 20%, 53%, 80%, to': {
    transform: 'translate3d(0,0,0)'
  },
  '40%, 43%': {
    transform: 'translate3d(0, -30px, 0)'
  },
  '70%': {
    transform: 'translate3d(0, -15px, 0)'
  },
  '90%': {
    transform: 'translate3d(0, -4px, 0)'
  }
})


const Avatar = () => {
  return (
    <div
      className={css({
        width: 96,
        height: 96,
        borderRadius: '50%',
        animation: `${bounce} 1s ease infinite`,
        transformOrigin: 'center bottom'
      })}
    />
  )
}

render(<Avatar src={logoUrl} />)
```

## cx

`cx` is emotion's version of the popular [`classnames` library](https://github.com/JedWatson/classnames).
`cx` is useful when combining multiple class names, even class names from your stylesheets and emotion generated class names.

**Key Features**

- High performance integration with emotion
- Custom class names. e.g, `.my-bem--class`, are appended in order.
- Combines the actual content of emotion generated class names. Multiple emotion generated class names are input and a unique class name is output.

**API**

**`cx`** - `(...args<string|number|function|object|array>): string`

`cx` takes any number of arguments and returns a string class name.

- Falsy values are removed from the final string.
- If an object value is encountered, any key that has a corresponding truthy value is added to the final string.
- If a function value is encountered, the return value is wrapped in `cx` and returned.

**Examples**

##### Combining emotion generated class names

```jsx
import { cx, css } from 'emotion'

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls1, cls2)} />
```

This renders a `div` with a single class name and the following styles would be inserted.

```css
.css-12345 {
  font-size: 20px;
  background: green;
  font-size: 20px;
  background: blue;
}
```

If the order of the class names is reversed in the `cx` call the styles would change precedence.

```jsx
import { cx, css } from 'emotion'

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

<div className={cx(cls2, cls1)} /> // <-- arguments reversed
```

The div will now have a **green** background even though `cls2` was inserted into the stylesheet **after** `cls1`.

```css
.css-54321 {
  font-size: 20px;
  background: blue;
  font-size: 20px;
  background: green;
}
```

##### Combining both emotion generated class names and custom class names.

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

const cls3 = css`
  font-size: 20px;
  background: darkorange;
`

const cls4 = css`
  font-size: 20px;
  background: darkgreen;
`

const foo = true
const bar = false


<div
  className={cx(
    { [cls1]: foo },
    { [cls2]: bar },
    () => 'modal',
    'profile',
    [[cls3, [cls4]]]
  )}
/>
```

Output:

```css
.css-i43k4 {
  font-size: 20px;
  background: green;
  font-size: 20px;
  background: darkorange;
  font-size: 20px;
  background: darkgreen;
}
```

```jsx
<div className="modal profile css-i43k4" />
```
