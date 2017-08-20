## Usage with Preact

emotion only uses `createElement` from React so we can support Preact with an alias. Import `preact-emotion` instead of `react-emotion` and use it the same way you would with React.

```jsx
import styled from 'preact-emotion'

const SomeComponent = styled.div`
  display: flex;
`
```