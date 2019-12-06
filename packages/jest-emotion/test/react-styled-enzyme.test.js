import 'test-utils/legacy-env' // adds serializer
/** @jsx jsx */
import * as enzyme from 'enzyme'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import toJson from 'enzyme-to-json'

function toMatchSnapshot(component) {
  const wrapper = enzyme.mount(component)
  expect(toJson(wrapper)).toMatchSnapshot()
}

beforeEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

it('Styled test 1', () => {
  const Component = styled.div``

  toMatchSnapshot(<Component />)
})

// this seems to kick some sort of initialization
// TODO: investigate
it('Styled test 2', () => {
  const Component = styled.div`
    color: red;
  `

  toMatchSnapshot(<Component />)
})

it('Styled test 3', () => {
  const Component = styled.div``

  toMatchSnapshot(<Component />)
})
