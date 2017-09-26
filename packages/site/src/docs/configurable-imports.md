# Configurable Imports

If you are using ES Module imports (`import styled from
'react-emotion'`) the emotion babel plugin can handle two types of
import renaming.

## Dynamic

```jsx
import something, { css as emotion } from 'react-emotion';

const classes = emotion`
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

```json
{
  "plugins": [
    ["emotion", { "importedNames": { "css": "emotion" }}]
  ]
}
```

Beware that if you use the babel configuration, you must import as the
same name. In the previous example, we would have to `import { css as
emotion } from 'emotion';` then use `emotion` to construct the template
literals. 

# Use Case

One use case for this functionality is to migrate incrementally from a
styled-jsx application. When compiling the following file with emotion
and styled-jsx.

```jsx
import styled, { css } from "react-emotion";

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

```jsx
import _JSXStyle from "styled-jsx/style";
import styled, { css } from "react-emotion";

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

```json
{
  "plugins": [
    "styled-jsx/babel",
    ["emotion", { "importedNames": { "css": "emotion" }}]
  ]
}
```

We can avoid re-compiling the `css` props and instead use `emotion` for
our template literals, etc.

```jsx
import _JSXStyle from "styled-jsx/style";
import styled, { css as emotion } from "react-emotion";

export default (() => <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle styleId={2648947580} css={"p[data-jsx=\"2648947580\"]{color:red}"} />
  </div>);
```

