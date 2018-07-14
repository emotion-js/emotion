# @emotion/snapshot-serializer

> A snapshot serializer for jest and emotion

@emotion/snapshot-serializer provides a jest serializer that removes hashes from emotion classes and formats the css in emotion style elements

## Install

```bash
yarn add --dev @emotion/snapshot-serializer
```

## Getting started

```jsx
/** @jsx jsx */
import jsx from '@emotion/jsx'
import renderer from 'react-test-renderer'
import serializer from '@emotion/snapshot-serializer'

expect.addSnapshotSerializer(serializer)

test('style renders correctly', () => {
  expect(
    renderer
      .create(
        <div>
          <div css={{ color: 'hotpink' }}>Some hotpink text</div>
        </div>
      )
      .toJSON()
  ).toMatchSnapshot()
})
```

### Adding it to your Jest config

You can also add the serializer to your jest config instead of adding it in each test.

```js
{
  ...package.json
  "jest": {
    "snapshotSerializers": ["@emotion/snapshot-serializer"]
  }
}
```
