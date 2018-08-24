---
title: "Extract Static"
---

###### [requires babel plugin](/docs/babel.md)

## DEPRECATED

extractStatic is deprecated and will be removed in emotion@10. We recommend disabling extractStatic or using other libraries like [linaria](https://github.com/callstack-io/linaria) or [css-literal-loader](https://github.com/4Catalyzer/css-literal-loader).

### Why is extractStatic being deprecated?

The emotion team isn't very interested in static extraction in its current state as it negates lots of the benefits of emotion, most notably, [composition](/docs/composition.md). There is also very little interest from the community in maintaining it and maintaining `extractStatic` takes time away from maintaining more widely used parts of emotion. We don't think static extraction is a terrible idea though but the implementation that we have doesn't provide a good enough experience and we believe there are more important problems to be solved first. We're very interested in the work being done with [prepack](https://github.com/facebook/prepack) though and if we add some form of static extraction back, it will likely be done with prepack.

The `extractStatic` option to `babel-plugin-emotion` allows you to extract styles with no interpolations into external css files. **`extractStatic` is not recommended** because it **breaks [composition](/docs/composition.md)** and other powerful patterns from libraries like [facepaint](https://github.com/emotion-js/facepaint).

**If you want to use dynamic values you must use css variables.**

```javascript
const Button = styled('button')`
  background-color: var(--bg);
  padding: 10px;
`
<Button style={{ '--bg': props.success ? '#8BC34A' : '#2395f3' }}/>
```

Configure babel

```bash
yarn add babel-plugin-emotion
```

**.babelrc**

```json
{
  "plugins": [["emotion", { "extractStatic": true }]]
}
```

This js file, `h1.js`

```jsx
import styled from 'react-emotion'

const H1 = styled('h1')`
  color: #ffd43b;
`
```

During babel compilation emotion will create `h1.emotion.css` and add `import './h1.emotion.css'` to the top of `h1.js`

```css
/* h1.emotion.css */
.css-H1-duiy4a {
  color: blue;
}
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'react-emotion'

const H1 = styled('h1', {
  e: 'css-duiy4a'
})()
```
