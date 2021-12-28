import '../public/bootstrap-reboot.min.css'
import '@docsearch/css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SiteHeader, GlobalStyles } from '../components'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <GlobalStyles />
      <SiteHeader />
      <div css={{ maxWidth: 1100, margin: '0 auto' }}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
