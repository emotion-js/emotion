# create-emotion-server

> Create Server-Side-Rendering APIs for emotion instances

`create-emotion-server` allows you create various APIs for Server-Side Rendering with instances of emotion. This is **only** needed if you use a custom instance of emotion from `create-emotion` and you want to do Server-Side Rendering.

```jsx
import createEmotionServer from 'create-emotion-server'

import { cache } from 'my-emotion-instance'
// or
import createCache from '@emotion/cache'

let cache = createCache()

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(cache)
```

[All of emotion's SSR APIs are documented in their own doc.](https://emotion.sh/docs/ssr)
