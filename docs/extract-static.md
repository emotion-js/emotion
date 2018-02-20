---
title: "Extract Static"
---

###### [requires babel plugin](/docs/babel.md)

The `extractStatic` option to `babel-plugin-emotion` allows you to extract styles with no interpolations into external css files. **`extractStatic` is not recommended** because it **breaks [composition](/docs/composition.md)** and other powerful patterns from libraries like [facepaint](https://github.com/emotion-js/facepaint). It is primarily available for historical reasons. It does not work with object styles.

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
