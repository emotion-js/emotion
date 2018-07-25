// @flow
import { throwIfFalsy } from 'test-utils'
import * as React from 'emotion-react-mock-for-preact'
import { render } from 'preact'

test('default', () => {
  let defaultContext = <div>it works!!</div>
  let { Consumer, Provider } = React.createContext(defaultContext)
  throwIfFalsy(document.body).innerHTML = `<div id="root"></root>`
  render(
    <Consumer>{element => element}</Consumer>,
    throwIfFalsy(document.getElementById('root'))
  )
  expect(document.documentElement).toMatchSnapshot()
})

test('with provider', () => {
  let defaultContext = <div>it works!!</div>
  let { Consumer, Provider } = React.createContext(defaultContext)
  throwIfFalsy(document.body).innerHTML = `<div id="root"></root>`
  render(
    <Provider value={<div>this is the actual value!!</div>}>
      <Consumer>{element => element}</Consumer>
    </Provider>,
    throwIfFalsy(document.getElementById('root'))
  )
  expect(document.documentElement).toMatchSnapshot()
})

test('provider without children', () => {
  let defaultContext = <div>it works!!</div>
  let { Consumer, Provider } = React.createContext(defaultContext)
  throwIfFalsy(document.body).innerHTML = `<div id="root"></root>`
  render(
    <div>
      some content<Provider value={<div>this is the actual value!!</div>} />
    </div>,
    throwIfFalsy(document.getElementById('root'))
  )
  expect(document.documentElement).toMatchSnapshot()
})
