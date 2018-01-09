import createBroadcast from '../src/create-broadcast'
import { mount, shallow } from 'enzyme'
import React, { Component } from 'react'
import { channel, withTheme } from 'emotion-theming'
import {
  getChannel,
  StatelessComp,
  Pure,
  Trap,
  mountOptions,
  getInterceptor,
} from './test-helpers'

test(`withTheme(Comp) result instance should be a React Component`, () => {
  const actual = Component.isPrototypeOf(withTheme(StatelessComp))
  expect(actual).toBe(true)
})

test(`withTheme(Comp)'s should use the default channel`, () => {
  const actual = getChannel(withTheme(StatelessComp))
  const expected = channel
  expect(actual).toBe(expected)
})

test(`withTheme(Comp) should include wrapped stateless component's name in the displayName`, () => {
  const ThemedComp = withTheme(StatelessComp)
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const wrapper = mount(
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
  const theme = { themed: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)
  const unsubscribe = jest.spyOn(broadcast, 'unsubscribe')

  const wrapper = mount(
    <ComponentWithTheme intercept={() => {}} />,
    mountOptions(broadcast)
  )

  expect(unsubscribe).not.toHaveBeenCalled()

  wrapper.unmount()

  expect(unsubscribe).toHaveBeenCalled()
})

test(`withTheme(Comp) should throw if used without appropriate context`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const ComponentWithTheme = withTheme(Trap.Prop)

  expect(() => mount(<ComponentWithTheme intercept={() => {}} />)).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test(`withTheme(Comp) should receive the theme`, () => {
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)

  mount(<ComponentWithTheme intercept={actual} />, mountOptions(broadcast))

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) should receive a theme deep down into the tree`, () => {
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
  const theme = { themed: true }
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = update

  const ComponentWithTheme = withTheme(Trap.Prop)
  const broadcast = createBroadcast(theme)

  mount(<ComponentWithTheme intercept={actual} />, mountOptions(broadcast))

  broadcast.publish(update)

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) receives theme updates even through PureComponent`, () => {
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

  broadcast.publish(update)

  expect(actual()).toEqual(expected)
})

test(`withTheme(Comp) hoists non-react static class properties`, () => {
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
