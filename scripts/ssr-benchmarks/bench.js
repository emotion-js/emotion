import * as React from 'react'
import styled from '@emotion/styled'
import { renderToString } from 'react-dom/server'
import Benchmark from 'benchmark'
import { jsx, css, CacheProvider } from '@emotion/core'
import { createTriangle } from './triangle'
import { css as cssClassName } from 'emotion'
import { renderStylesToString } from 'emotion-server'
import createEmotionServer from 'create-emotion-server'
import createCache from '@emotion/cache'

let Triangle = createTriangle(styled.div`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
  transform: translate(50%, 50%);
  margin-left: ${props => props.x + 'px'};
  margin-top: ${props => props.y + 'px'};
  border-right-width: ${props => props.size / 2 + 'px'};
  border-bottom-width: ${props => props.size / 2 + 'px'};
  border-left-width: ${props => props.size / 2 + 'px'};
  border-bottom-color: ${props => props.color};
`)

let CssPropTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  return jsx('div', {
    css: css`
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      transform: translate(50%, 50%);
      margin-left: ${x + 'px'};
      margin-top: ${y + 'px'};
      border-right-width: ${size / 2 + 'px'};
      border-bottom-width: ${size / 2 + 'px'};
      border-left-width: ${size / 2 + 'px'};
      border-bottom-color: ${color};
    `,
    ...props
  })
})

let CssFuncTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  return React.createElement('div', {
    className: cssClassName`
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      transform: translate(50%, 50%);
      margin-left: ${x + 'px'};
      margin-top: ${y + 'px'};
      border-right-width: ${size / 2 + 'px'};
      border-bottom-width: ${size / 2 + 'px'};
      border-left-width: ${size / 2 + 'px'};
      border-bottom-color: ${color};
    `,
    ...props
  })
})

const suite = new Benchmark.Suite('ssr', {
  onError: event => {
    console.log(event.target.error)
  },
  onStart: () => {
    console.log('\nStarting benchmarks...')
  }
})

suite
  .add('styled', () => {
    renderToString(<Triangle s={100} x={0} y={0} />)
  })
  .add('css prop', () => {
    renderToString(<CssPropTriangle s={100} x={0} y={0} />)
  })
  .add('css prop compat', () => {
    let cache = createCache()
    createEmotionServer(cache).renderStylesToString(
      renderToString(
        <CacheProvider value={cache}>
          <CssPropTriangle s={100} x={0} y={0} />
        </CacheProvider>
      )
    )
  })
  .add('css func', () => {
    renderStylesToString(
      renderToString(<CssFuncTriangle s={100} x={0} y={0} />)
    )
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
