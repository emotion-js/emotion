import createBroadcast from '../src/create-broadcast'
import { mount } from 'enzyme'
import React, { Component } from 'react'

import { channel, ThemeProvider } from 'emotion-theming'
import {
  getChannel,
  Trap,
  Pure,
  getInterceptor,
  mountOptions,
} from './test-helpers'

test(`createThemeProvider's result should be a React Component`, () => {
  const actual = Component.isPrototypeOf(ThemeProvider)
  expect(actual).toBe(true)
})

test(`ThemeProvider should use the default channel`, () => {
  const actual = getChannel(ThemeProvider)
  const expected = channel
  expect(actual).toBe(expected)
})

test(`ThemeProvider should unsubscribe on unmounting`, () => {
  const theme = { themed: true }
  const broadcast = createBroadcast(theme)
  const unsubscribe = jest.spyOn(broadcast, 'unsubscribe')

  const wrapper = mount(
    <ThemeProvider theme={theme} />,
    mountOptions(broadcast)
  )

  expect(unsubscribe).not.toHaveBeenCalled()

  wrapper.unmount()

  expect(unsubscribe).toHaveBeenCalled()
})

test(`ThemeProvider should throw if theme is not a plain object`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

  expect(() => mount(<ThemeProvider theme={false} />)).toThrow()
  expect(console.error).toHaveBeenCalled()
})

test(`ThemeProvider should throw if theme as a function does not return a plain object`, () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})

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

test(`ThemeProvider propagates theme updates through nested ThemeProviders`, () => {
  const theme = { themed: true }
  const augment = outerTheme =>
    Object.assign({}, outerTheme, { augmented: true })
  const update = { updated: true }
  const actual = getInterceptor()
  const expected = { themed: true, augmented: true, updated: true }

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <ThemeProvider theme={augment}>
        <Trap.Context intercept={actual} />
      </ThemeProvider>
    </ThemeProvider>
  )

  wrapper.setProps({ theme: Object.assign({}, theme, update) })

  expect(actual()).toEqual(expected)
})

test('ThemeProvider propagates theme updates even through PureComponent', () => {
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
