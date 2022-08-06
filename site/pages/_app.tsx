import '../public/bootstrap-reboot.min.css'
import '@docsearch/css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../util/prism-customizations'
import { SiteHeader, GlobalStyles, Container } from '../components'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo-32x32.png" />
      </Head>
      <GlobalStyles />
      <SiteHeader />
      <Container css={{ paddingBottom: '2rem' }}>
        <Component {...pageProps} />
      </Container>
    </>
  )
}
