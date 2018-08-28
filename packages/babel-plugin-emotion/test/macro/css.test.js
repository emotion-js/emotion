// @flow
import 'test-utils/legacy-env'
import React from 'react'
import renderer from 'react-test-renderer'
import { css } from 'emotion/macro'

test('float property', () => {
  const cls1 = css`
    float: left;
  `

  const tree = renderer.create(<div className={cls1} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('handles more than 10 dynamic properties', () => {
  const cls1 = css`
    text-decoration: ${'underline'};
    border-right: solid blue 54px;
    background: ${'white'};
    color: ${'black'};
    display: ${'block'};
    border-radius: ${'3px'};
    padding: ${'25px'};
    width: ${'500px'};
    z-index: ${100};
    font-size: ${'18px'};
    text-align: ${'center'};
  `

  const tree = renderer.create(<div className={cls1} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('auto px', () => {
  const cls1 = css({ display: 'flex', flex: 1, fontSize: 10 })
  const tree = renderer.create(<div className={cls1} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('random interpolation with undefined values', () => {
  const cls2 = css`
    ${undefined};
    justify-content: center;
  `
  const tree = renderer.create(<div className={cls2} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('random expression', () => {
  const cls2 = css`
    font-size: 20px;
    @media (min-width: 420px) {
      color: blue;
      ${css`
        width: 96px;
        height: 96px;
      `};
      line-height: 40px;
    }
    background: green;
  `
  const tree = renderer.create(<div className={cls2} />).toJSON()
  expect(tree).toMatchSnapshot()
})
