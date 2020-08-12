import { Global, keyframes } from '@emotion/core'

let animation = keyframes({
  'from,to': {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(0.5)'
  }
})

const App = () => (
  <>
    <Global
      styles={{
        body: {
          padding: 0,
          margin: 0,
          fontFamily: 'sans-serif'
        }
      }}
    />
    <h1
      css={{
        color: 'hotpink',
        animation: `${animation} 1s infinite`
      }}
    >
      wow, some hotpink text!!
    </h1>
  </>
)

export default App
