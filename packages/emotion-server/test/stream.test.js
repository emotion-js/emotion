/**
 * @jest-environment node
*/
import React from 'react'
import { renderStylesToNodeStream } from 'emotion-server'
import { renderToNodeStream } from 'react-dom/server'
// import through from 'through'
import App from './streaming-component'

describe('streaming SSR', () => {
  test('stream', cb => {
    const stream = renderToNodeStream(<App count={20} />).pipe(
      renderStylesToNodeStream()
    )
    let thing = ''
    stream.on('data', data => {
      thing += data.toString()
    })
    stream.on('end', () => {
      expect(thing).toMatchSnapshot()
      cb()
    })
    stream.on('error', error => {
      console.log(error)
      cb(error)
    })
  })
})
