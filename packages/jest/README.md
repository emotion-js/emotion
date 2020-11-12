# @emotion/jest

> Jest testing utilities for emotion

# Installation

```bash
npm install --save-dev @emotion/jest
```

# Snapshot Serializer

The easiest way to test React components with emotion is with the snapshot serializer. You can register the serializer via the `snapshotSerializers` configuration property in your jest configuration like so:

```js
// jest.config.js
module.exports = {
  // ... other config
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */
  ]
}
```

To assist with shallow rendering, there's a custom enzyme snapshot serializer, that includes the `enzyme-to-json` serializer, which is available by importing `@emotion/jest/enzyme-serializer`. If you already have the `enzyme-to-json` serializer added to `snapshotSerializers`, it will need to be removed to allow this to work.

```js
// jest.config.js
module.exports = {
  // ... other config
  snapshotSerializers: ['@emotion/jest/enzyme-serializer']
}
```

Or you can add the serializer via the `expect.addSnapshotSerializer` method like so: (the example below is with react-test-renderer but @emotion/jest also works with enzyme and react-testing-library)

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { createSerializer } from '@emotion/jest'
import styled from '@emotion/styled'

expect.addSnapshotSerializer(createSerializer())

test('renders with correct styles', () => {
  const H1 = styled.h1`
    float: left;
  `

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toMatchSnapshot()
})
```

Refer to the [testing doc][emotion-testing] for more information about snapshot testing with emotion.

## Options

### `classNameReplacer`

@emotion/jest's snapshot serializer replaces the hashes in class names with an index so that things like whitespace changes won't break snapshots. It optionally accepts a custom class name replacer, it defaults to the below.

```jsx
function classNameReplacer(className, index) {
  return `emotion-${index}`
}
```

```jsx
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `my-new-class-name-${index}`
    }
  })
)
```

### `DOMElements`

@emotion/jest's snapshot serializer inserts styles and replaces class names in both React and DOM elements. If you would like to disable this behavior for DOM elements, you can do so by passing `{ DOMElements: false }`. For example:

```jsx
import { createSerializer } from '@emotion/jest'

// configures @emotion/jest to ignore DOM elements
expect.addSnapshotSerializer(createSerializer({ DOMElements: false }))
```

# Custom matchers

## toHaveStyleRule

To make more explicit assertions when testing your styled components you can use the `toHaveStyleRule` matcher.

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from '@emotion/jest'
import styled from '@emotion/styled'

// Add the custom matchers provided by '@emotion/jest'
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
import { matchers } from '@emotion/jest'
import styled from '@emotion/styled'

// Add the custom matchers provided by '@emotion/jest'
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

[emotion-testing]: https://emotion.sh/docs/testing
