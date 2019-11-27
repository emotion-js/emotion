import 'test-utils/legacy-env'
/** @jsx jsx */
import cases from 'jest-in-case'
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer } from 'jest-emotion'
import React from 'react'
import toJson from 'enzyme-to-json'

expect.addSnapshotSerializer(createSerializer())

const expectToMatchSnapshot = (wrapper, mode) => {
  expect(toJson(wrapper, { mode })).toMatchSnapshot()
}

const withMethods = (obj, methods) =>
  methods.map(method => ({
    ...obj,
    name: `${obj.name} - ${method}`,
    method
  }))

const renderMethods = ['shallow', 'mount']

cases(
  'react enzyme tests',
  ({ render, method, mode }) => {
    const component = render()
    const wrapper = enzyme[method](component)
    expectToMatchSnapshot(wrapper, mode)
  },
  [
    ...withMethods(
      {
        name: 'basic',
        render() {
          const Greeting = ({ children }) => (
            <div css={{ backgroundColor: 'red' }}>{children}</div>
          )
          return <Greeting>hello</Greeting>
        }
      },
      renderMethods
    ),
    ...withMethods(
      {
        name: 'enzyme test with prop containing css element',
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
      renderMethods
    ),
    ...withMethods(
      {
        name:
          'enzyme test with prop containing css element not at the top level',
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
      renderMethods
    ),
    ...withMethods(
      {
        name: 'enzyme test with prop containing css element with other props',
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
      renderMethods
    ),
    ...withMethods(
      {
        name: 'enzyme test with prop containing css element with other label',
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
      renderMethods
    ),
    {
      name: 'enzyme test with prop containing css element in fragment',
      method: 'mount',
      mode: 'deep',
      render() {
        const FragmentComponent = () => (
          <React.Fragment>
            x<div css={{ backgroundColor: 'blue' }}>y</div>
          </React.Fragment>
        )

        return (
          <div>
            <FragmentComponent />
          </div>
        )
      }
    }
  ]
)

test('', () => {})
