# emotion

## 👩‍🚀 Glam + React

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/tkh44/emotion.svg?branch=master)](https://travis-ci.org/tkh44/emotion)
[![codecov](https://codecov.io/gh/tkh44/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/emotion)


-   [Install](#install)
-   [Example Project](https://github.com/tkh44/emotion/tree/master/examples/glam)

## Install

```bash
npm install -S emotion glam
```


**.babelrc**
```json
{
  "plugins": [
    "emotion/glam",
    "glam/babel"
  ]
}
```

### glam

```jsx harmony
import glam from 'emotion'

const fontSize = 48
const H1 = glam('h1')`
  font-size: ${fontSize}px;
  color: 'blue';
`

// is compiled to

const H1 = glam('h1', css`
  font-size: ${fontSize}px;
  color: 'blue';
`)

// can be used as any other normal component

function Greeting ({ name }) {
  return <H1>Hello {name}</H1> // blue, 48px text
}

/*
<h1
  className="css-vxb7tq vars-3na0zv"
>
  hello world
</h1>
*/

// You can also pass components in

const H2 = glam(H1)`
  font-size: ${fontSize * 2/3}px;
  color: 'red';
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // blue, 48px text
}

/*
<h1
  className="css-vxb7tq vars-3na0zv css-13wdnau vars-nujrf4"
>
  hello world
</h1>
*/
// results
```


### css prop

When using the emotion babel plugin any `css` prop is converted to a tagged template expression and appended to any existing class names.


```jsx harmony
const Name = ({ color, name }) => <h1 css={`color: ${color};`}>{name}</h1>

// is converted to

const Name = ({ color, name }) => <h1 className={css`color: ${color};`}>{name}</h1>
```
