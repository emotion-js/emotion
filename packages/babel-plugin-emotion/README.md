# babel-plugin-emotion

> Babel plugin for the minification and optimization of emotion styles.

## Example

**In**

```javascript
const myStyles = css`
  font-size: 20px;
  @media(min-width: 420px) {
    color: blue;
    ${css`width: 96px; height: 96px;`};
    line-height: 26px;
  }
  background: green;
  ${{ backgroundColor: "hotpink" }};
`
```

**Out**

```javascript
const myStyles = /* #__PURE__ */css(
  'font-size:20px;@media(min-width:420px){color:blue;',
  /* #__PURE__ */ css('width:96px;height:96px;'),
  ';line-height:26px;}background:green;',
  { backgroundColor: 'hotpink' },
  ';'
)
```

## Installation

```sh
npm install --save-dev babel-plugin-emotion
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["emotion"]
}
```

With options:

*Defaults Shown*

```json
{
  "plugins": [
    ["emotion", { 
      "hoist": false,
      "sourceMap": false,
      "extractStatic": false,
      "importedNames": {
        "styled": "styled",
        "css": "css",
        "keyframes": "keyframes",
        "injectGlobal": "injectGlobal",
        "fontFace": "fontFace",
        "merge": "merge"
      }
    }]
  ]
}
```

Recommended Setup 

Use [Babel's `env` property](https://babeljs.io/docs/usage/babelrc/#env-option)

**.babelrc**
```json
{
  "env": {
    "production": {
      "plugins": [["emotion", { "sourceMap": false, "hoist": true }]]
    },
    "development": {
      "plugins": [["emotion", { "sourceMap": true, "hoist": false  }]]
    }
  }
}
```

### Via CLI

```sh
babel --plugins babel-plugin-emotion script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["babel-plugin-emotion"]
});
```

## Options

### `hoist`

`boolean`, defaults to `false`.

This option enables the following:

 - Any argument supplied to `css` or `styled` is hoisted. Recommended in `production` env.

### `sourceMap`

`boolean`, defaults to `false`.

This option enables the following:

 - Injected source maps for use in browser dev tools

### `extractStatic`

`boolean`, defaults to

This option enables the following:

 - Extract static styles into CSS files.


### `importedNames`

`object`, defaults to

```json
{
  "styled": "styled",
  "css": "css",
  "keyframes": "keyframes",
  "injectGlobal": "injectGlobal",
  "fontFace": "fontFace",
  "merge": "merge"
}
```

This option enables the following:

 - Configurable import names.
