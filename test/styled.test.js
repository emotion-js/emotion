/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
// eslint-disable-next-line no-unused-vars
import css, { fragment } from '../lib/index'
import { styled } from '../lib/styled'

describe('glam react', () => {
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

    expect(tree).toMatchSnapshot()
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

    expect(tree).toMatchSnapshot()
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

    expect(tree).toMatchSnapshot()
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

    expect(tree).toMatchSnapshot()
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

    expect(tree).toMatchSnapshot()
  })

  test('fragments', () => {
    const fontSize = 20

    const fragA = fragment`
      color: ${({ color }) => color};
    `

    const fragB = fragment`
      height: ${({ height }) => height}px;
      @apply ${fragA}
    `

    const H1 = styled('h1')`
      font-size: ${fontSize}px;
      @apply ${fragB}
    `

    const H2 = styled(H1)`font-size: ${({ scale }) => fontSize * scale}`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        flex-direction: column;
      `
      NewComponent.displayName = `flexColumn${Component.displayName}`

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    expect(ColumnContent.displayName).toBe('flexColumnundefined')

    const tree = renderer.create(<ColumnContent />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
