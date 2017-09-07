import { mount } from 'enzyme'
import React from 'react'

import { Trap, Pure, Comp, getInterceptor, getChannel } from './test-helpers'
import { channel, createTheming, ThemeProvider, withTheme } from '../src/index'
import { isFunction, isPlainObject } from '../src/utils'

test(`createTheming should be a function`, () => {
  const actual = isFunction(createTheming)
  expect(actual).toBe(true)
})

test(`createTheming() result should be an object`, () => {
  const theming = createTheming()
  const actual = isPlainObject(theming)
  expect(actual).toBe(true)
})

test(`createTheming()'s creates all expected keys`, () => {
  const theming = createTheming()
  const actual = Object.keys(theming)
  const expected = ['channel', 'withTheme', 'ThemeProvider', 'themeListener']

  expect(actual).toEqual(expected)
})

test(`theming default channel`, () => {
  const defaultChannel = channel
  const theming = createTheming()
  const actual = {
    themeProviderChannel: getChannel(theming.ThemeProvider),
    withThemeChannel: getChannel(theming.withTheme(Comp))
  }
  const expected = {
    themeProviderChannel: defaultChannel,
    withThemeChannel: defaultChannel
  }

  expect(actual).toEqual(expected)
})

test(`theming custom channel`, () => {
  const customChannel = '__CUSTOM__'
  const theming = createTheming(customChannel)
  const actual = {
    themeProviderChannel: getChannel(theming.ThemeProvider),
    withThemeChannel: getChannel(theming.withTheme(Comp))
  }
  const expected = {
    themeProviderChannel: customChannel,
    withThemeChannel: customChannel
  }

  expect(actual).toEqual(expected)
})

test('Theming passes initial theme', () => {
  const theme = { themed: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <ComponentWithTheme intercept={actual} />
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test('Theming should pass initial theme through deep react tree', () => {
  const theme = { themed: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <ComponentWithTheme intercept={actual} />
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test('Theming should pass initial theme through PureComponent', () => {
  const theme = { themed: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <Pure>
        <ComponentWithTheme intercept={actual} />
      </Pure>
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test('Theming and updates', () => {
  const theme = { themed: true }
  const update = { updated: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const actual = getInterceptor()
  const expected = update

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <ComponentWithTheme intercept={actual} />
    </ThemeProvider>
  )

  wrapper.setProps({ theme: update })

  expect(actual()).toEqual(expected)
})

test('Theming, updates and PureComponent', () => {
  const theme = { themed: true }
  const update = { updated: true }
  const ComponentWithTheme = withTheme(Trap.Prop)
  const actual = getInterceptor()
  const expected = update

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Pure>
        <ComponentWithTheme intercept={actual} />
      </Pure>
    </ThemeProvider>
  )

  wrapper.setProps({ theme: update })

  expect(actual()).toEqual(expected)
})
