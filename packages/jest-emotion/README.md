# jest-emotion

> Jest testing utilities for emotion

# Installation

```bash
npm install --save-dev jest-emotion
```

# Snapshot Serializer

The easiest way to test React components with emotion is with the snapshot serializer. You can register the serializer via the `snapshotSerializers` configuration property in your jest configuration like so:

```js
// jest.config.js
module.exports = {
  // ... other config
  snapshotSerializers: ['jest-emotion']
}
```

Or you can customize the serializer via the `createSerializer` method like so: (the example below is with react-test-renderer but jest-emotion also works with enzyme and react-testing-library)

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-emotion'
import styled from '@emotion/styled'

expect.addSnapshotSerializer(serializer)

test('renders with correct styles', () => {
  const H1 = styled.h1`
    float: left;
  `

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toMatchSnapshot()
})
```

Refer to the [testing doc](https://github.com/emotion-js/emotion/blob/master/docs/testing.md) for more information about snapshot testing with emotion.

## Options

### `classNameReplacer`

jest-emotion's snapshot serializer replaces the hashes in class names with an index so that things like whitespace changes won't break snapshots. It optionally accepts a custom class name replacer, it defaults to the below.

```jsx
function classNameReplacer(className, index) {
  return `emotion-${index}`
}
```

```jsx
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `my-new-class-name-${index}`
    }
  })
)
```

### `DOMElements`

jest-emotion's snapshot serializer inserts styles and replaces class names in both React and DOM elements. If you would like to disable this behavior for DOM elements, you can do so by passing `{ DOMElements: false }`. For example:

```jsx
import { createSerializer } from 'jest-emotion'

// configures jest-emotion to ignore DOM elements
expect.addSnapshotSerializer(createSerializer({ DOMElements: false }))
```

# Custom matchers

## toHaveStyleRule

To make more explicit assertions when testing your styled components you can use the `toHaveStyleRule` matcher.

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import styled from '@emotion/styled'

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers)

test('renders with correct styles', () => {
  const Svg = styled('svg')`
    width: 100%;
  `

  const Div = styled('div')`
    float: left;
    height: 80%;
    &:hover {
      width: 50px;
    }
    ${Svg} {
      fill: green;
    }
    span {
      color: yellow;
    }
    @media screen and (max-width: 1200px) {
      font-size: 14px;
    }
  `

  const tree = renderer
    .create(
      <Div>
        <Svg />
        <span>Test</span>
      </Div>
    )
    .toJSON()

  expect(tree).toHaveStyleRule('float', 'left')
  expect(tree).not.toHaveStyleRule('height', '100%')
})
```

You can provide additional options for `toHaveStyleRule` matcher.  
`target` - helps to specify css selector or other component
where style rule should be found.

```js
expect(tree).toHaveStyleRule('width', '50px', { target: ':hover' })
```

```js
expect(tree).toHaveStyleRule('color', 'yellow', { target: 'span' })
```

```js
expect(tree).toHaveStyleRule('fill', 'green', { target: `${Svg}` })
```

`media` - specifies the media rule where the matcher
should look for the style property.

```js
expect(tree).toHaveStyleRule('font-size', '14px', {
  media: 'screen and (max-width: 1200px)'
})
```

Use `media` and `target` options to assert on rules within media queries and to target nested components, pseudo-classes, and pseudo-elements.

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import styled from '@emotion/styled'

// Add the custom matchers provided by 'jest-emotion'
expect.extend(matchers)

test('renders with correct link styles', () => {
  const Container = styled.div`
    font-size: 14px;

    a {
      color: yellow;
    }

    a:hover {
      color: black;
    }

    @media (min-width: 768px) {
      font-size: 16px;
    }
  `

  const tree = renderer.create(<Container>hello world</Container>).toJSON()

  expect(tree).toHaveStyleRule('color', 'yellow', { target: /a$/ })
  expect(tree).toHaveStyleRule('color', 'black', { target: 'a:hover' })
  expect(tree).toHaveStyleRule('font-size', '16px', {
    media: '(min-width: 768px)'
  })
})
```

## Thanks

Thanks to [Kent C. Dodds](https://twitter.com/kentcdodds) who wrote [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) which this library is largely based on. ❤️
