// @flow
/* eslint-env jest */
import * as React from 'react'
import prettify from '@emotion/css-prettifier'
import type { Emotion } from '@emotion/css/create-instance'
// $FlowFixMe
import { renderToNodeStream } from 'react-dom/server'
import HTMLSerializer from 'jest-serializer-html'

type EmotionServer = {
  renderStylesToNodeStream: () => *,
  extractCritical: string => { html: string, css: string, ids: Array<string> },
  renderStylesToString: string => string
}

expect.addSnapshotSerializer(HTMLSerializer)

export const getComponents = (
  emotion: Emotion,
  { default: styled }: { default: Function }
) => {
  let Provider = require('@emotion/react').CacheProvider
  let { injectGlobal, keyframes, css } = emotion
  const color = 'red'

  injectGlobal`
    @font-face {
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'),
        url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
          format('woff2');
      unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
        U+2c60-2c7f, U+A720-A7FF;
    }
  `

  const bounce = keyframes`
    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
    label: bounce;
  `

  const hoverStyles = css`
    color: hotpink;
    &:hover {
      color: white;
      background-color: lightgray;
      border-color: aqua;
      box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
    }
    label: hoverStyles;
  `

  // this is using @emotion/styled/base
  // so the call syntax has to be used
  const Main = styled('main')`
    ${hoverStyles};
    display: flex;
    label: Something_Main;
  `

  const Image = styled('img')`
    animation: ${bounce};
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: ${color};
    label: Image;
  `

  // this will not be included since it's not used
  css`
    display: none;
  `

  // this will be included in both because it doesn't have the css- prefix

  injectGlobal`
    .no-prefix {
      display: flex;
      justify-content: center;
    }
  `

  const Page1 = () => (
    <Provider value={emotion.cache}>
      <Main>
        <Image size={30} />
        <Image size={100} />
        <Image />
      </Main>
    </Provider>
  )

  const Page2 = () => (
    <Provider value={emotion.cache}>
      <Main>
        <div>Hello</div>
      </Main>
    </Provider>
  )
  return { Page1, Page2 }
}

const maxColors = Math.pow(16, 6)

export const createBigComponent = ({ injectGlobal, css }: Emotion) => {
  const BigComponent = ({ count }: { count: number }) => {
    if (count === 0) return null
    injectGlobal`
    .some-global-${count} {
      padding: 0;
      margin: ${count};
    }`
    return (
      <div
        className={css({
          color:
            '#' +
            Math.round((1 / count) * maxColors)
              .toString(16)
              .padStart(6, '0')
        })}
      >
        woah there
        <span>hello world</span>
        <BigComponent count={count - 1} />
      </div>
    )
  }
  return BigComponent
}

export const prettifyCritical = ({
  html,
  css,
  ids
}: {
  html: string,
  css: string,
  ids: Array<string>
}) => {
  return { css: prettify(css), ids, html }
}

const isSSRedStyle = node => {
  const attrib = ((node.getAttribute(`data-emotion`): any): string).split(' ')
  // SSRed styles have also serialized names set here
  return attrib.length > 1
}

export const getCssFromChunks = (emotion: Emotion, document: Document) => {
  const chunks = Array.from(
    // $FlowFixMe
    emotion.sheet.tags[0].parentNode.querySelectorAll(`[data-emotion]`)
  ).filter(isSSRedStyle)
  expect(
    // $FlowFixMe
    document.body.querySelector(`[data-emotion]`)
  ).toBeNull()
  let css = chunks.map(chunk => chunk.textContent || '').join('')
  return prettify(css)
}

export const getInjectedRules = () =>
  prettify(
    Array.from(document.querySelectorAll('[data-emotion]'))
      .filter(node => !isSSRedStyle(node))
      .map(x => x.textContent || '')
      .join('')
  )

export const setHtml = (html: string, document: Document) => {
  if (document.body !== null) {
    document.body.innerHTML = html
  } else {
    throw new Error('body does not exist on document')
  }
}

export const renderToStringWithStream = (
  element: React.Element<*>,
  { renderStylesToNodeStream }: EmotionServer
): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = renderToNodeStream(element).pipe(renderStylesToNodeStream())
    let html = ''
    stream.on('data', data => {
      html += data.toString()
    })
    stream.on('end', () => {
      resolve(html)
    })
    stream.on('error', error => {
      reject(error)
    })
  })
