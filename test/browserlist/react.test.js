/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import { css, sheet } from '../../src/index'
import styled from '../../src/react'
import { ThemeProvider } from '../../src/react/theming'
import { mount } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'

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
    const H1 = styled.h1`
      color: blue;
      font-size: ${fontSize};
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render with object as style', () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('name', () => {
    const fontSize = 20
    const H1 = styled.h1`
      name: FancyH1;
      font-size: ${fontSize}px;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(<H1 className={'legacy__class'}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('nested', () => {
    const fontSize = '20px'
    const H1 = styled.h1`font-size: ${fontSize};`

    const Thing = styled.div`
      display: flex;
      & div {
        color: green;
        
        & span {
          color: red;
        }
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

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`font-size: ${fontSize * 2 / 3}`

    const tree = renderer
      .create(<H2 className={'legacy__class'}>hello world</H2>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder', () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `
    const tree = renderer
      .create(<Input>hello world</Input>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder object', () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const tree = renderer
      .create(<Input>hello world</Input>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('object composition', () => {
    const imageStyles = css({
      width: 96,
      height: 96
    })

    const fakeBlue = css([
      {
        color: 'blue'
      }
    ])

    const red = css([
      {
        color: 'red'
      }
    ])

    const blue = css([
      red,
      {
        color: 'blue'
      }
    ])

    const prettyStyles = css([
      {
        borderRadius: '50%',
        transition: 'transform 400ms ease-in-out',
        ':hover': {
          transform: 'scale(1.2)'
        }
      },
      { border: '3px solid currentColor' }
    ])

    const Avatar = styled('img')`
      composes: ${prettyStyles} ${imageStyles} ${blue}
    `

    const tree = renderer.create(<Avatar />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', () => {
    const H1 = styled('h1')`
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
      border-left: ${p => p.theme.blue};
    `

    const tree = renderer
      .create(
        <H1 className={'legacy__class'} theme={{ blue: 'blue' }}>
          hello world
        </H1>
      )
      .toJSON()

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
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`font-size: ${({ scale }) => fontSize * scale + 'px'}`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composes', () => {
    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      composes: ${cssA}
      color: red;
    `

    const BlueH1 = styled('h1')`
      composes: ${cssB};
      color: blue;
      font-size: ${fontSize};
    `

    const FinalH2 = styled(BlueH1)`font-size:32px;`

    const tree = renderer
      .create(
        <FinalH2 scale={2} className={'legacy__class'}>
          hello world
        </FinalH2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composes with objects', () => {
    const cssA = {
      color: lighten(0.2, '#000'),
      fontSize: modularScale(1),
      [hiDPI(1.5).replace('\n', ' ').trim()]: {
        fontSize: modularScale(1.25)
      }
    }

    const cssB = css`
      composes: ${cssA}
      height: 64px;
    `

    const H1 = styled('h1')`
      composes: ${cssB}
      font-size: ${modularScale(4)};
    `

    const H2 = styled(H1)`font-size:32px;`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

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
      composes: ${cssA}
      height: 64px;
    `

    const Heading = styled('span')`
      background-color: ${p => p.theme.gold};
    `

    const H1 = styled(Heading)`
      composes: ${cssB}
      font-size: ${fontSize};
      color: ${p => p.theme.purple}
    `

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
      name: squirtle-blue-bg;
      background-color: #7FC8D6;
    `

    const flexColumn = Component => {
      const NewComponent = styled(Component)`
        composes: ${squirtleBlueBackground}
        name: onyx;
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
      composes: ${props => (props.a ? cssA : cssB)}
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
    const tree = renderer.create(<H1 display='flex'>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test.only('prefixing', () => {
    const Div = styled.div`
      display: flex;
    `
    const tree = renderer.create(<Div>hello world</Div>).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('change theme', () => {
    const Div = styled.div`
      color: ${props => props.theme.primary}
    `
    const TestComponent = (props) => (<ThemeProvider theme={props.theme}>{props.renderChild ? <Div>this will be green then pink</Div> : null}</ThemeProvider>)
    const wrapper = mount(<TestComponent renderChild theme={{ primary: 'green' }} />)
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ theme: { primary: 'pink' } })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ renderChild: false })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
  })
  test('throws if undefined is passed as the component', () => {
    expect(
      () => styled(undefined)`display: flex;`
    ).toThrowErrorMatchingSnapshot()
  })
})
