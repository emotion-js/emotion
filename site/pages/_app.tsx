import '../public/bootstrap-reboot.min.css'

import type { AppProps } from 'next/app'
import { SiteHeader } from '../components'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
    // css={{
    //   display: 'grid',
    //   gridTemplateColumns: [
    //     '36px 1fr',
    //     '36px 1fr',
    //     'minmax(400px, 80%) 220px'
    //   ],
    //   gridTemplateRows: '48px auto',
    //   gridColumnGap: '1rem',
    //   gridRowGap: /* sidebarOpen ? 0 : */ '1rem',
    //   width: '100%',
    //   maxWidth: '64rem',
    //   paddingTop: '1rem',
    //   paddingBottom: '1rem',
    //   paddingLeft: '2rem',
    //   paddingRight: '2rem',
    //   margin: '0 auto'
    // }}
    >
      <SiteHeader />
      {/* !sidebarOpen && <SiteHeader /> */}
      <Component {...pageProps} />
    </div>
  )
}
