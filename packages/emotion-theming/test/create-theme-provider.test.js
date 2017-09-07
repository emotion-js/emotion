import createBroadcast from 'brcast'
import { mount } from 'enzyme'
import React, { Component } from 'react'

import createThemeProvider from '../src/create-theme-provider'
import channel from '../src/channel'
import { isFunction } from '../src/utils'

import {
  getChannel,
  Trap,
  Pure,
  getInterceptor,
  mountOptions
} from './test-helpers'

test(`createThemeProvider should be a function`, () => {
  const actual = isFunction(createThemeProvider)
  expect(actual).toBe(true)
})

test(`createThemeProvider's result should be a React Component`, () => {
  const ThemeProvider = createThemeProvider()
  const actual = Component.isPrototypeOf(ThemeProvider)
  expect(actual).toBe(true)
})

test(`ThemeProvider should use the default channel`, () => {
  const ThemeProvider = createThemeProvider()
  const actual = getChannel(ThemeProvider)
  const expected = channel
  expect(actual).toBe(expected)
})

test(`ThemeProvider should use a custom channel if one is provided`, () => {
  const custom = '__CUSTOM__'
  const ThemeProvider = createThemeProvider(custom)
  const actual = getChannel(ThemeProvider)
  const expected = custom

  expect(actual).toBe(expected)
})

test(`ThemeProvider should unsubscribe on unmounting`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const unsubscribed = getInterceptor(false)

  const wrapper = mount(
    <ThemeProvider theme={theme} />,
    mountOptions(broadcast)
  )

  expect(unsubscribed()).toBe(false)

  wrapper.instance().unsubscribe = () => unsubscribed(true)
  wrapper.unmount()

  expect(unsubscribed()).toBe(true)
})

test(`ThemeProvider should throw if theme is not a plain object`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const ThemeProvider = createThemeProvider()

  expect(() => mount(<ThemeProvider theme={false} />)).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test(`ThemeProvider should throw if theme as a function does not return a plain object`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const incorrectAugment = () => false

  expect(() => {
    mount(
      <ThemeProvider theme={theme}>
        <ThemeProvider theme={incorrectAugment} />
      </ThemeProvider>
    )
  }).toThrow()

  expect(console.error).toHaveBeenCalled()
})

test(`ThemeProvider should pass a theme`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <Trap.Context intercept={actual} />
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test(`ThemeProvider should pass theme instance, if it is not nested`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <Trap.Context intercept={actual} />
    </ThemeProvider>
  )

  expect(actual()).toBe(expected)
})

test(`ThemeProvider should pass a theme deep down into tree`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <Trap.Context intercept={actual} />
        </div>
      </div>
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test(`ThemeProvider should pass a theme through PureComponent`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const actual = getInterceptor()
  const expected = theme

  mount(
    <ThemeProvider theme={expected}>
      <Pure>
        <Trap.Context intercept={actual} />
      </Pure>
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test(`ThemeProvider should merge themes`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const patch = { merged: true }
  const actual = getInterceptor()
  const expected = { themed: true, merged: true }

  mount(
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={patch}>
        <Trap.Context intercept={actual} />
      </ThemeProvider>
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test(`ThemeProvider should augmented themes if theme is provided as a function`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const augment = outerTheme =>
    Object.assign({}, outerTheme, { augmented: true })
  const actual = getInterceptor()
  const expected = { themed: true, augmented: true }

  mount(
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={augment}>
        <Trap.Context intercept={actual} />
      </ThemeProvider>
    </ThemeProvider>
  )

  expect(actual()).toEqual(expected)
})

test(`ThemeProvider propagates theme updates`, () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = update

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Trap.Context intercept={actual} />
    </ThemeProvider>
  )

  wrapper.setProps({ theme: expected })

  expect(actual()).toEqual(expected)
})

test('ThemeProvider propagates theme updates even through PureComponent', () => {
  const ThemeProvider = createThemeProvider()
  const theme = { themed: true }
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = update

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <Pure>
        <Trap.Context intercept={actual} />
      </Pure>
    </ThemeProvider>
  )

  wrapper.setProps({ theme: expected })

  expect(actual()).toEqual(expected)
})
