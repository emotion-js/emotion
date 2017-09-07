import createBroadcast from 'brcast'
import { mount } from 'enzyme'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import CHANNEL from '../src/channel'
import createThemeListener from '../src/create-theme-listener'
import { isPlainObject } from '../src/utils'
import { getChannel, Pure, mountOptions, getInterceptor } from './test-helpers'

test(`createThemeListener should be a function`, () => {
  expect(createThemeListener).toBeInstanceOf(Function)
})

test(`createThemeListener's result should be an object`, () => {
  expect(isPlainObject(createThemeListener())).toBe(true)
})

test(`themeListener's fields should have contextTypes and bind fields`, () => {
  expect(Object.keys(createThemeListener())).toEqual(
    expect.arrayContaining(['contextTypes', 'initial', 'subscribe'])
  )
})

test(`themeListener's should use the default channel`, () => {
  const themeListener = createThemeListener()

  expect(getChannel(themeListener)).toBe(CHANNEL)
})

test(`themeListener's should use a custom channel if one is passed`, () => {
  const customChannel = '__CUSTOM__'
  const themeListener = createThemeListener(customChannel)

  expect(getChannel(themeListener)).toBe(customChannel)
})

test(`themeListener's initial and subscribe should functions`, () => {
  const themeListener = createThemeListener()
  const { initial, subscribe } = themeListener

  expect(initial).toBeInstanceOf(Function)
  expect(subscribe).toBeInstanceOf(Function)
})

const getTrap = themeListener => {
  return class ThemeListenerTrap extends Component {
    static propTypes = {
      intercept: PropTypes.func.isRequired
    }
    static contextTypes = themeListener.contextTypes
    constructor(props, context) {
      super(props, context)
      this.props.intercept(themeListener.initial(context))
    }
    componentDidMount() {
      this.unsubscribe = themeListener.subscribe(
        this.context,
        this.props.intercept
      )
    }
    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
      }
    }
    // eslint-disable-next-line
    render() {
      return <div />
    }
  }
}

test(`themeListener should throw if used without appropriate context`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)

  expect(() => mount(<Trap intercept={() => {}} />)).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test(`themeListener should receive the theme`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor()

  mount(<Trap intercept={interceptor} />, mountOptions(broadcast))

  expect(interceptor()).toEqual(theme)
})

test(`themeListener should recieve the theme, regardless of nesting depth`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor()

  mount(
    <div>
      <div>
        <Trap intercept={interceptor} />
      </div>
    </div>,
    mountOptions(broadcast)
  )

  expect(interceptor()).toEqual(theme)
})

test(`themeListener should receive the theme, even with a PureComponent ancestor`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor()

  mount(
    <Pure>
      <Trap intercept={interceptor} />
    </Pure>,
    mountOptions(broadcast)
  )

  expect(interceptor()).toEqual(theme)
})

test(`themeListener should receive theme updates`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const update = { updated: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor(theme)

  mount(<Trap intercept={interceptor} />, mountOptions(broadcast))

  broadcast.setState(update)

  expect(interceptor()).toEqual(update)
})

test(`themeListener should receive theme updates, regardless of nesting depth`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const update = { updated: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor(theme)

  mount(
    <div>
      <div>
        <Trap intercept={interceptor} />
      </div>
    </div>,
    mountOptions(broadcast)
  )

  broadcast.setState(update)

  expect(interceptor()).toEqual(update)
})

test(`themeListener should receive the theme updates, even with a PureComponent ancestor`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const update = { updated: true }
  const broadcast = createBroadcast(theme)
  const interceptor = getInterceptor(theme)

  mount(
    <Pure>
      <Trap intercept={interceptor} />
    </Pure>,
    mountOptions(broadcast)
  )

  broadcast.setState(update)

  expect(interceptor()).toEqual(update)
})

test(`themeListener should unsubscribe during unmount`, () => {
  const themeListener = createThemeListener()
  const Trap = getTrap(themeListener)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const unsubscribed = getInterceptor(false)

  const wrapper = mount(<Trap intercept={() => {}} />, mountOptions(broadcast))
  wrapper.instance().unsubscribe = () => unsubscribed(true)

  expect(unsubscribed()).toBe(false)
  wrapper.unmount()
  expect(unsubscribed()).toBe(true)
})
