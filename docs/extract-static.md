## Extract Static

Extract styles with no interpolations into external css files.


**does NOT work with object styles**

**If you want to use dynamic values you must use css variables.**

```javascript
const Button = styled('button')`
  background-color: --bg;
  padding: 10px;
`
<Button style={{ '--bg': props.success ? '#8BC34A' : '#2395f3' }}/>
```


Configure babel

**.babelrc**
```json
{
  "plugins": [
    ["emotion", { "extractStatic": true }]
  ]
}
```

This js file, `h1.js`

```jsx harmony
import styled from 'react-emotion'

const H1 = styled('h1')`
  color: #ffd43b;
`
```

During babel compilation emotion will create `h1.emotion.css` and add `import './h1.emotion.css'` to the top of `h1.js`

```css
// h1.emotion.css
.css-H1-duiy4a {
  color: blue
}
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'react-emotion'

const H1 = styled('h1', 'css-duiy4a')
```
