import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import * as renderer from 'react-test-renderer'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import hoistNonReactStatics from 'hoist-non-react-statics'

describe('styled', () => {
  test('no dynamic', async () => {
    const H1 = styled.h1`
      float: left;
    `

    const tree = (
      await act(() => renderer.create(<H1>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render', async () => {
    const fontSize = 20
    const H1 = styled.h1`
      color: blue;
      font-size: ${fontSize + 'px'};
      @media (min-width: 420px) {
        color: blue;
      }
    `

    const tree = (
      await act(() => renderer.create(<H1>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render with object as style', async () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const tree = (
      await act(() => renderer.create(<H1>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('object as style', async () => {
    const H1 = styled.h1(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const tree = (
      await act(() =>
        renderer.create(
          <H1 fontSize={20} flex={1}>
            hello world
          </H1>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('inline function return value is a function', async () => {
    const fontSize = () => 20
    const Blue = styled('h1')`
      font-size: ${() => fontSize}px;
    `

    const tree = (
      await act(() => renderer.create(<Blue>hello world</Blue>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', async () => {
    const fontSize = 20
    const Div = styled('div')`
      font-size: ${fontSize}px;
    `

    const tree = (
      await act(() => renderer.create(<Div>hello world</Div>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('nested', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <Thing>
            hello <H1>This will be green</H1> world
          </Thing>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('random expressions undefined return', async () => {
    const H1 = styled('h1')`
      ${props =>
        props.prop &&
        css`
          font-size: 1rem;
        `};
      color: green;
    `

    const tree = (
      await act(() =>
        renderer.create(<H1 className={'legacy__class'}>hello world</H1>)
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('random object expression', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <H1 className={'legacy__class'} prop>
            hello world
          </H1>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder', async () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `
    const tree = (
      await act(() => renderer.create(<Input>hello world</Input>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder object', async () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const tree = (
      await act(() => renderer.create(<Input>hello world</Input>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <H1 className={'legacy__class'} theme={{ blue: 'blue' }}>
            hello world
          </H1>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', async () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${({ scale }) => fontSize * scale + 'px'};
    `

    const tree = (
      await act(() =>
        renderer.create(
          <H2 scale={2} className={'legacy__class'}>
            hello world
          </H2>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('ref', async () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const refFunction = jest.fn()

    const tree = (
      await act(() => renderer.create(<H1 ref={refFunction}>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
    expect(refFunction).toBeCalled()
  })

  test('composition based on props', async () => {
    const cssA = css`
      color: blue;
    `

    const cssB = css`
      color: green;
    `

    const H1 = styled('h1')`
      ${props => (props.a ? cssA : cssB)};
    `

    const tree = (
      await act(() => renderer.create(<H1 a>hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
    const tree2 = (
      await act(() => renderer.create(<H1>hello world</H1>))
    ).toJSON()

    expect(tree2).toMatchSnapshot()
  })

  test('objects', async () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display
    }))
    const tree = (
      await act(() => renderer.create(<H1 display="flex">hello world</H1>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('objects with spread properties', async () => {
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({ ...defaultText })
    const tree = (
      await act(() => renderer.create(<Figure>hello world</Figure>))
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('with higher order component that hoists statics', async () => {
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
    const tree = (await act(() => renderer.create(<FinalComponent />))).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', async () => {
    expect(
      () => styled(undefined)`
        display: flex;
      `
    ).toThrowErrorMatchingSnapshot()
  })

  test('function that function returns gets called with props', async () => {
    const SomeComponent = styled.div`
      color: ${() => props => props.color};
      background-color: yellow;
    `
    const tree = (
      await act(() => renderer.create(<SomeComponent color="hotpink" />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('withComponent carries styles from flattened components', async () => {
    const SomeComponent = styled.div`
      color: green;
    `
    const AnotherComponent = styled(SomeComponent)`
      color: hotpink;
    `
    const OneMoreComponent = AnotherComponent.withComponent('p')
    const tree = (
      await act(() => renderer.create(<OneMoreComponent />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('withComponent will replace tags but keep styling classes', async () => {
    const Title = styled('h1')`
      color: green;
    `
    const Subtitle = Title.withComponent('h2')

    const tree = (
      await act(() =>
        renderer.create(
          <article>
            <Title>My Title</Title>
            <Subtitle>My Subtitle</Subtitle>
          </article>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('withComponent with function interpolation', async () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
    `
    const Subtitle = Title.withComponent('h2')

    const tree = (
      await act(() =>
        renderer.create(
          <article>
            <Title>My Title</Title>
            <Subtitle color="hotpink">My Subtitle</Subtitle>
          </article>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('name with class component', async () => {
    class SomeComponent extends React.Component /* <{ className: string }> */ {
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
