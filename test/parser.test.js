/* eslint-env jest */

import { parseCSS } from '../src/parser'

const basicCSS = `.thing {
  display: flex;
  justify-content: center;
  width: var(--css-hash-0);
}`

const fancyCSS = `.some-selector {
  display: flex;
  justify-content: center;
  width: var(--css-hash-0);
  &:hover {
    background-color: green;
  }
  @media (max-width: 500px) {
    height: var(--css-hash-1);
    position: fixed;
  }
  @media print {
    display: none;
  }
  &::before {
    color: blue;
    width: 20px;
    height: 20px;
    content: 'pseudo'
  }
}`

const staticCSS = `.thing {
  display: block;
  height: 50px
  width: 30px;
}`

describe('parser', () => {
  test('basic', () => {
    expect(parseCSS(basicCSS)).toMatchSnapshot()
  })
  test('basic extract', () => {
    expect(parseCSS(basicCSS, { extract: true })).toMatchSnapshot()
  })
  test('fancy', () => {
    expect(parseCSS(fancyCSS)).toMatchSnapshot()
  })
  test('fancy extract', () => {
    expect(parseCSS(fancyCSS, { extract: true })).toMatchSnapshot()
  })
  test('static', () => {
    expect(parseCSS(staticCSS)).toMatchSnapshot()
  })
  test('static extract', () => {
    expect(parseCSS(staticCSS, { extract: true })).toMatchSnapshot()
  })
})
