## Snapshot Testing

Adding [snapshot tests with Jest](https://facebook.github.io/jest/docs/en/snapshot-testing.html) is a great way to help avoid unintended changes to your app's UI.

By diffing the serialized value of your React tree Jest can show you what changed in your app and allow you to fix it or update the snapshot.

By default snapshots with emotion show generated class names. Adding [jest-emotion](https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion) allows you to output the actual styles being applied. 

<img height="360px" src="https://user-images.githubusercontent.com/514026/31314015-02b79ca6-abc3-11e7-8f70-1edb31c7f43b.jpg"/>


### Installation

```bash
npm install --save-dev jest-emotion
```

**testSetup.js** _or_ at the top of your test file

```javascript
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(createSerializer(emotion))
```

**package.json**

```json
"jest": {
	[...]
	"setupTestFrameworkScriptFile": "<rootDir>/testSetup.js",
	"testEnvironment": "jsdom"
	[...]
}
```

### Adding a test

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('Link renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});
```

### Notes

Your snapshot class names will appear as `emotion-[0...n]` instead of `css-[hash]`.

