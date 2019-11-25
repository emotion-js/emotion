import 'test-utils/legacy-env'
/** @jsx jsx */
import cases from 'jest-in-case'
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer } from 'jest-emotion'
import React from 'react'
import toJson from 'enzyme-to-json'

expect.addSnapshotSerializer(createSerializer())

const testWithMethods = (description, testCase) =>
  cases(description, testCase, [
    { name: 'render component with shallow', method: 'shallow' },
    { name: 'render component with mount', method: 'mount' }
  ])

const expectToMatchSnapshot = (component, method, mode) => {
  let wrapper = enzyme[method](component)
  expect(toJson(wrapper, { mode })).toMatchSnapshot()
}

testWithMethods('enzyme test', ({ method }) => {
  const Greeting = ({ children }) => (
    <div css={{ backgroundColor: 'red' }}>{children}</div>
  )
  expectToMatchSnapshot(<Greeting>hello</Greeting>, method)
})

testWithMethods(
  'enzyme test with prop containing css element',
  ({ method }) => {
    const Greeting = ({ children, content }) => (
      <div>
        {content} {children}
      </div>
    )

    expectToMatchSnapshot(
      <Greeting content={<p css={{ backgroundColor: 'blue' }}>Hello</p>}>
        World!
      </Greeting>,
      method
    )
  }
)

testWithMethods(
  'enzyme test with prop containing css element not at the top level',

  ({ method }) => {
    const Greeting = ({ children, content }) => (
      <div>
        {content} {children}
      </div>
    )

    expectToMatchSnapshot(
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
      </div>,
      method
    )
  }
)

testWithMethods(
  'enzyme test with prop containing css element with other props',

  ({ method }) => {
    const Greeting = ({ children, content }) => (
      <div>
        {content} {children}
      </div>
    )

    expectToMatchSnapshot(
      <Greeting
        content={
          <p id="something" css={{ backgroundColor: 'blue' }}>
            Hello
          </p>
        }
      >
        World!
      </Greeting>,
      method
    )
  }
)

testWithMethods(
  'enzyme test with prop containing css element with other label',
  ({ method }) => {
    const Thing = ({ content, children }) => {
      return children
    }
    const Greeting = ({ children, content }) => (
      <Thing content={<div css={{ color: 'hotpink' }} />}>
        {content} {children}
      </Thing>
    )

    expectToMatchSnapshot(
      <Greeting
        content={
          <p id="something" css={{ backgroundColor: 'blue' }}>
            Hello
          </p>
        }
      >
        World!
      </Greeting>,
      method
    )
  }
)

test('enzyme test with prop containing css element in fragment', () => {
  const FragmentComponent = () => (
    <React.Fragment>
      x<div css={{ backgroundColor: 'blue' }}>y</div>
    </React.Fragment>
  )

  expectToMatchSnapshot(
    <div>
      <FragmentComponent />
    </div>,
    'mount',
    'deep'
  )
})
