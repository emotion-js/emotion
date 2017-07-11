## vue styled

```html
<template>
  <div id="app">
    <styled-div>This should have a blue background.</styled-div>
    <styled-component></styled-component>
  </div>
</template>

<script>
import BoringComponent from './components/BoringComponent'
// Import styled from emotion/vue instead of emotion/react
import styled from 'emotion/vue'

// You can use styled.* just like with React
const StyledDiv = styled.div`
  background: blue;
`

// You can also pass components in
const StyledComponent = styled(BoringComponent)`
  display: flex;
  justify-content: center;
`

export default {
  name: 'app',
  components: {
    'styled-div': StyledDiv,
    'styled-component': StyledComponent
  }
}
</script>
```