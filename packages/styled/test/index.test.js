// @flow
import 'test-utils/legacy-env'
import React from 'react'
import * as renderer from 'react-test-renderer'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import hoistNonReactStatics from 'hoist-non-react-statics'

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`
      float: left;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render', () => {
    const fontSize = 20
    const H1 = styled.h1`
      color: blue;
      font-size: ${fontSize + 'px'};
      @media (min-width: 420px) {
        color: blue;
      }
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

  test('object as style', () => {
    const H1 = styled.h1(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const tree = renderer
      .create(
        <H1 fontSize={20} flex={1}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('inline function return value is a function', () => {
    const fontSize = () => 20
    const Blue = styled('h1')`
      font-size: ${() => fontSize}px;
    `

    const tree = renderer.create(<Blue>hello world</Blue>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const Div = styled('div')`
      font-size: ${fontSize}px;
    `

    const tree = renderer.create(<Div>hello world</Div>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('nested', () => {
    const fontSize = '20px'
    const H1 = styled.h1`
      font-size: ${fontSize};
    `

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

  test('random expressions undefined return', () => {
    const H1 = styled('h1')`
      ${props =>
        props.prop &&
        css`
          font-size: 1rem;
        `};
      color: green;
    `

    const tree = renderer
      .create(<H1 className={'legacy__class'}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('random object expression', () => {
    const margin = (t, r, b, l) => {
      return props => ({
        marginTop: t,
        marginRight: r,
        marginBottom: b,
        marginLeft: l
      })
    }
    const H1 = styled.h1`
      background-color: hotpink;
      ${props => props.prop && { fontSize: '1rem' }};
      ${margin(0, 'auto', 0, 'auto')};
      color: green;
    `

    const tree = renderer
      .create(
        <H1 className={'legacy__class'} prop>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder', () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `
    const tree = renderer.create(<Input>hello world</Input>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder object', () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const tree = renderer.create(<Input>hello world</Input>).toJSON()

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

  test('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${({ scale }) => fontSize * scale + 'px'};
    `

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('ref', () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const refFunction = jest.fn()

    const tree = renderer
      .create(<H1 ref={refFunction}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(refFunction).toBeCalled()
  })

  test('composition based on props', () => {
    const cssA = css`
      color: blue;
    `

    const cssB = css`
      color: green;
    `

    const H1 = styled('h1')`
      ${props => (props.a ? cssA : cssB)};
    `

    const tree = renderer.create(<H1 a>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
    const tree2 = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree2).toMatchSnapshot()
  })

  test('objects', () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display
    }))
    const tree = renderer.create(<H1 display="flex">hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('objects with spread properties', () => {
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({ ...defaultText })
    const tree = renderer.create(<Figure>hello world</Figure>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('with higher order component that hoists statics', () => {
    const superImportantValue = 'hotpink'
    const hoc = BaseComponent => {
      const NewComponent = props => (
        <BaseComponent someProp={superImportantValue} {...props} />
      )
      return hoistNonReactStatics(NewComponent, BaseComponent)
    }
    const SomeComponent = hoc(styled.div`
      display: flex;
      color: ${props => props.someProp};
    `)
    const FinalComponent = styled(SomeComponent)`
      padding: 8px;
    `
    const tree = renderer.create(<FinalComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', () => {
    expect(
      () =>
        // $FlowFixMe
        styled(undefined)`
          display: flex;
        `
    ).toThrowErrorMatchingSnapshot()
  })

  test('function that function returns gets called with props', () => {
    const SomeComponent = styled.div`
      color: ${() => props => props.color};
      background-color: yellow;
    `
    const tree = renderer.create(<SomeComponent color="hotpink" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('withComponent carries styles from flattened components', () => {
    const SomeComponent = styled.div`
      color: green;
    `
    const AnotherComponent = styled(SomeComponent)`
      color: hotpink;
    `
    const OneMoreComponent = AnotherComponent.withComponent('p')
    const tree = renderer.create(<OneMoreComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should forward .defaultProps when reusing __emotion_base', () => {
    const Title = styled('h1')`
      text-align: center;
      ${props => ({
        color: props.color
      })};
    `

    Title.defaultProps = {
      color: 'red'
    }

    const Title2 = styled(Title)`
      font-style: italic;
    `

    const tree = renderer
      .create(
        <div>
          <Title />
          <Title2 />
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('withComponent will replace tags but keep styling classes', () => {
    const Title = styled('h1')`
      color: green;
    `
    const Subtitle = Title.withComponent('h2')

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Subtitle>My Subtitle</Subtitle>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('withComponent with function interpolation', () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
    `
    const Subtitle = Title.withComponent('h2')

    const tree = renderer
      .create(
        <article>
          <Title>My Title</Title>
          <Subtitle color="hotpink">My Subtitle</Subtitle>
        </article>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('name with class component', () => {
    class SomeComponent extends React.Component<{ className: string }> {
      render() {
        return <div className={this.props.className} />
      }
    }
    const StyledComponent = styled(SomeComponent)`
      color: hotpink;
    `
    expect(StyledComponent.displayName).toBe(`StyledComponent`)
  })
})
