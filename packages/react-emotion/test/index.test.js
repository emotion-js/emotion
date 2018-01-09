// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import styled, { css, flush } from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { mount } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'

import { lighten, hiDPI, modularScale } from 'polished'

describe('styled', () => {
  beforeEach(() => flush())
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
        fontSize: props.fontSize,
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

  test('glamorous style api & composition', () => {
    const H1 = styled.h1(props => ({ fontSize: props.fontSize }))
    const H2 = styled(H1)(props => ({ flex: props.flex }), { display: 'flex' })

    const tree = renderer
      .create(
        <H2 fontSize={20} flex={1}>
          hello world
        </H2>
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

  test.skip('random expressions', () => {
    const margin = (t, r, b, l) => {
      return props => css`
        margin-top: ${t};
        margin-right: ${r};
        margin-bottom: ${b};
        margin-left: ${l};
      `
    }

    const mq = css`
      @media (min-width: 420px) {
        color: blue;
        @media (min-width: 520px) {
          color: green;
        }
      }
    `

    const H1 = styled('h1')`
      ${mq};
      ${props =>
        props.prop &&
        css`
          font-size: 1rem;
        `};
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
        marginLeft: l,
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

  test('composition', () => {
    const fontSize = 20
    const H1 = styled('h1')`
      font-size: ${fontSize + 'px'};
    `

    const H2 = styled(H1)`
      font-size: ${fontSize * 2 / 3 + 'px'};
    `

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
    const tree = renderer.create(<Input>hello world</Input>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('input placeholder object', () => {
    const Input = styled('input')({
      '::placeholder': {
        backgroundColor: 'green',
      },
    })

    const tree = renderer.create(<Input>hello world</Input>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('object composition', () => {
    const imageStyles = css({ width: 96, height: 96 })

    css([{ color: 'blue' }])

    const red = css([{ color: 'red' }])

    const blue = css([red, { color: 'blue' }])

    const prettyStyles = css([
      {
        borderRadius: '50%',
        transition: 'transform 400ms ease-in-out',
        ':hover': {
          transform: 'scale(1.2)',
        },
      },
      { border: '3px solid currentColor' },
    ])

    const Avatar = styled('img')`
      ${prettyStyles};
      ${imageStyles};
      ${blue};
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
  })

  test('innerRef', () => {
    const H1 = styled.h1`
      font-size: 12px;
    `

    const refFunction = jest.fn()

    const tree = renderer
      .create(<H1 innerRef={refFunction}>hello world</H1>)
      .toJSON()

    expect(tree).toMatchSnapshot()
    expect(refFunction).toBeCalled()
  })

  test('themes', () => {
    const theme = { white: '#f8f9fa', purple: '#8c81d8', gold: '#ffd43b' }

    const fontSize = '20px'

    const cssA = css`
      color: blue;
    `

    const cssB = css`
      ${cssA};
      height: 64px;
    `

    const Heading = styled('span')`
      background-color: ${p => p.theme.gold};
    `

    const H1 = styled(Heading)`
      ${cssB};
      font-size: ${fontSize};
      color: ${p => p.theme.purple};
    `

    const H2 = styled(H1)`
      font-size: 32px;
    `

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <H2>hello world</H2>
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

  test('composition of nested pseudo selectors', () => {
    const defaultLinkStyles = {
      '&:hover': {
        color: 'blue',
        '&:active': {
          color: 'red',
        },
      },
    }

    const buttonStyles = () => ({
      ...defaultLinkStyles,
      fontSize: '2rem',
      padding: 16,
    })

    const Button = styled('button')(buttonStyles)

    const tree = renderer
      .create(
        <Button
          className={css({
            '&:hover': {
              color: 'pink',
              '&:active': {
                color: 'purple',
              },
              '&.some-class': {
                color: 'yellow',
              },
            },
          })}
        >
          Should be purple
        </Button>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('objects', () => {
    const H1 = styled('h1')({ padding: 10 }, props => ({
      display: props.display,
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

  test('composing components', () => {
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
    const tree = renderer
      .create(<AnotherButton>hello world</AnotherButton>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('theme with react-test-renderer', () => {
    const Div = styled.div`
      color: ${props => props.theme.primary};
    `
    const tree = renderer
      .create(
        <ThemeProvider theme={{ primary: 'pink' }}>
          {<Div>this will be pink</Div>}
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('change theme', () => {
    const Div = styled.div`
      color: ${props => props.theme.primary};
    `
    const TestComponent = props => (
      <ThemeProvider theme={props.theme}>
        {props.renderChild ? <Div>this will be green then pink</Div> : null}
      </ThemeProvider>
    )
    const wrapper = mount(
      <TestComponent renderChild theme={{ primary: 'green' }} />
    )
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ theme: { primary: 'pink' } })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ renderChild: false })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
  })

  test('theming', () => {
    const Div = styled.div`
      color: ${props => props.theme.color};
    `
    const TestComponent = props => (
      <ThemeProvider theme={props.theme}>
        {props.renderChild ? <Div>this will be green then pink</Div> : null}
      </ThemeProvider>
    )
    const wrapper = mount(
      <TestComponent renderChild theme={{ primary: 'green' }} />
    )
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ theme: { primary: 'pink' } })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
    wrapper.setProps({ renderChild: false })
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
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

  test('prop filtering', () => {
    const Link = styled.a`
      color: green;
    `
    const rest = { m: [3], pt: [4] }

    const tree = renderer
      .create(
        <Link
          a
          b
          wow
          prop
          filtering
          is
          cool
          aria-label="some label"
          data-wow="value"
          href="link"
          {...rest}
        >
          hello world
        </Link>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('no prop filtering on non string tags', () => {
    const Link = styled(props => <a {...props} />)`
      color: green;
    `

    const tree = renderer
      .create(
        <Link
          a
          b
          wow
          prop
          filtering
          is
          cool
          aria-label="some label"
          data-wow="value"
          href="link"
        >
          hello world
        </Link>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('no prop filtering on string tags started with upper case', () => {
    const Link = styled('SomeCustomLink')`
      color: green;
    `

    const tree = renderer
      .create(
        <Link
          a
          b
          wow
          prop
          filtering
          is
          cool
          aria-label="some label"
          data-wow="value"
          href="link"
        >
          hello world
        </Link>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic SVG attributes survive prop filtering', () => {
    const RedCircle = styled('circle')`
      fill: #ff0000;
      stroke-width: 0.26458332;
    `

    const svg = mount(
      <RedCircle r="9.8273811" cy="49.047619" cx="65.011902" />
    ).find('circle')

    expect(svg.props()).toEqual({
      className: expect.any(String),
      cx: expect.any(String),
      cy: expect.any(String),
      r: expect.any(String),
    })
  })

  test('all SVG attributes survive prop filtering', () => {
    const svgAttributes = {
      accentHeight: 'abcd',
      accumulate: 'abcd',
      additive: 'abcd',
      alignmentBaseline: 'abcd',
      allowReorder: 'abcd',
      alphabetic: 'abcd',
      amplitude: 'abcd',
      arabicForm: 'abcd',
      ascent: 'abcd',
      attributeName: 'abcd',
      attributeType: 'abcd',
      autoReverse: 'abcd',
      azimuth: 'abcd',
      baseFrequency: 'abcd',
      baselineShift: 'abcd',
      baseProfile: 'abcd',
      bbox: 'abcd',
      begin: 'abcd',
      bias: 'abcd',
      by: 'abcd',
      calcMode: 'abcd',
      capHeight: 'abcd',
      clip: 'abcd',
      clipPathUnits: 'abcd',
      clipPath: 'abcd',
      clipRule: 'abcd',
      colorInterpolation: 'abcd',
      colorInterpolationFilters: 'abcd',
      colorProfile: 'abcd',
      colorRendering: 'abcd',
      contentScriptType: 'abcd',
      contentStyleType: 'abcd',
      cursor: 'abcd',
      cx: 'abcd',
      cy: 'abcd',
      d: 'abcd',
      decelerate: 'abcd',
      descent: 'abcd',
      diffuseConstant: 'abcd',
      direction: 'abcd',
      display: 'abcd',
      divisor: 'abcd',
      dominantBaseline: 'abcd',
      dur: 'abcd',
      dx: 'abcd',
      dy: 'abcd',
      edgeMode: 'abcd',
      elevation: 'abcd',
      enableBackground: 'abcd',
      end: 'abcd',
      exponent: 'abcd',
      externalResourcesRequired: 'abcd',
      fill: 'abcd',
      fillOpacity: 'abcd',
      fillRule: 'abcd',
      filter: 'abcd',
      filterRes: 'abcd',
      filterUnits: 'abcd',
      floodColor: 'abcd',
      floodOpacity: 'abcd',
      fontFamily: 'abcd',
      fontSize: 'abcd',
      fontSizeAdjust: 'abcd',
      fontStretch: 'abcd',
      fontStyle: 'abcd',
      fontVariant: 'abcd',
      fontWeight: 'abcd',
      format: 'abcd',
      from: 'abcd',
      // fr: 'abcd', React doesn't seem to allow this on any element but it should be legal on radialGradients
      fx: 'abcd',
      fy: 'abcd',
      g1: 'abcd',
      g2: 'abcd',
      glyphName: 'abcd',
      glyphOrientationHorizontal: 'abcd',
      glyphOrientationVertical: 'abcd',
      glyphRef: 'abcd',
      gradientTransform: 'abcd',
      gradientUnits: 'abcd',
      hanging: 'abcd',
      horizAdvX: 'abcd',
      horizOriginX: 'abcd',
      ideographic: 'abcd',
      imageRendering: 'abcd',
      in: 'abcd',
      in2: 'abcd',
      intercept: 'abcd',
      k: 'abcd',
      k1: 'abcd',
      k2: 'abcd',
      k3: 'abcd',
      k4: 'abcd',
      kernelMatrix: 'abcd',
      kernelUnitLength: 'abcd',
      kerning: 'abcd',
      keyPoints: 'abcd',
      keySplines: 'abcd',
      keyTimes: 'abcd',
      lengthAdjust: 'abcd',
      letterSpacing: 'abcd',
      lightingColor: 'abcd',
      limitingConeAngle: 'abcd',
      local: 'abcd',
      markerEnd: 'abcd',
      markerMid: 'abcd',
      markerStart: 'abcd',
      markerHeight: 'abcd',
      markerUnits: 'abcd',
      markerWidth: 'abcd',
      mask: 'abcd',
      maskContentUnits: 'abcd',
      maskUnits: 'abcd',
      mathematical: 'abcd',
      mode: 'abcd',
      numOctaves: 'abcd',
      offset: 'abcd',
      opacity: 'abcd',
      operator: 'abcd',
      order: 'abcd',
      orient: 'abcd',
      orientation: 'abcd',
      origin: 'abcd',
      overflow: 'abcd',
      overlinePosition: 'abcd',
      overlineThickness: 'abcd',
      panose1: 'abcd',
      paintOrder: 'abcd',
      pathLength: 'abcd',
      patternContentUnits: 'abcd',
      patternTransform: 'abcd',
      patternUnits: 'abcd',
      pointerEvents: 'abcd',
      points: 'abcd',
      pointsAtX: 'abcd',
      pointsAtY: 'abcd',
      pointsAtZ: 'abcd',
      preserveAlpha: 'abcd',
      preserveAspectRatio: 'abcd',
      primitiveUnits: 'abcd',
      r: 'abcd',
      radius: 'abcd',
      refX: 'abcd',
      refY: 'abcd',
      renderingIntent: 'abcd',
      repeatCount: 'abcd',
      repeatDur: 'abcd',
      requiredExtensions: 'abcd',
      requiredFeatures: 'abcd',
      restart: 'abcd',
      result: 'abcd',
      rotate: 'abcd',
      rx: 'abcd',
      ry: 'abcd',
      scale: 'abcd',
      seed: 'abcd',
      shapeRendering: 'abcd',
      slope: 'abcd',
      spacing: 'abcd',
      specularConstant: 'abcd',
      specularExponent: 'abcd',
      speed: 'abcd',
      spreadMethod: 'abcd',
      startOffset: 'abcd',
      stdDeviation: 'abcd',
      stemh: 'abcd',
      stemv: 'abcd',
      stitchTiles: 'abcd',
      stopColor: 'abcd',
      stopOpacity: 'abcd',
      strikethroughPosition: 'abcd',
      strikethroughThickness: 'abcd',
      string: 'abcd',
      stroke: 'abcd',
      strokeDasharray: 'abcd',
      strokeDashoffset: 'abcd',
      strokeLinecap: 'abcd',
      strokeLinejoin: 'abcd',
      strokeMiterlimit: 'abcd',
      strokeOpacity: 'abcd',
      strokeWidth: 'abcd',
      surfaceScale: 'abcd',
      systemLanguage: 'abcd',
      tabIndex: 'abcd',
      tableValues: 'abcd',
      targetX: 'abcd',
      targetY: 'abcd',
      textAnchor: 'abcd',
      textDecoration: 'abcd',
      textRendering: 'abcd',
      textLength: 'abcd',
      to: 'abcd',
      transform: 'abcd',
      u1: 'abcd',
      u2: 'abcd',
      underlinePosition: 'abcd',
      underlineThickness: 'abcd',
      unicode: 'abcd',
      unicodeBidi: 'abcd',
      unicodeRange: 'abcd',
      unitsPerEm: 'abcd',
      vAlphabetic: 'abcd',
      vHanging: 'abcd',
      vIdeographic: 'abcd',
      vMathematical: 'abcd',
      values: 'abcd',
      version: 'abcd',
      vertAdvY: 'abcd',
      vertOriginX: 'abcd',
      vertOriginY: 'abcd',
      viewBox: 'abcd',
      viewTarget: 'abcd',
      visibility: 'abcd',
      widths: 'abcd',
      wordSpacing: 'abcd',
      writingMode: 'abcd',
      x: 'abcd',
      xHeight: 'abcd',
      x1: 'abcd',
      x2: 'abcd',
      xChannelSelector: 'abcd',
      xlinkActuate: 'abcd',
      xlinkArcrole: 'abcd',
      xlinkHref: 'abcd',
      xlinkRole: 'abcd',
      xlinkShow: 'abcd',
      xlinkTitle: 'abcd',
      xlinkType: 'abcd',
      xmlBase: 'abcd',
      xmlLang: 'abcd',
      xmlSpace: 'abcd',
      y: 'abcd',
      y1: 'abcd',
      y2: 'abcd',
      yChannelSelector: 'abcd',
      z: 'abcd',
      zoomAndPan: 'abcd',
    }

    const RedPath = styled('path')`
      stroke-width: 0.26458332;
    `

    const svg = mount(<RedPath {...svgAttributes} />).find('path')

    expect(svg.props()).toEqual(
      Object.assign({}, svgAttributes, {
        className: expect.any(String),
      })
    )
  })

  test('prop filtering on composed styled components that are string tags', () => {
    const BaseLink = styled.a`
      background-color: hotpink;
    `
    const Link = styled(BaseLink)`
      color: green;
    `

    const tree = renderer
      .create(
        <Link
          a
          b
          wow
          prop
          filtering
          is
          cool
          aria-label="some label"
          data-wow="value"
          href="link"
        >
          hello world
        </Link>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
  test('throws if undefined is passed as the component', () => {
    expect(
      () =>
        styled(undefined)`
          display: flex;
        `
    ).toThrowErrorMatchingSnapshot()
  })
  test('withComponent will replace tags but keep styling classes', () => {
    const Title = styled('h1')`
      color: green;
    `
    const Subtitle = Title.withComponent('h2')

    const wrapper = mount(
      <article>
        <Title>My Title</Title>
        <Subtitle>My Subtitle</Subtitle>
      </article>
    )

    expect(enzymeToJson(wrapper)).toMatchSnapshot()
  })
  test('withComponent with function interpolation', () => {
    const Title = styled('h1')`
      color: ${props => props.color || 'green'};
    `
    const Subtitle = Title.withComponent('h2')

    const wrapper = mount(
      <article>
        <Title>My Title</Title>
        <Subtitle color="hotpink">My Subtitle</Subtitle>
      </article>
    )

    expect(enzymeToJson(wrapper)).toMatchSnapshot()
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
    const wrapper = mount(<StyledComponent />)
    expect(enzymeToJson(wrapper)).toMatchSnapshot()
  })
  test('function that function returns gets called with props', () => {
    const SomeComponent = styled.div`
      color: ${() => props => props.color};
      background-color: yellow;
    `
    const tree = renderer.create(<SomeComponent color="hotpink" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('theme prop exists without ThemeProvider', () => {
    const SomeComponent = styled.div`
      color: ${props => props.theme.color || 'green'};
      background-color: yellow;
    `
    const tree = renderer.create(<SomeComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('theme prop exists without ThemeProvider with a theme prop on the component', () => {
    const SomeComponent = styled.div`
      color: ${props => props.theme.color || 'green'};
      background-color: yellow;
    `
    const tree = renderer
      .create(<SomeComponent theme={{ color: 'hotpink' }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('withComponent does not carry styles from flattened component', () => {
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
})
