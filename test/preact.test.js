/* eslint-env jest */
/* @jsx h */
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import renderToString from 'preact-render-to-string'
import { matcher, serializer } from '../jest-utils'
import { css, sheet } from '../src/index'
import styled from '../src/preact'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('preact', () => {
  test('kitchen sink', () => {
    const fontSize = 20

    const base = css({ color: 'blue' })

    const Content = styled('div')`
      composes: ${base};
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = css`
      name: squirtle-blue-bg;
      background-color: #7FC8D6;
      
      ${Content} {
        height: 1000px;
      }
    `

    const ColumnContent = styled(Content)`
        composes: ${squirtleBlueBackground} ${props => { console.log(props); return props.myClassName}};
        name: onyx;
        background-color: '#343a40';
        flex-direction: column;
      `

    const tree = <ColumnContent myClassName='this-is-from-props'><Content /></ColumnContent>

    expect(renderToString(tree)).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', () => {
    expect(
      () => styled(undefined)`display: flex;`
    ).toThrowErrorMatchingSnapshot()
  })
})
