/** @jsx jsx */
import 'test-utils/setup-env'
import { render } from '@testing-library/react'
import { act } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import styled from '@emotion/styled'
import { jsx, keyframes, css, ThemeProvider } from '@emotion/react'

describe('styled', () => {
  test('no dynamic', async () => {
    const H1 = styled.h1`
      float: left;
    `

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('basic render with object as style', async () => {
    const fontSize = 20
    const H1 = styled.h1({ fontSize })

    const { container } = render(<H1>hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('object as style', async () => {
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

  test('object as className', async () => {
    const myclass = { toString: () => 'myclass' }
    const Comp = styled.div``

    const { container } = render(<Comp className={myclass} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('glamorous style api & composition', async () => {
    const H1 = styled.h1(props => ({ fontSize: props.fontSize }))
    const H2 = styled(H1)(props => ({ flex: props.flex }), {
      display: 'flex'
    })

    const { container } = render(
      <H2 fontSize={20} flex={1}>
        hello world
      </H2>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('inline function return value is a function', async () => {
    const fontSize = () => 20
    const Blue = styled('h1')`
      font-size: ${() => fontSize}px;
    `

    const { container } = render(<Blue>hello world</Blue>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('call expression', async () => {
    const fontSize = 20
    const Div = styled('div')`
      font-size: ${fontSize}px;
    `

    const { container } = render(<Div>hello world</Div>)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <Thing>
        hello <H1>This will be green</H1> world
      </Thing>
    )

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'}>hello world</H1>
    )

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'} prop>
        hello world
      </H1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('composition', async () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${(fontSize * 2) / 3 + 'px'};
    `

    const { container } = render(
      <H2 className={'legacy__class'}>hello world</H2>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('input placeholder', async () => {
    const Input = styled.input`
      ::placeholder {
        background-color: green;
      }
    `
    const { container } = render(<Input value="hello world" />)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('input placeholder object', async () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green'
      }
    })

    const { container } = render(<Input value="hello world" />)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('object composition', async () => {
    const imageStyles = css({ width: 96, height: 96 })

    css([{ color: 'blue' }])

    const red = css([{ color: 'red' }])

    const blue = css([red, { color: 'blue' }])

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
      ${prettyStyles};
      ${imageStyles};
      ${blue};
    `

    const { container } = render(<Avatar />)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(
      <H1 className={'legacy__class'} theme={{ blue: 'blue' }}>
        hello world
      </H1>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('function in expression', async () => {
    const fontSize = 20
    const H1 = styled('h1', { label: 'H1' })`
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

  test('composition', async () => {
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

    const { container } = render(
      <FinalH2 scale={2} className={'legacy__class'}>
        hello world
      </FinalH2>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('higher order component', async () => {
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

    const { container } = render(<ColumnContent />)

    expect(container.firstChild).toMatchSnapshot()
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

    const { container: container1 } = render(<H1 a>hello world</H1>)

    expect(container1.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<H1>hello world</H1>)

    expect(container2.firstChild).toMatchSnapshot()
  })

  test('composition of nested pseudo selectors', async () => {
    const defaultLinkStyles = {
      '&:hover': {
        color: 'blue',
        '&:active': {
          color: 'red'
        }
      }
    }

    const buttonStyles = () => ({
      ...defaultLinkStyles,
      fontSize: '2rem',
      padding: 16
    })

    const Button = styled('button')(buttonStyles)

    const { container } = render(
      <Button
        css={css({
          '&:hover': {
            color: 'pink',
            '&:active': {
              color: 'purple'
            },
            '&.some-class': {
              color: 'yellow'
            }
          }
        })}
      >
        Should be purple
      </Button>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('objects', async () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display
    }))
    const { container } = render(<H1 display="flex">hello world</H1>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('objects with spread properties', async () => {
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({ ...defaultText })
    const { container } = render(<Figure>hello world</Figure>)

    expect(container.firstChild).toMatchSnapshot()
  })

  test('composing components', async () => {
    const Button = styled.button`
      color: green;
    `
    const OtherButton = styled(Button)`
      display: none;
    `

    const AnotherButton = styled(OtherButton)`
      display: flex;
      justify-content: center;
    `
    const { container } = render(<AnotherButton>hello world</AnotherButton>)

    expect(container.firstChild).toMatchSnapshot()
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
    const { container } = render(<FinalComponent />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('prop filtering', async () => {
    const Link = styled.a`
      color: green;
    `
    const rest = { m: [3], pt: [4] }

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
        {...rest}
      >
        hello world
      </Link>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  test('no prop filtering on non string tags', async () => {
    const Link = styled(props => <a {...props} />)`
      color: green;
    `

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
      >
        hello world
      </Link>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('no prop filtering on string tags started with upper case', async () => {
    const Link = styled('SomeCustomLink')`
      color: green;
    `

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
      >
        hello world
      </Link>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('prop filtering on composed styled components that are string tags', async () => {
    const BaseLink = styled.a`
      background-color: hotpink;
    `
    const Link = styled(BaseLink)`
      color: green;
    `

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
      >
        hello world
      </Link>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('throws if undefined is passed as the component', async () => {
    expect(
      () => styled(undefined)`
        display: flex;
      `
    ).toThrowErrorMatchingSnapshot()
  })
  test('withComponent will replace tags but keep styling classes', async () => {
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
  test('withComponent with function interpolation', async () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
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

  test('withComponent does carry styles from flattened component', async () => {
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

  test('theming', async () => {
    const Div = styled.div`
      color: ${props => props.theme.primary};
    `
    const { container } = render(
      <ThemeProvider theme={{ primary: 'hotpink' }}>
        <Div>this should be hotpink</Div>
      </ThemeProvider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('same component rendered multiple times', async () => {
    const SomeComponent = styled.div`
      color: green;
    `

    const { container } = render(<SomeComponent />)
    expect(container.firstChild).toMatchSnapshot()
    expect(
      render(
        <SomeComponent>
          <SomeComponent />
          <SomeComponent />
        </SomeComponent>
      ).container.firstChild
    ).toMatchSnapshot()
  })
  test('component selectors', async () => {
    let Target = styled('div', {
      // if anyone is looking this
      // please don't do this.
      // use the babel plugin/macro.
      target: 'e322f2d3tbrgf2e0'
    })`
      color: hotpink;
    `
    let SomeComponent = styled.div`
      color: green;
      ${Target.toString()} {
        color: yellow;
      }
    `
    expect(
      render(
        <SomeComponent>
          <Target />
        </SomeComponent>
      ).container.firstChild
    ).toMatchSnapshot()
  })
  test('keyframes with css call', async () => {
    let SomeComp = styled.div(css`
      animation: ${keyframes({
        'from,to': { color: 'green' },
        '50%': { color: 'hotpink' }
      })};
    `)
    expect(render(<SomeComp />).container.firstChild).toMatchSnapshot()
  })
})
