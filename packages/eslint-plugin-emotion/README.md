# eslint-plugin-emotion

> ESLint rules for emotion

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
    "emotion/jsx-import": "error"
  }
}
```

## Emotion 10 codemods

The Emotion 10 codemods are contained in this package. To use them, enable the rules shown below. Keeping these rules after migrating is also useful to have `jsx` from `@emotion/core` automatically imported when the css prop is used and other such things. You may also want to not enable certain rules while you are migrating or forever, such the `no-vanilla` rule.

```json
{
  "rules": {
    "emotion/jsx-import": "error",
    "emotion/no-vanilla": "error",
    "emotion/import-from-emotion": "error",
    "emotion/styled-import": "error"
  }
}
```

> **Note:**
>
> These rules assume you are using React, if you are not using React, you should keep using the `emotion` package.

## Supported Rules

- [jsx-import](https://github.com/emotion-js/emotion/blob/master/packages/eslint-plugin-emotion/docs/rules/jsx-import.md)
- [styled-import](https://github.com/emotion-js/emotion/blob/master/packages/eslint-plugin-emotion/docs/rules/styled-import.md)
- [import-from-emotion](https://github.com/emotion-js/emotion/blob/master/packages/eslint-plugin-emotion/docs/rules/import-from-emotion.md)
- [no-vanilla](https://github.com/emotion-js/emotion/blob/master/packages/eslint-plugin-emotion/docs/rules/no-vanilla.md)
- [syntax-preference](https://github.com/emotion-js/emotion/blob/master/packages/eslint-plugin-emotion/docs/rules/syntax-preference.md)
