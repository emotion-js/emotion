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
  const H1 = styled.h1`
    float: left;
  `

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toHaveStyleRule('float', 'left')
  expect(tree).not.toHaveStyleRule('color', 'hotpink')
})
```

## Thanks

Thanks to [Kent C. Dodds](https://twitter.com/kentcdodds) who wrote [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) which this library is largely based on. ❤️
