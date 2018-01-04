---
title: "Configurable Imports"
---

Because `babel-plugin-emotion` optimizes code by transforming `css` and other calls, `babel-plugin-emotion` needs to know which functions are emotion's and which are not. By default `babel-plugin-emotion` will transform all calls to functions that have the same name as emotion's exports. `babel-plugin-emotion` will transform calls with different names in two circumstances.

## ES Module Imports

The first circumstance when `babel-plugin-emotion` will transform different calls is when using [ES Module imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), when using ES Module imports, the local name in a module is will be the one transformed by `babel-plugin-emotion`.

```js
import something, { css as emotion } from 'react-emotion'

const classes = emotion`
  color: red;
`

export default something.div`
  background: blue;
`
```

## Babel Options

`babel-plugin-emotion` also supports setting the name of emotion's exports via the `importedNames` option. ~~This is useful for targetting a prop other than `css` for processing.~~(this will change to be a seperate option)

<!-- TODO: Create a different option for the css prop name so that it can be changed without forcing people to import css with that name/does using ESM imports change the css prop name?-->

```json
{
  "plugins": [["emotion", { "importedNames": { "css": "emotion" } }]]
}
```

Beware that if you use the babel configuration, you must import as the same name. In the previous example, you would have to use `import { css as emotion } from 'emotion'` and use `emotion` instead of `css`.

# Use Case

One use case for this functionality is to migrate incrementally from a styled-jsx application. When compiling the following file with emotion and styled-jsx.

```js
import styled, { css } from 'react-emotion'

export default () => (
  <div>
    <p>only this paragraph will get the style :)</p>
    {/* you can include <Component />s here that include
         other <p>s that don't get unexpected styles! */}
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
)
```

The old combination would conflict on the `css` prop that styled-jsx outputs.

```js
import _JSXStyle from 'styled-jsx/style'
import styled, { css } from 'react-emotion'

export default () => (
  <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle
      styleId={2648947580}
      className={
        /*#__PURE__*/ _css([], [], function createEmotionStyledRules() {
          return [
            {
              'p[data-jsx="2648947580"]': {
                color: 'red'
              }
            }
          ]
        })
      }
    />
  </div>
)
```

By adding the babel opt config rename as such.

```js
{
  "plugins": [
    "styled-jsx/babel",
    ["emotion", { "importedNames": { "css": "emotion" }}]
  ]
}
```

We can avoid re-compiling the `css` props and instead use `emotion` for our template literals, etc.

```js
import _JSXStyle from 'styled-jsx/style'
import styled, { css as emotion } from 'react-emotion'

export default () => (
  <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle
      styleId={2648947580}
      css={'p[data-jsx="2648947580"]{color:red}'}
    />
  </div>
)
```
