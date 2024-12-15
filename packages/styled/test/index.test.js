import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import hoistNonReactStatics from 'hoist-non-react-statics'

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`
      float: left;
    `

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('basic render with object as style', () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('object as style', () => {
    const H1 = styled.h1(
      props => ({
        fontSize: props.fontSize
      }),
      props => ({ flex: props.flex }),
      { display: 'flex' }
    )

    const { container } = render(
      <H1 fontSize={20} flex={1}>
        hello world
      </H1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('inline function return value is a function', () => {
    const fontSize = () => 20
    const Blue = styled('h1')`
      font-size: ${() => fontSize}px;
    `

    const { container } = render(<Blue>hello world</Blue>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const Div = styled('div')`
      font-size: ${fontSize}px;
    `

    const { container } = render(<Div>hello world</Div>)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <Thing>
        hello <H1>This will be green</H1> world
      </Thing>
    )

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'}>hello world</H1>
    )

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'} prop>
        hello world
      </H1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('input placeholder', () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `
    const { container } = render(
      <Input value="hello world" onChange={() => {}} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('input placeholder object', () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const { container } = render(
      <Input value="hello world" onChange={() => {}} />
    )

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'} theme={{ blue: 'blue' }}>
        hello world
      </H1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${({ scale }) => fontSize * scale + 'px'};
    `

    const { container } = render(
      <H2 scale={2} className={'legacy__class'}>
        hello world
      </H2>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('ref', () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const refFunction = jest.fn()

    const { container } = render(<H1 ref={refFunction}>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container: container1 } = render(<H1 a>hello world</H1>)

    expect(container1.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<H1>hello world</H1>)

    expect(container2.firstChild).toMatchSnapshot()
  })

  test('objects', () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display
    }))
    const { container } = render(<H1 display="flex">hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('objects with spread properties', () => {
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({ ...defaultText })
    const { container } = render(<Figure>hello world</Figure>)

    expect(container.firstChild).toMatchSnapshot()
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
    const { container } = render(<FinalComponent />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', () => {
    expect(
      () => styled(undefined)`
        display: flex;
      `
    ).toThrowErrorMatchingSnapshot()
  })

  test('function that function returns gets called with props', () => {
    const SomeComponent = styled.div`
      color: ${() => props => props.color};
      background-color: yellow;
    `
    const { container } = render(<SomeComponent color="hotpink" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('withComponent carries styles from flattened components', () => {
    const SomeComponent = styled.div`
      color: green;
    `
    const AnotherComponent = styled(SomeComponent)`
      color: hotpink;
    `
    const OneMoreComponent = AnotherComponent.withComponent('p')
    const { container } = render(<OneMoreComponent />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('withComponent will replace tags but keep styling classes', () => {
    const Title = styled('h1')`
      color: green;
    `
    const Subtitle = Title.withComponent('h2')

    const { container } = render(
      <article>
        <Title>My Title</Title>
        <Subtitle>My Subtitle</Subtitle>
      </article>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  test('withComponent with function interpolation', () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
    `
    const Subtitle = Title.withComponent('h2')

    const { container } = render(
      <article>
        <Title>My Title</Title>
        <Subtitle color="hotpink">My Subtitle</Subtitle>
      </article>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('name with class component', () => {
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
