import { Global } from '@emotion/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Global
        styles={{
          body: {
            padding: '2rem',
            fontFamily: 'sans-serif'
          },
          h1: {
            marginTop: 0
          }
        }}
      />

      <Component {...pageProps} />
    </div>
  )
}
