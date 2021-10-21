---
'@emotion/cache': minor
'@emotion/sheet': minor
---

Add insertionPoint option to the EmotionCache, to insert rules after the specified element.

```
const head = document.querySelector('head')

const firstStyle = document.createElement('style')
const lastStyle = document.createElement('style')
head.appendChild(firstStyle)
head.appendChild(lastStyle)

// the emotion sheets should be inserted between the first and last style nodes
const cache = createCache({
  key: 'my-app',
  insertionPoint: firstStyle
})

function App() {
  return (
    <CacheProvider value={cache}>
      <Main />
    </CacheProvider>
  )
}
```
