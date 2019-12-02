import 'test-utils/legacy-env'
/** @jsx jsx */
import jestInCase from 'jest-in-case'
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer } from 'jest-emotion'
import React from 'react'
import toJson from 'enzyme-to-json'

expect.addSnapshotSerializer(createSerializer())

const cases = {
  basic: {
    render() {
      const Greeting = ({ children }) => (
        <div css={{ backgroundColor: 'red' }}>{children}</div>
      )
      return <Greeting>hello</Greeting>
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
  }
}

describe('enzyme', () => {
  jestInCase(
    'shallow',
    ({ render }) => {
      const wrapper = enzyme.shallow(render())
      expect(toJson(wrapper)).toMatchSnapshot()
    },
    cases
  )

  jestInCase(
    'mount',
    ({ render }) => {
      const wrapper = enzyme.mount(render())
      expect(toJson(wrapper)).toMatchSnapshot()
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
