import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import { css, sheet } from 'emotion'
import styled from 'react-emotion'

expect.addSnapshotSerializer(serializer(sheet))

describe('prefixing', () => {
  test('styled', () => {
    const Div = styled.div`display: flex;`
    const tree = renderer.create(<Div>hello world</Div>).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('css', () => {
    const cls1 = css`
      display: flex;
    `
    const tree = renderer
      .create(<div className={cls1}>hello world</div>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('object', () => {
    const cls1 = css({
      display: 'flex'
    })
    const tree = renderer
      .create(<div className={cls1}>hello world</div>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
