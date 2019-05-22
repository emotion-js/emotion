# emotion

The [emotion](https://www.npmjs.com/package/emotion) package is framework agnostic and the simplest way to use Emotion.

## Table of Contents

- [Quick Start](#quick-start)
- [API](#api)
  - [Generate Class Names — `css`](#css)
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

`keyframes` generates a unique animation name that can be used to animate elements with CSS animations.

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

render(
  <img
    className={css`
      width: 96px;
      height: 96px;
      border-radius: 50%;
      animation: ${bounce} 1s ease infinite;
      transform-origin: center bottom;
    `}
    src={logoUrl}
  />
)
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

render(
  <img
    src={logoUrl}
    className={css({
      width: 96,
      height: 96,
      borderRadius: '50%',
      animation: `${bounce} 1s ease infinite`,
      transformOrigin: 'center bottom'
    })}
  />
)
```

## cx

`cx` is emotion's version of the popular [`classnames` library](https://github.com/JedWatson/classnames). The key advantage of `cx` is that it detects emotion generated class names ensuring styles are overwritten in the correct order. Emotion generated styles are applied from left to right. Subsequent styles overwrite property values of previous styles.

**Combining class names**

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

**Conditional class names**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

const foo = true
const bar = false


<div
  className={cx(
    { [cls1]: foo },
    { [cls2]: bar }
  )}
/>
```

**Using class names from other sources**

```jsx
const cls1 = css`
  font-size: 20px;
  background: green;
`

<div
  className={cx(cls1, 'profile')}
/>
```
