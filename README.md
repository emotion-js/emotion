# emotion

#### `css` prop for all

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/tkh44/emotion.svg?branch=master)](https://travis-ci.org/tkh44/emotion)
[![codecov](https://codecov.io/gh/tkh44/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/emotion)


-   [Install](#install)

## Install

```bash
npm install -S emotion
```

## `emotion/glam`

```jsx harmony
const Name = ({ color, name }) => <h1 css={`color: ${color};`}>{name}</h1>
```

is converted to

```jsx harmony
const Name = ({ color, name }) => <h1 className={css`color: ${color};`}>{name}</h1>
```

**.babelrc**
```json
{
  "plugins": [
    'emotion/glam',
    'glam/babel'
  ]
}
```

**Similar to importing React when using jsx, `import css from 'glam'` must be at the top of your source files.**
