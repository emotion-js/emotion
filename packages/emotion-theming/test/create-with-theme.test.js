import createBroadcast from 'brcast'
import { mount, shallow } from 'enzyme'
import isFunction from 'is-function'
import React, { Component } from 'react'

import createWithTheme from '../src/create-with-theme'
import channel from '../src/channel'

import {
  getChannel,
  Comp,
  Pure,
  Trap,
  mountOptions,
  getInterceptor
} from './test-helpers'

test(`createWithTheme should be a function`, () => {
  const actual = isFunction(createWithTheme)
  expect(actual).toBe(true)
})

test(`createWithTheme's result should be a function`, () => {
  const withTheme = createWithTheme()
  const actual = isFunction(withTheme)
  expect(actual).toBe(true)
})

test(`withTheme(Comp) result instance should be a React Component`, () => {
  const withTheme = createWithTheme()
  const actual = Component.isPrototypeOf(withTheme(Comp))
  expect(actual).toBe(true)
})

test(`withTheme(Comp)'s should use the default channel`, () => {
  const withTheme = createWithTheme()
  const actual = getChannel(withTheme(Comp))
  const expected = channel
  expect(actual).toBe(expected)
})

test(`withTheme(Comp) should work with a custom channel`, () => {
  const custom = '__CUSTOM__'
  const withTheme = createWithTheme(custom)
  const actual = getChannel(withTheme(Comp))
  const expected = custom
  expect(actual).toBe(expected)
})

test(`withTheme(Comp) should include wrapped stateless component's name in the displayName`, () => {
  const withTheme = createWithTheme()
  const StatelessComp = (...props) => <div {...props} />
  const ThemedComp = withTheme(StatelessComp)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const wrapper = shallow(
    <div>
      <ThemedComp />
    </div>,
    mountOptions(broadcast)
  ).childAt(0)
  const actual = wrapper.name()
  const expected = `WithTheme(StatelessComp)`

  expect(actual).toBe(expected)
})

test(`withTheme(Comp) should include wrapped stateful component's name in the displayName`, () => {
  const withTheme = createWithTheme()
  class StatefullComp extends Component {
    render() {
      return <div {...this.props} />
    }
  }
  const ThemedComp = withTheme(StatefullComp)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const wrapper = shallow(
    <div>
      <ThemedComp />
    </div>,
    mountOptions(broadcast)
  ).childAt(0)
  const actual = wrapper.name()
  const expected = `WithTheme(StatefullComp)`

  expect(actual).toBe(expected)
})

test(`withTheme(Comp) should unsubscribe on unmount`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)
  const unsubscribed = getInterceptor(false)

  const wrapper = mount(
    <ComponentWithTheme intercept={() => {}} />,
    mountOptions(broadcast)
  )
  wrapper.instance().unsubscribe = () => unsubscribed(true)

  expect(unsubscribed()).toBe(false)

  wrapper.unmount()

  expect(unsubscribed()).toBe(true)
})

test(`withTheme(Comp) should throw if used without appropriate context`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const withTheme = createWithTheme()
  const ComponentWithTheme = withTheme(Trap.Prop)

  expect(() => mount(<ComponentWithTheme intercept={() => {}} />)).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test(`withTheme(Comp) should receive the theme`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)

  mount(<ComponentWithTheme intercept={actual} />, mountOptions(broadcast))

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) should receive a theme deep down into the tree`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(expected)

  mount(
    <div>
      <div>
        <ComponentWithTheme intercept={actual} />
      </div>
    </div>,
    mountOptions(broadcast)
  )

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) receives theme through PureComponent`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(expected)

  mount(
    <Pure>
      <ComponentWithTheme intercept={actual} />
    </Pure>,
    mountOptions(broadcast)
  )

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) receives theme updates`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = update

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)

  mount(<ComponentWithTheme intercept={actual} />, mountOptions(broadcast))

  broadcast.setState(update)

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) receives theme updates even through PureComponent`, () => {
  const withTheme = createWithTheme()
  const theme = { themed: true }
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = update

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)

  mount(
    <Pure>
      <ComponentWithTheme intercept={actual} />
    </Pure>,
    mountOptions(broadcast)
  )

  broadcast.setState(update)

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) hoists non-react static class properties`, () => {
  const withTheme = createWithTheme()

  class ExampleComponent extends Component {
    static displayName = 'foo'
    static someSpecialStatic = 'bar'
  }

  const ComponentWithTheme = withTheme(ExampleComponent)

  expect(ComponentWithTheme.displayName).toBe('WithTheme(foo)')
  expect(ComponentWithTheme.someSpecialStatic).toBe(
    ExampleComponent.someSpecialStatic
  )
})
