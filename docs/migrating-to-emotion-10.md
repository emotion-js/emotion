---
title: 'Migrating to Emotion 10'
---

Emotion 10 is a large change to Emotion so it requires some changes to your code. Some of the changes can be done automatically via a codemod and the rest can be done incrementally.

> Note
>
> This page only applies using Emotion with React. If you're not using Emotion with React, you don't have to change anything.

# Thinking

The biggest change in Emotion 10 is that it doesn't let you easily access the underlying class names. Instead of thinking in class names, you have to think in terms of styles and composing them together. (you can still use classnames if you want to but it's not recommended except during migration)

For example, in Emotion 9, you might have had two classes from `css` and compose them together with `cx` but in Emotion 10, you create 2 styles and compose them together in the css prop like this

```jsx
// Emotion 9
import { css, cx } from 'emotion'

let basic = css`
  color: green;
`

let important = css`
  color: hotpink;
`

const SomeComponent = props => (
  <div
    className={cx(basic, props.important && important)}
  />
)
```

```jsx
// Emotion 10
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

let basic = css`
  color: green;
`

let important = css`
  color: hotpink;
`

const SomeComponent = props => (
  <div css={[basic, props.important && important]} />
)
```

# Incremental Migration

Incremental migration is something really important to Emotion because we don't want anyone to have to rewrite their entire app.

The upgrades to emotion 10 are split into two parts. The first part can be done automatically by using [`eslint-plugin-emotion`](./eslint-plugin-emotion#emotion-10-codemods).

## Codemoddable

- Change all react-emotion imports so that styled is imported from `@emotion/styled` and all the emotion exports are split into a second import.

```jsx
import styled, { css } from 'react-emotion'
// ↓ ↓ ↓ ↓ ↓ ↓
import styled from '@emotion/styled'
import { css } from 'emotion'
```

- Add a css call to the css prop when a template literal is used.

```jsx
let element = (
  <div
    css={`
      color: hotpink;
    `}
  />
)

// ↓ ↓ ↓ ↓ ↓ ↓

import { css } from '@emotion/core'

let element = (
  <div
    css={css`
      color: hotpink;
    `}
  />
)
```

- Add a `jsx` import and set jsx pragma
- Alternatively, use this TODO babel preset

```jsx
import { css } from '@emotion/core'

let element = (
  <div
    css={css`
      color: hotpink;
    `}
  />
)
```

## Manual Steps

- Add compat cache with provider

This step is necessary if you still use `css`, `keyframes` or `injectGlobal` from `emotion`. Once you remove all the usages of them in your app, you can remove this.

```jsx
import { render } from 'react-dom'
import App from './App'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/provider'

render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  rootNode
)
```

## Manual Steps over time

- Change css usage to css prop

```jsx
import { css } from 'emotion'
let element = (
  <div
    className={css`
      color: hotpink;
    `}
  />
)

// ↓ ↓ ↓ ↓ ↓ ↓
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

let element = (
  <div
    css={css`
      color: hotpink;
    `}
  />
)
```

If you have components that accepts props like `wrapperClassName` or etc. you can use the [`ClassNames` component](./class-names.md).

```jsx
import { css } from 'emotion'
import { SomeComponent } from 'somewhere'
let element = (
  <SomeComponent
    wrapperClassName={css`
      color: hotpink;
    `}
  />
)

// ↓ ↓ ↓ ↓ ↓ ↓

import { ClassNames } from '@emotion/core'
import { SomeComponent } from 'somewhere'

let element = (
  <ClassNames>
    {({ css }) => (
      <SomeComponent
        wrapperClassName={css`
          color: hotpink;
        `}
      />
    )}
  </ClassNames>
)
```
