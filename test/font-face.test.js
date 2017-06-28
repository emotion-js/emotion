/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from '../jest-utils'

// eslint-disable-next-line no-unused-vars
import css, { sheet, fragment, fontFace } from '../src/index'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

// This does nothing
describe.skip('font-face', () => {
  test('adds font-face to sheet', done => {
    fontFace`
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'), url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2) format('woff2');
      unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
    `
    // console.log(sheet.rules())
    expect(sheet).toMatchSnapshot()
  })
})
