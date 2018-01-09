import React from 'react'
import renderer from 'react-test-renderer'
import styled, { css, flush, sheet } from 'react-emotion'

import { hiDPI, lighten, modularScale } from 'polished'

describe('styled with autoLabel', () => {
  beforeEach(() => flush())
  test('composition', () => {
    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      ${cssA};
      color: red;
    `

    const BlueH1 = styled('h1')`
      ${cssB};
      color: blue;
      font-size: ${fontSize};
    `

    const FinalH2 = styled(BlueH1)`
      font-size: 32px;
    `

    const tree = renderer
      .create(
        <FinalH2 scale={2} className={'legacy__class'}>
          hello world
        </FinalH2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('composition with objects', () => {
    const cssA = {
      color: lighten(0.2, '#000'),
      fontSize: modularScale(1),
      [hiDPI(1.5)
        .replace('\n', ' ')
        .trim()]: { fontSize: modularScale(1.25) },
    }

    const cssB = css`
      ${cssA};
      height: 64px;
    `

    const H1 = styled('h1')`
      ${cssB};
      font-size: ${modularScale(4)};
    `

    const H2 = styled(H1)`
      font-size: 32px;
    `

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = css`
      background-color: #7fc8d6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        ${squirtleBlueBackground};
        background-color: '#343a40';
        flex-direction: column;
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    const tree = renderer.create(<ColumnContent />).toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('displayName', () => {
    const SomeComponent = styled.div`
      color: hotpink;
    `
    expect(SomeComponent.displayName).toBe('SomeComponent')
  })
})
