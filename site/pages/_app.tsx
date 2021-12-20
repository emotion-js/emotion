import '../public/bootstrap-reboot.min.css'
import type { AppProps } from 'next/app'
import { SiteHeader, GlobalStyles } from '../components'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <SiteHeader />
      <div css={{ maxWidth: 1100, margin: '0 auto' }}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
