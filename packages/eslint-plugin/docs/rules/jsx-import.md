# Ensure jsx from @emotion/core is imported (jsx-import)

## Rule Details

This rule ensures that `jsx` from `@emotion/core is imported`. This rule can usually be auto-fixed so you should not usually have to do anything yourself.

Examples of **incorrect** code for this rule.

```jsx
let element = (
  <div
    css={{
      color: 'green'
    }}
  />
)
```

Examples of **correct** code for this rule.

```js
/** @jsx jsx */
import { jsx } from '@emotion/core'

let element = (
  <div
    css={{
      color: 'green'
    }}
  />
)
```

## When Not To Use It

If you are using a babel plugin or something like that to add imports and set the jsx pragma.
