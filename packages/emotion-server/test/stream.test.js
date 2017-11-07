/**
 * @jest-environment node
*/
import React from 'react'
import { renderStylesToNodeStream } from 'emotion-server'
import { renderToNodeStream } from 'react-dom/server'
// import through from 'through'
import { getComponents } from './util'

describe('streaming SSR', () => {
  test('stream', cb => {
    const { Page1 } = getComponents()
    const stream = renderToNodeStream(<Page1 />)
    stream.on('data', data => {
      console.log(data.toString())
    })
    stream.on('end', () => {
      console.log(stream.read().toString())
      cb()
    })
    stream.on('error', error => {
      console.log(error)
    })
  })
})
