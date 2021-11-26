/**
 * This is a test of @emotion/react/src/suppress-safari-class-name-mismatch.js.
 *
 * You need to disable @emotion/babel-plugin in nextjs/.babelrc.js for the test
 * to be valid, since the Babel plugin determines labels at compile time.
 */
import Head from 'next/head'

// getLabelFromStackTrace will return 'MyComponent' on the server and undefined
// in Safari
function MyComponent() {
  return <div css={{ color: 'orchid' }}>Some colored text</div>
}

// getLabelFromStackTrace will return 'RenderElement' on the server and
// 'MyComponent2' in Safari
function MyComponent2() {
  function RenderElement() {
    return <div css={{ color: 'orchid' }}>Some colored text 2</div>
  }

  const el = RenderElement()
  return el
}

export default function SafariClassNameMismatch() {
  return (
    <div>
      <Head>
        <title>Safari Class Name Mismatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Safari Class Name Mismatch</h1>
      <MyComponent />
      {/* <MyComponent2 /> */}
    </div>
  )
}
