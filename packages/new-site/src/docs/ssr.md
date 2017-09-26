## Server-Side Rendering

Server-Side Rendering in emotion currently does not work with `extractStatic`. It's similar to [glamor's api](https://github.com/threepointone/glamor/blob/master/docs/server.md). For an example of emotion and next.js checkout the [with-emotion example in the next.js repo](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

### extractCritical
This returns an object with the properties `html`, `ids` and `css`. It removes unused rules that were created with emotion(it still includes rules that were inserted with `injectGlobal`).

```jsx
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import App from './App'


const { html, ids, css } = extractCritical(renderToString(<App/>))

```

#### hydrate
`hydrate` should be called on the client with the `ids` that `extractCritical` returns. If you don't call it then emotion will reinsert all the rules.

```jsx
import { hydrate } from 'emotion'

hydrate(ids)

```
