/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { basename } from 'path'
import { matcher, serializer } from '../../jest-utils'
import { injectGlobal, css } from '../../src/index'
import styled from '../../src/react'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`font-size: 12px;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('basic render', () => {
    const fontSize = '20px'
    const H1 = styled.h1`font-size: ${fontSize};`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('name', () => {
    const fontSize = '20px'
    const H1 = styled.h1`
      name: FancyH1;
      font-size: ${fontSize};
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('attr', () => {
    const H1 = styled.h1`
      font-size: attr(fontSize);
      margin: attr(margin rem, 4);
    `

    const Title = ({ title }) => {
      return (
        <H1 fontSize={48}>
          {title}
        </H1>
      )
    }

    const tree = renderer.create(<Title />).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('another attr', () => {
    const PlaygroundWrapper = styled('div')`
      color: attr(color, #343a40);
    `
    expect(renderer.create(<PlaygroundWrapper />).toJSON()).toMatchSnapshotWithEmotion()
  })

  test('call expression', () => {
    const fontSize = '20px'
    const H1 = styled('h1')`
      font-size: ${fontSize};
    `

    const tree = renderer
      .create(<H1 className={'legacy__class'}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`font-size: ${fontSize * 2 / 3 + 'px'}`

    const tree = renderer
      .create(<H2 className={'legacy__class'}>hello world</H2>)
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('function in expression', () => {
    const fontSize = '20px'
    const H1 = styled('h1')`
      font-size: ${fontSize};
    `

    const H2 = styled(H1)`font-size: ${({ scale }) => fontSize * scale}`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('composes', () => {
    const fontSize = '20px'

    const cls1 = css`
      color: blue;
    `

    const cls2 = css`
      composes: ${cls1};
      height: 64px;
    `

    const H1 = styled('h1')`
      composes: ${cls2};
      font-size: ${fontSize};
    `

    const H2 = styled(H1)`font-size:32px;`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('higher order component', () => {
    const fontSize = '20px'
    const Content = styled('div')`
      font-size: ${fontSize};
    `

    const squirtleBlueBackground = css`
      name: squirtle-blue-bg;
      background-color: #7FC8D6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        composes: ${squirtleBlueBackground};
        name: onyx;
        background-color: '#343a40';
        flex-direction: column;
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    // expect(ColumnContent.displayName).toMatchSnapshotWithEmotion()

    const tree = renderer.create(<ColumnContent />).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })
  test('injectGlobal', () => {
    injectGlobal`
      html {
        background: pink;
      }
    `
  })
  test('css', () => {
    expect(css`
      font-family: sans-serif;
      color: yellow;
      background-color: purple;
    `)
  })
  test('writes the correct css', () => {
    const filenameArr = basename(__filename).split('.')
    filenameArr.pop()
    filenameArr.push('emotion', 'css')
    const cssFilename = filenameArr.join('.')
    expect(global.mockedCssImports[cssFilename]).toMatchSnapshot()
  })
})
