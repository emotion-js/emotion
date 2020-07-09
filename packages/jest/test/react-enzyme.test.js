import 'test-utils/enzyme-env'
/** @jsx jsx */

import jestInCase from 'jest-in-case'
import * as enzyme from 'enzyme'
import { jsx, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import toJson from 'enzyme-to-json'

import * as serializer from '@emotion/jest/enzyme-serializer'

expect.addSnapshotSerializer(serializer)

const cases = {
  'empty styled': {
    render() {
      const Greeting = styled.div``
      return <Greeting>Hello</Greeting>
    }
  },
  basic: {
    render() {
      const Greeting = ({ children }) => (
        <div css={{ backgroundColor: 'red' }}>{children}</div>
      )
      return <Greeting>hello</Greeting>
    }
  },
  styled: {
    render() {
      const Greeting = styled.div`
        background-color: red;
      `
      return <Greeting>Hello</Greeting>
    }
  },
  nested: {
    render() {
      return <div>{cases.basic.render()}</div>
    }
  },
  'nested styled': {
    render() {
      return <div>{cases.styled.render()}</div>
    }
  },
  'with styles on top level': {
    render() {
      const Greeting = ({ children, className }) => (
        <div className={className}>{children}</div>
      )
      return <Greeting css={{ backgroundColor: 'red' }}>Hello</Greeting>
    }
  },
  'with prop containing css element': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )
      return (
        <Greeting content={<p css={{ backgroundColor: 'blue' }}>Hello</p>}>
          World!
        </Greeting>
      )
    }
  },
  'with prop containing css element not at the top level': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )

      return (
        <div>
          <Greeting
            content={
              <p id="something" css={{ backgroundColor: 'blue' }}>
                Hello
              </p>
            }
          >
            World!
          </Greeting>
        </div>
      )
    }
  },
  'with prop containing css element with other props': {
    render() {
      const Greeting = ({ children, content }) => (
        <div>
          {content} {children}
        </div>
      )

      return (
        <Greeting
          content={
            <p id="something" css={{ backgroundColor: 'blue' }}>
              Hello
            </p>
          }
        >
          World!
        </Greeting>
      )
    }
  },
  'with prop containing css element with other label': {
    render() {
      const Thing = ({ content, children }) => {
        return children
      }
      const Greeting = ({ children, content }) => (
        <Thing content={<div css={{ color: 'hotpink' }} />}>
          {content} {children}
        </Thing>
      )

      return (
        <Greeting
          content={
            <p id="something" css={{ backgroundColor: 'blue' }}>
              Hello
            </p>
          }
        >
          World!
        </Greeting>
      )
    }
  },
  theming: {
    render() {
      const Button = styled.button`
        color: ${props => props.theme.main};
        border: 2px solid ${props => props.theme.main};
      `

      Button.defaultProps = {
        theme: {
          main: 'red'
        }
      }

      const theme = {
        main: 'blue'
      }

      return (
        <div>
          <Button>Normal</Button>
          <ThemeProvider theme={theme}>
            <Button>Themed</Button>
          </ThemeProvider>
        </div>
      )
    }
  }
}

describe('enzyme', () => {
  jestInCase(
    'shallow',
    ({ render }) => {
      const wrapper = enzyme.shallow(render())
      expect(wrapper).toMatchSnapshot()
    },
    cases
  )

  jestInCase(
    'mount',
    ({ render }) => {
      const wrapper = enzyme.mount(render())
      expect(wrapper).toMatchSnapshot()
    },
    cases
  )

  test('with prop containing css element in fragment', () => {
    const FragmentComponent = () => (
      <React.Fragment>
        x<div css={{ backgroundColor: 'blue' }}>y</div>
      </React.Fragment>
    )

    const wrapper = enzyme.mount(
      <div>
        <FragmentComponent />
      </div>
    )

    expect(toJson(wrapper, { mode: 'deep' })).toMatchSnapshot()
  })
})
