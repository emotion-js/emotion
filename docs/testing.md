## Snapshot Testing

Adding [snapshot tests with Jest](https://facebook.github.io/jest/docs/en/snapshot-testing.html) is a great way to help avoid unintended changes to your app's UI.

By diffing the serialized value of your React tree Jest can show you what changed in your app and allow you to fix it or update the snapshot.

By default snapshots with emotion show generated class names. Adding [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) allows you to output the actual styles being applied. 


### Installation

```bash
npm install --save-dev jest-glamor-react
```

**testSetup.js** _or_ at the top of your test file

```javascript
import { sheet } from 'emotion'
import serializer from 'jest-glamor-react'

expect.addSnapshotSerializer(serializer(sheet))
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
It's recommended to set your Jest `testEnvironment` to `jsdom`, but you can mock global browser objects instead.

Your snapshot class names will now appear as `glamor-[0...n]`

