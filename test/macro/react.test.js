import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import { css, sheet } from '../../src/macro'
import styled from '../../src/react/macro'
import { ThemeProvider, withTheme } from 'theming'

import { lighten, hiDPI, modularScale } from 'polished'

expect.addSnapshotSerializer(serializer(sheet))

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`font-size: 12px;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render', () => {
    const fontSize = 20
    const H1 = styled.h1`font-size: ${fontSize}px;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render with object as style', () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize}px;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`font-size: ${fontSize * 2 / 3}`

    const tree = renderer.create(<H2>hello world</H2>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('component as selector', () => {
    const fontSize = '20px'
    const H1 = styled.h1`font-size: ${fontSize};`

    const Thing = styled.div`
      display: flex;
      .${H1} {
        color: green;
      }
    `

    const tree = renderer
      .create(
        <Thing>
          hello <H1>This will be green</H1> world
        </Thing>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize};
    `

    const H2 = styled(H1)`font-size: ${({ scale }) => fontSize * scale};`

    const tree = renderer.create(<H2 scale={2}>hello world</H2>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composes', () => {
    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      composes: ${cssA};
      height: 64px;
    `

    const H1 = styled('h1')`
      composes: ${cssB};
      font-size: ${fontSize};
    `

    const H2 = styled(H1)`font-size:32px;`

    const tree = renderer.create(<H2 scale={2}>hello world</H2>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composes with objects', () => {
    const cssA = {
      color: lighten(0.2, '#000'),
      'font-size': modularScale(1),
      [hiDPI(1.5).replace('\n', ' ').trim()]: {
        'font-size': modularScale(1.25)
      }
    }

    const cssB = css`
      composes: ${cssA};
      height: 64px;
    `

    const H1 = styled('h1')`
      composes: ${cssB};
      font-size: ${modularScale(4)};
    `

    const H2 = styled(H1)`font-size:32px;`

    const tree = renderer.create(<H2 scale={2}>hello world</H2>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('innerRef', () => {
    const H1 = styled.h1`font-size: 12px;`

    const refFunction = jest.fn()

    const tree = renderer
      .create(<H1 innerRef={refFunction}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(refFunction).toBeCalled()
  })

  test('themes', () => {
    const theme = {
      white: '#f8f9fa',
      purple: '#8c81d8',
      gold: '#ffd43b'
    }

    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      composes: ${cssA};
      height: 64px;
    `

    const Heading = withTheme(styled('span')`
      background-color: ${p => p.theme.gold};
    `)

    const H1 = withTheme(styled(Heading)`
      composes: ${cssB};
      font-size: ${fontSize};
      color: ${p => p.theme.purple};
    `)

    const H2 = styled(H1)`font-size:32px;`
    const refFunction = jest.fn()
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H2 scale={2} ref={refFunction}>
            hello world
          </H2>
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = styled('div')`
      font-size: ${fontSize}px;
    `

    const squirtleBlueBackground = css`
      background-color: #7FC8D6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        composes: ${squirtleBlueBackground};
        background-color: '#343a40';
        flex-direction: column;
      `

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    // expect(ColumnContent.displayName).toMatchSnapshotWithGlamor()

    const tree = renderer.create(<ColumnContent />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composes based on props', () => {
    const cssA = css`
      color: blue;
    `

    const cssB = css`
      color: green;
    `

    const H1 = styled('h1')`
      composes: ${props => {
        return props.a ? cssA : cssB
      }};
    `

    const tree = renderer.create(<H1 a>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
    const tree2 = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree2).toMatchSnapshot()
  })

  test('objects', () => {
    const H1 = styled('h1')('some-class', { padding: 10 }, props => ({
      display: props.display
    }))
    const tree = renderer.create(<H1 display="flex">hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', () => {
    expect(
      () => styled(undefined)`display: flex;`
    ).toThrowErrorMatchingSnapshot()
  })
})
