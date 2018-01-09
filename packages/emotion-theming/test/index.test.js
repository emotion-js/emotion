import { mount } from 'enzyme'
import enyzmeToJSON from 'enzyme-to-json'
import React from 'react'
import styled from 'react-emotion'

import {
  Trap,
  Pure,
  StatelessComp,
  getInterceptor,
  getChannel,
} from './test-helpers'
import { channel, ThemeProvider, withTheme } from 'emotion-theming'

test(`theming default channel`, () => {
  const defaultChannel = channel
  const actual = {
    themeProviderChannel: getChannel(ThemeProvider),
    withThemeChannel: getChannel(withTheme(StatelessComp)),
  }
  const expected = {
    themeProviderChannel: defaultChannel,
    withThemeChannel: defaultChannel,
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

test('updating theme after a listener unsubscribed', () => {
  const theme = { theme: 'something' }
  const updated = { theme: 'something different' }
  const ComponentWithTheme = withTheme(() => null)
  const SomeComponent = props => (
    <ThemeProvider theme={props.theme}>
      <div>
        <ComponentWithTheme />

        {props.renderThing && <ComponentWithTheme />}
      </div>
    </ThemeProvider>
  )

  const wrapper = mount(<SomeComponent theme={theme} renderThing />)

  expect(enyzmeToJSON(wrapper)).toMatchSnapshot()

  wrapper.setProps({ renderThing: false })

  expect(enyzmeToJSON(wrapper)).toMatchSnapshot()

  wrapper.setProps({ theme: updated })

  expect(enyzmeToJSON(wrapper)).toMatchSnapshot()
})

test('emotion integration test', () => {
  const theme = { bg: 'green', color: 'red' }

  const ThemedComponent = styled.div`
    color: ${p => p.theme.color};
  `

  const ReThemedComponent = styled(ThemedComponent)`
    background-color: ${p => p.theme.bg};
  `
  const FinalComponent = styled(ReThemedComponent)`
    border: 1px solid blue;
  `

  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <FinalComponent />
    </ThemeProvider>
  )

  expect(enyzmeToJSON(wrapper)).toMatchSnapshot()
})
