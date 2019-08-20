import 'test-utils/legacy-env'
/** @jsx jsx */
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json'
import { createSerializer } from 'jest-emotion'
import React from 'react'

expect.addSnapshotSerializer(createEnzymeSerializer())
expect.addSnapshotSerializer(createSerializer())

// Allow deep serialization in tests.
let useDeepSerializer = false
const deepEnzymeSerializer = createEnzymeSerializer({ mode: 'deep' })
expect.addSnapshotSerializer({
  test: val => useDeepSerializer && deepEnzymeSerializer.test(val),
  print: deepEnzymeSerializer.print
})

beforeEach(() => {
  useDeepSerializer = false
})

test('enzyme mount test', () => {
  const Greeting = ({ children }) => (
    <div css={{ backgroundColor: 'red' }}>{children}</div>
  )
  const tree = enzyme.mount(<Greeting>hello</Greeting>)
  expect(tree).toMatchSnapshot()
})

test('enzyme test with prop containing css element', () => {
  const Greeting = ({ children, content }) => (
    <div>
      {content} {children}
    </div>
  )

  const tree = enzyme.mount(
    <Greeting content={<p css={{ backgroundColor: 'blue' }}>Hello</p>}>
      World!
    </Greeting>
  )
  expect(tree).toMatchSnapshot()
})

test('enzyme test with prop containing css element not at the top level', () => {
  const Greeting = ({ children, content }) => (
    <div>
      {content} {children}
    </div>
  )

  const tree = enzyme.mount(
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
  expect(tree).toMatchSnapshot()
})

test('enzyme test with prop containing css element with other props', () => {
  const Greeting = ({ children, content }) => (
    <div>
      {content} {children}
    </div>
  )

  const tree = enzyme.mount(
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
  expect(tree).toMatchSnapshot()
})

test('enzyme test with prop containing css element with other label', () => {
  const Thing = ({ content, children }) => {
    return children
  }
  const Greeting = ({ children, content }) => (
    <Thing content={<div css={{ color: 'hotpink' }} />}>
      {content} {children}
    </Thing>
  )

  const tree = enzyme.mount(
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
  expect(tree).toMatchSnapshot()
})

test('enzyme test with prop containing css element in fragment', () => {
  useDeepSerializer = true

  const FragmentComponent = () => (
    <React.Fragment>
      x<div css={{ backgroundColor: 'blue' }}>y</div>
    </React.Fragment>
  )

  const tree = enzyme.mount(
    <div>
      <FragmentComponent />
    </div>
  )
  expect(tree).toMatchSnapshot()
})
