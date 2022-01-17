import Head from 'next/head'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

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

// getLabelFromStackTrace will return 'MyComponent' on the server and undefined
// in Safari. There is also a non-Emotion class name mismatch which should
// result in a hydration warning.
function MyComponent4() {
  return (
    <div
      css={{ color: 'orchid' }}
      className={typeof window === 'object' ? 'browser-class' : ''}
    >
      Some colored text 4
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
      <p>
        This is a test of
        <code>
          @emotion/react/src/suppress-proper-tail-call-class-name-mismatch.js
        </code>
        .
      </p>
      <p>
        You have to comment out <code>@emotion/babel-plugin</code> in the
        playground's
        <code>.babelrc.js</code> for this to be a valid test since the Babel
        plugin computes labels at compile time.
      </p>

      <MyComponent />
      <MyComponent2 />
      <MyComponent3 />
      {/* <MyComponent4 /> */}
    </div>
  )
}
