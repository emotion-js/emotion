# jest-emotion

> Jest testing utilities for emotion

# Installation

```bash
npm install --save-dev jest-emotion
```

# Snapshot Serializer

The easiest way to test React components with emotion is with the snapshot serializer. (the example below is with react-test-renderer but jest-emotion also works with enzyme)

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import styled from 'react-emotion'

expect.addSnapshotSerializer(createSerializer(emotion))

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
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `my-new-class-name-${index}`
    }
  })
)
```

### `DOMElements`

jest-emotion's snapshot serializer inserts styles and replaces class names in both React and DOM elements. If you would like to disable this behavior for the latter, you can do so by setting this property to false. For example:

```jsx
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'

// configures jest-emotion to ignore DOM elements
expect.addSnapshotSerializer(createSerializer(emotion, { DOMElements: false }))
```

# getStyles

jest-emotion also allows you to get all the css that emotion has inserted. This is meant to be an escape hatch if you don't use React or you want to build your own utilities for testing with emotion.

```jsx
import * as emotion from 'emotion'
import { css } from 'emotion'
import { getStyles } from 'jest-emotion'

test('correct styles are inserted', () => {
  const cls = css`
    display: flex;
  `

  expect(getStyles(emotion)).toMatchSnapshot()
})
```

## Thanks

Thanks to [Kent C. Dodds](https://twitter.com/kentcdodds) who wrote [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) which this library is largely based on.
