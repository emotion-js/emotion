import 'test-utils/legacy-env'
import React from 'react'
import * as enzyme from 'enzyme'
import { css } from '@emotion/core'
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json'
import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(createEnzymeSerializer())
expect.addSnapshotSerializer(createSerializer())

test('enzyme mount test', () => {
  const Greeting = ({ children }) => (
    <div css={css({ backgroundColor: 'red' })}>{children}</div>
  )
  const tree = enzyme.mount(<Greeting>hello</Greeting>)
  expect(tree).toMatchSnapshot()
})
