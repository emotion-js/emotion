# @emotion/compat-cache

> An Emotion cache that enables compatibility with previous versions of Emotion for SSR and composition

## Usage in the browser

```jsx
import App from './App'
import createCache from '@emotion/compat-cache'
import Provider from '@emotion/provider'
import createEmotionServer from 'create-emotion-server'
import * as emotion from 'emotion'
import { render } from 'react-dom'

const compatCache = createCache(emotion)

render(
  <Provider cache={compatCache}>
    <App />
  </Provider>
)
```

## Usage in SSR

```jsx
import createCompatCache from '@emotion/compat-cache'
import Provider from '@emotion/provider'
import App from './App'
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import * as emotion from 'emotion'

const compatCache = createCompatCache(emotion)

const { ids, html, css } = extractCritical(
  renderToString(
    <Provider cache={compatCache}>
      <App />
    </Provider>
  )
)
```
