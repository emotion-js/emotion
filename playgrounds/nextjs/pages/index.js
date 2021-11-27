import Head from 'next/head'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Next.js Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Next.js Playground</h1>
      <div css={{ color: 'orchid' }}>Some colored text</div>
    </div>
  )
}
