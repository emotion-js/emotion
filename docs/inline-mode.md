## Inline Mode

- ~~Only extracts styles **without** dynamic values.~~ (we're working on this)
- No css var requirement
- Same speed as default mode in benchmarks
- Works with SSR

Configure babel

**.babelrc**
```json
{
  "plugins": [
    ["emotion/babel", { "inline": true }]
  ]
}
```

This js file, `h1.js`

```jsx
import styled from 'emotion/react'

const H1 = styled('h1')`
  color: ${props => props.color};
`
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'emotion/react'

const H1 = styled('h1', 'css-H1-duiy4a', [props => props.color], function createEmotionStyles(x0) {
  return [`.css-H1-duiy4a { color:${x0} }`]
})
```

**Browser Support** anything React supports
