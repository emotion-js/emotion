/**
 * This is a test of @emotion/react/src/suppress-safari-class-name-mismatch.js.
 *
 * You need to disable @emotion/babel-plugin in playgrounds/nextjs/.babelrc.js
 * for the test to be valid, since the Babel plugin determines labels at compile
 * time.
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

// getLabelFromStackTrace will return 'MyComponent' on the server and undefined
// in Safari. There is also a non-Emotion class.
function MyComponent3() {
  return (
    <div css={{ color: 'orchid' }} className="user-class">
      Some colored text 3
    </div>
  )
}

export default function SafariClassNameMismatch() {
  return (
    <div>
      <Head>
        <title>Proper Tail Call Class Name Mismatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Proper Tail Call Class Name Mismatch</h1>
      <MyComponent />
      <MyComponent2 />
      <MyComponent3 />
    </div>
  )
}
