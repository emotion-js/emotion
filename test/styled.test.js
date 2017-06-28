/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from '../jest-utils'

// eslint-disable-next-line no-unused-vars
import css, { fragment } from '../src/index'
import styled from '../src/styled'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const tree = renderer
      .create(
        <H1>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('basic render', () => {
    const fontSize = 20
    const H1 = styled.h1`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('name', () => {
    const fontSize = 20
    const H1 = styled.h1`
      name: FancyH1;
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1>
          hello world
        </H1>
      )
      .toJSON()

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

  test('call expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1 className={'legacy__class'}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize}px;
    `

    const H2 = styled(H1)`font-size: ${fontSize * 2 / 3}`

    const tree = renderer
      .create(
        <H2 className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize}px;
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

  test('fragments', () => {
    const fontSize = 20

    const fragA = fragment`
      color: blue;
    `

    const fragB = fragment`
      height: 64px;
      @apply ${fragA}
    `

    const H1 = styled('h1')`
      font-size: ${fontSize}px;
      @apply ${fragB};
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

  test('innerRef', () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const refFunction = jest.fn()

    const tree = renderer
      .create(
        <H1 innerRef={refFunction}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
    expect(refFunction).toBeCalled()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = fragment`
      name: squirtle-blue-bg;
      background-color: #7FC8D6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        name: onyx;
        background-color: '#343a40';
        flex-direction: column;
        @apply ${squirtleBlueBackground};
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    // expect(ColumnContent.displayName).toMatchSnapshotWithEmotion()

    const tree = renderer.create(<ColumnContent />).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })
})
