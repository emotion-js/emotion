// @flow
import { throwIfFalsy, safeQuerySelector } from 'test-utils'
import * as React from 'emotion-react-mock-for-preact'
import { render as preactRender } from 'preact'

function render(element) {
  preactRender(element, safeQuerySelector('#root'))
}
beforeEach(() => {
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`
})

test('default', () => {
  let defaultContext = <div>it works!!</div>
  let { Consumer } = React.createContext(defaultContext)
  render(<Consumer>{element => element}</Consumer>)
  expect(document.documentElement).toMatchSnapshot()
})

test('with provider', () => {
  let defaultContext = <div>it works!!</div>
  let { Consumer, Provider } = React.createContext(defaultContext)
  render(
    <Provider value={<div>this is the actual value!!</div>}>
      <Consumer>{element => element}</Consumer>
    </Provider>
  )
  expect(document.documentElement).toMatchSnapshot()
})

test('provider without children', () => {
  let defaultContext = <div>it works!!</div>
  let { Provider } = React.createContext(defaultContext)
  render(
    <div>
      some content
      <Provider value={<div>this is the actual value!!</div>} />
    </div>
  )
  expect(document.documentElement).toMatchSnapshot()
})

test('provider change', cb => {
  let firstContextValue = 'first'
  let secondContextValue = 'second'
  let { Provider, Consumer } = React.createContext(null)

  class ThingThatDoesSomething extends React.Component<{}, *> {
    state = { value: firstContextValue }
    render() {
      return (
        <Provider value={this.state.value}>
          <Consumer>{value => <button id="thing">{value}</button>}</Consumer>
        </Provider>
      )
    }
  }
  // $FlowFixMe
  let ref: ThingThatDoesSomething
  render(<ThingThatDoesSomething ref={node => (ref = node)} />)
  expect(safeQuerySelector('#thing').textContent).toBe(firstContextValue)
  ref.setState({ value: secondContextValue }, () => {
    expect(safeQuerySelector('#thing').textContent).toBe(secondContextValue)
    cb()
  })
})

test('does not throw on unmount', () => {
  let { Provider, Consumer } = React.createContext(null)

  render(
    <Provider value={'value'}>
      <Consumer>{value => <div>{value}</div>}</Consumer>
    </Provider>
  )
  preactRender(
    null,
    safeQuerySelector('#root'),
    throwIfFalsy(safeQuerySelector('#root').firstChild)
  )
})
