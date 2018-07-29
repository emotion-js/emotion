# eslint-plugin-emotion

Apply eslint rules to emotion.sh css-in-js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-emotion`:

```
$ npm install eslint-plugin-emotion --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-emotion` globally.

## Usage

Add `emotion` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["emotion"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "emotion/syntax-preference": [2, "string"]
  }
}
```

## Supported Rules

* [syntax-preference](docs/rules/syntax-preference.md)
