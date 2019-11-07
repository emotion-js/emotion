// @flow
import 'test-utils/legacy-env'
import React from 'react'
import * as renderer from 'react-test-renderer'
import styled from '@emotion/styled'

test('composes shouldForwardProp on composed styled components', () => {
  const StyledDiv = styled('div', {
    shouldForwardProp: prop => prop === 'forwardMe'
  })()

  const ComposedDiv = styled(StyledDiv, {
    shouldForwardProp: () => true
  })()

  const tree = renderer.create(<ComposedDiv filterMe forwardMe />).toJSON()

  expect(tree.props.filterMe).toBeUndefined()
  expect(tree.props.forwardMe).toBeDefined()
})

test('custom shouldForwardProp works', () => {
  const Svg = props => (
    <svg {...props}>
      <rect
        x="10"
        y="10"
        height="100"
        width="100"
        style={{ stroke: '#ff0000' }}
      />
    </svg>
  )

  const StyledSvg = styled(Svg, {
    shouldForwardProp: prop =>
      ['className', 'width', 'height'].indexOf(prop) !== -1
  })`
    &,
    & * {
      fill: ${({ color }) => color};
    }
  `

  const tree = renderer
    .create(<StyledSvg color="#0000ff" width="100px" height="100px" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('shouldForwardProp should get inherited for wrapped styled components', () => {
  const Div1 = styled('div', {
    shouldForwardProp: prop => prop !== 'color'
  })`
    background-color: ${({ color }) => color};
  `

  const Div2 = styled(Div1)``

  const tree = renderer
    .create(
      <>
        <Div1 color="red" id="test-1" />
        <Div2 color="green" id="test-2" />
      </>
    )
    .toJSON()
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

  const svg = renderer
    .create(<RedCircle r="9.8273811" cy="49.047619" cx="65.011902" />)
    .toJSON()

  expect(svg).toMatchInlineSnapshot(`
.emotion-0 {
  fill: #ff0000;
  stroke-width: 0.26458332;
}

<circle
  className="emotion-0 emotion-1"
  cx="65.011902"
  cy="49.047619"
  r="9.8273811"
/>
`)
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
    zoomAndPan: 'abcd'
  }

  const RedPath = styled('path')`
    stroke-width: 0.26458332;
  `

  const svg = renderer.create(<RedPath {...svgAttributes} />).toJSON()

  expect(svg.props).toEqual({ ...svgAttributes, className: expect.any(String) })
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
        wow
        prop
        filtering
        looks
        cool
        but
        is
        kind
        of
        a
        bad
        idea
        since
        the
        react
        warnings
        will
        not
        work
        and
        it="is"
        problematic
        for="other reasons"
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
