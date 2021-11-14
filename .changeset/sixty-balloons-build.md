---
'@emotion/cache': minor
'@emotion/sheet': minor
---

Add insertionPoint option to the EmotionCache, to insert rules after the specified element.

```jsx
const head = document.querySelector('head')

// <meta name="emotion-insertion-point" content="">
const emotionInsertionPoint = document.createElement('meta')
emotionInsertionPoint.setAttribute('name', 'emotion-insertion-point')
emotionInsertionPoint.setAttribute('content', '')

head.appendChild(emotionInsertionPoint)

// the emotion sheets should be inserted right after the meta tag
const cache = createCache({
  key: 'my-app',
  insertionPoint: emotionInsertionPoint
})

function App() {
  return (
    <CacheProvider value={cache}>
      <Main />
    </CacheProvider>
  )
}
```
