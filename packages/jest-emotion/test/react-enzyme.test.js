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
