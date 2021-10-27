---
'@emotion/cache': minor
'@emotion/sheet': minor
---

Add insertionPoint option to the EmotionCache, to insert rules after the specified element.

```jsx
const head = document.querySelector('head')

head.innerHTML = `
  <meta name="emotion-insertion-point" content="" />
`

const metaTag = document.querySelector("meta[name='emotion-insertion-point']")

// the emotion sheets should be inserted right after the meta tag
const cache = createCache({
  key: 'my-app',
  insertionPoint: metaTag
})

function App() {
  return (
    <CacheProvider value={cache}>
      <Main />
    </CacheProvider>
  )
}
```
