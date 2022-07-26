import Head from 'next/head'
import { ReactElement } from 'react'
import { styleConstants } from '../util'

export default function NotFoundPage(): ReactElement {
  const title = 'Page not found'

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 css={{ marginBottom: '2rem' }}>{title}</h1>
      <p css={{ fontSize: styleConstants.fontSizeLg }}>
        You just hit a route that doesn&apos;t exist... the sadness. 😢
      </p>
    </>
  )
}
