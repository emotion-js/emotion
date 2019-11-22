import 'test-utils/legacy-env'
/** @jsx jsx */
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json'
import { createSerializer } from 'jest-emotion'
import React from 'react'
import toJson from 'enzyme-to-json'

expect.addSnapshotSerializer(createSerializer())
expect.addSnapshotSerializer(createEnzymeSerializer())

const expectToMatchSnapshot = component => {
  expect(enzyme.mount(component)).toMatchSnapshot('mount')
  expect(enzyme.shallow(component)).toMatchSnapshot('shallow')
}

test('enzyme test', () => {
  const Greeting = ({ children }) => (
    <div css={{ backgroundColor: 'red' }}>{children}</div>
  )
  expectToMatchSnapshot(<Greeting>hello</Greeting>)
})

test('enzyme test with prop containing css element', () => {
  const Greeting = ({ children, content }) => (
    <div>
      {content} {children}
    </div>
  )

  expectToMatchSnapshot(
    <Greeting content={<p css={{ backgroundColor: 'blue' }}>Hello</p>}>
      World!
    </Greeting>
  )
})

test('enzyme test with prop containing css element not at the top level', () => {
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
    </div>
  )
})

test('enzyme test with prop containing css element with other props', () => {
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
    </Greeting>
  )
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

  expectToMatchSnapshot(
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
})

test('enzyme test with prop containing css element in fragment', () => {
  const FragmentComponent = () => (
    <React.Fragment>
      x<div css={{ backgroundColor: 'blue' }}>y</div>
    </React.Fragment>
  )

  expect(
    toJson(
      enzyme.mount(
        <div>
          <FragmentComponent />
        </div>
      ),
      {
        mode: 'deep'
      }
    )
  ).toMatchSnapshot()
})
