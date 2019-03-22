import 'test-utils/legacy-env'
/** @jsx jsx */
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json'
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(createEnzymeSerializer())
expect.addSnapshotSerializer(createSerializer())

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
