# Configurable Imports

If you are using ES Module imports (`import styled from 'emotion'`)
the emotion babel plugin can handle two types of import renaming.

## Dynamic

```js
import something, { css as cows } from 'emotion';

const classes = cows`
  color: red;
`

export default something.div`
  background: blue;
`
```

## Babel Opts

The emotion babel plugin can also handle using babel options to handle
processing via the `importedNames` key. This is useful for targetting
a prop other than `css` for processing.

```js
{
  "plugins": [
    ["emotion", { "importedNames": { "css": 'cows' }}]
  ]
}
```


# Use Case

One use case for this functionality is to migrate incrementally from a
styled-jsx application. When compiling the following file with emotion
and styled-jsx.

```js
import styled, { css } from "emotion";

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
);
```

The old combination would conflict on the `css` prop that styled-jsx
outputs.

```js
import _JSXStyle from "styled-jsx/style";
import { css as _css } from "emotion";
import styled, { css } from "emotion";

export default (() => <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle styleId={2648947580} className={/*#__PURE__*/_css([], [], function createEmotionStyledRules() {
    return [{
      "p[data-jsx=\"2648947580\"]": {
        "color": "red"
      }
    }];
  })} />
  </div>);
```

By adding the babel opt config rename as such.

```js
{
  "plugins": [
    "styled-jsx/babel",
    ["emotion", { "importedNames": { "css": 'cows' }}]
  ]
}
```

We can avoid re-compiling the `css` props from styled-jsx.

```js
import _JSXStyle from "styled-jsx/style";
import styled, { css } from "emotion";

export default (() => <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle styleId={2648947580} css={"p[data-jsx=\"2648947580\"]{color:red}"} />
  </div>);
```
