---
title: 'The css Prop'
---

The primary way to style elements with emotion is the `css` prop. It provides a concise and flexible API to style your components.

## Get Started

#### Set the jsx pragma at the top of your source file. 

```js
/** @jsx jsx */
```

Similar to a comment containing linter configuration, this configures the [jsx babel plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) to use the `jsx` function instead of `React.createElement`.

> [JSX Pragma Babel Documentation](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma)


#### Import the `jsx` function from `@emotion/core` 

```js
/** @jsx jsx */
import { jsx } from '@emotion/core'
```

#### Use the `css` prop

Any component or element that accepts a `className` prop can also use the `css` prop. The styles supplied to the `css` prop are evaluated and the computed class name is applied to the `className` prop.


## Object Styles

The `css` prop accepts object styles directly and does not require an additional import.


```jsx
// @live
/** @jsx jsx */
import { jsx } from '@emotion/core'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```


> [Object Style Documentation](/docs/object-styles.md).

## String Styles

To pass string styles, you must use `css` which is exported by `@emotion/core`, it can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) like below.


```jsx
// @live
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const color = 'darkgreen'

render(
  <div
    css={css`
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


> Note:
>
> **`css` from `@emotion/core` does not return the computed class name string.**  The function returns an object containing the computed name and flattened styles. The returned object is understood by emotion at a low level and can be composed with other emotion based styles inside of the `css` prop, other `css` calls, or the `styled` API.


## Style Precedence

Class names containing emotion styles from the `className` prop override `css` prop styles. Class names from sources other than emotion are ignored and simply passed on along with the computed emotion class name. The precedence order may seem counter-intuitive, but it allows developers predictably compose components due to the fact that `css` prop styles defined in the parent overwrite the styles defined inside the child.


The `P` component in this example has its default styles overridden in the `ArticleText` component.

```js
/** @jsx jsx */
import { jsx } from '@emotion/core'

const P = (props) => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'Sans-Serif',
      color: 'black'
    }}
    {...props}
  />
)

const ArticleText = (props) => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props}
  />
)
```


## Gotchas

* If you include the plugin `babel-plugin-transform-react-inline-elements` in your `.babelrc` your styles will not be applied. The plugin is not compatible with the `css` prop.
