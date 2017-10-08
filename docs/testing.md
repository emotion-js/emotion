## Component Testing

### Jest Snapshots

By default snapshots show generated component class names. Adding [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) allows you to output the actual styles being applied. 

#### Installation

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

#### Notes
It's recommended to set your Jest `testEnvironment` to `jsdom`, but you can mock global browser objects instead.

Your snapshot class names will now appear as `glamor-[0...n]`

