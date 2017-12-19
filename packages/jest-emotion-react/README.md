# jest-emotion-react

> Show styles in Jest snapshots with React and emotion

```bash
npm install --save-dev jest-emotion-react
```

```jsx
import React from 'react'
import renderer from 'react-test-renderer'
import createSerializer from 'jest-emotion-react'
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

Refer to the [testing doc](https://github.com/emotion-js/emotion/blob/master/docs/testing.md) for more information

## Thanks

Thanks to [Kent C. Dodds](https://twitter.com/kentcdodds) who wrote [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) which this library is largely based on.