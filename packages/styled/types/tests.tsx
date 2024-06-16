import * as React from 'react'
import styled, { StyledOptions, FilteringStyledOptions } from '@emotion/styled'

// This file uses the same Theme declaration from tests-base.tsx

{
  const Anchor = styled.a``
  ;<Anchor href="test" />
  const Body = styled.body``
  ;<Body />
  const Div = styled.div``
  ;<Div onClick={() => {}} />
  const Svg = styled.svg``
  ;<Svg color="hotpink" />
}

{
  styled.div<{ bar: string }>`
    color: ${props => {
      // $ExpectType Theme
      props.theme
      // $ExpectType string
      props.bar
      // $ExpectType string | undefined
      props.dir

      return {}
    }};
  `
}

const StyledDiv = styled.div({})
;<StyledDiv ref={React.createRef()} />

// Can override theme optionally on prop
;<StyledDiv
  theme={{ primary: '', secondary: '', backColor: '', width: 0, colors: {} }}
/>

// Cannot override with incomplete theme on prop
// $ExpectError
;<StyledDiv theme={{ primary: '' }} />

// $ExpectError
;<StyledDiv theme={{ themeProp: 0 }} />

const Container = styled.div((props: { test: number }) => ({
  width: props.test
}))

const Container2 = styled.div<{ test: number }>(props => ({
  width: props.test
}))

const Container3 = styled.div(({ theme }) => ({
  width: theme.width
}))

// This example shows using shouldForwardProps to define a prop
// who's type clashes with an intrinsic prop.
// It makes use of a custom type guard on shouldForwardProp to exclude color

const Box = styled('div', {
  shouldForwardProp: (
    propName
  ): propName is Exclude<keyof JSX.IntrinsicElements['div'], 'color'> =>
    propName !== 'color'
})<{ color: Array<string> }>(props => ({
  color: props.color[0]
}))
;<Box color={['green']} />

const Original: React.FC<{ prop1: string; prop2: string }> = () => null

interface StyledOriginalExtraProps {
  // This prop would conflict with the `prop2` on Original
  prop2: number
}
const StyledOriginal = styled(Original, {
  // Filter prop2 by only forwarding prop1
  shouldForwardProp: (propName): propName is 'prop1' => propName === 'prop1'
})<StyledOriginalExtraProps>(props => {
  // props.prop2 will be `number`
  return {}
})

// No more type conflict error
;<StyledOriginal prop1="1" prop2={2} />

const Label = styled.label``
const Button = styled.button``
const Input = styled.input`
  & + ${Label}: {
    margin-left: 3px;
  }
`

const Input2 = styled.input`
  & + ${Label}: {
    margin-left: 3px;
  }
  & + ${Button}: {
    margin-left: 3px;
  }
`

const Input3 = styled.input({
  [`& + ${Label}`]: {
    marginLeft: '3px'
  }
})

interface AdditionalTest {
  left: string
}
const Input4 = styled.input<AdditionalTest>`
  & + ${Label}: ${props => ({
    marginLeft: props.left
  })}
`
const Input5 = styled.input`
  color: ${props => props.theme.primary};
`
;<Input
  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
    console.log(evt.target.value)
  }
/>
;<Input2
  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
    console.log(evt.target.value)
  }
/>
;<Input3
  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
    console.log(evt.target.value)
  }
/>
;<Input4
  left="3px"
  onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
    console.log(evt.target.value)
  }
/>

{
  const A = styled('h1')()
  const B = styled(A)()
  const C = styled(B)()
  const D = styled(C)()
  const E = styled(D)()
  const F = styled(E)()
  const G = styled(F)()
  const H = styled(G)()
  const I = styled(H)()
  const J = styled(I)()
  const K = styled(J)()
  const L = styled(K)()
  const M = styled(L)()
  const N = styled(M)()
  const O = styled(N)()
  const P = styled(O)()
  const Q = styled(P)()
  const R = styled(Q)()
  const S = styled(R)()
  const T = styled(S)()
  const U = styled(T)()
  const V = styled(U)()
  const X = styled(V)()
  const Y = styled(X)()
  const Z = styled(Y)()
  ;<Z>No excessive instantiation</Z>
}

{
  const StyledWithAs = styled.div`
    display: flex;
  `
  const Section = styled.section`
    color: hotpink;
  `
  ;<StyledWithAs as="section" />
  ;<StyledWithAs as={Section} />
  // $ExpectError
  ;<StyledWithAs as="random string" />

  const ComposedWithAs = styled(StyledWithAs)`
    flex-direction: column;
  `
  ;<ComposedWithAs as="section" />
  ;<ComposedWithAs as={Section} />
  // $ExpectError
  ;<ComposedWithAs as="random string" />

  const ComponentWithAs: React.FC<{ as: string; className?: string }> = ({
    as,
    className
  }) => <div className={className}>{as}</div>

  const StyledComp = styled(ComponentWithAs)`
    background: orange;
  `
  ;<StyledComp as="random string" />
  // $ExpectError
  ;<StyledComp as={Section} />

  const ComponentWithoutAs: React.FC<{ className?: string }> = props => (
    <div {...props} />
  )
  const StyledCompWithoutAs = styled(ComponentWithoutAs)`
    background: hotpink;
  `
  // $ExpectError
  ;<StyledCompWithoutAs as="random string" />
  // $ExpectError
  ;<StyledCompWithoutAs as="section" />
  // $ExpectError
  ;<StyledCompWithoutAs as={Section} />
}

{
  // Props forwarding through StyledOptions and FilteringStyledOptions

  const fc: React.FC<{ foo: string }> = () => null

  // we can't accept a "known" prop here because we need to include `AdditionalProps` and those aren't available yet
  // `Props` represent the actual props of a component while `AdditionalProps` represent props used only for styling purposes
  // $ExpectError
  styled(fc, { shouldForwardProp: (prop: 'foo') => true })({})

  styled(fc, { shouldForwardProp: (prop: string) => true })({})

  // $ExpectError
  styled(fc, { shouldForwardProp: (prop: 'bar') => true })({})
  // $ExpectError
  styled(fc, { shouldForwardProp: (prop: 'foo') => true })({})

  // $ExpectError
  const shouldForwardProp1: StyledOptions['shouldForwardProp'] = (
    prop: 'unknown'
  ) => true
  styled(fc, { shouldForwardProp: shouldForwardProp1 })({})

  // $ExpectError
  styled(fc, { shouldForwardProp: (prop: 'unknown') => true })({})

  // $ExpectError
  const shouldForwardProp2: StyledOptions<{
    foo: string
  }>['shouldForwardProp'] = (prop: 'unknown') => true

  styled(fc, { shouldForwardProp: (prop: string): prop is 'foo' => true })({})
  // $ExpectError
  styled(fc, { shouldForwardProp: (prop: 'foo'): prop is 'foo' => true })({})

  const shouldForwardProp3: FilteringStyledOptions['shouldForwardProp'] = (
    prop: string
  ): prop is 'foo' => true

  // $ExpectError
  const shouldForwardProp4: FilteringStyledOptions['shouldForwardProp'] = (
    prop: 'foo'
  ): prop is 'foo' => true

  const shouldForwardProp5: FilteringStyledOptions<{
    foo: string
  }>['shouldForwardProp'] = (prop: string): prop is 'foo' => true
  // $ExpectError
  const shouldForwardProp6: FilteringStyledOptions<{
    foo: string
  }>['shouldForwardProp'] = (prop: 'foo'): prop is 'foo' => true

  // $ExpectError
  const shouldForwardProp7: FilteringStyledOptions<{
    foo: string
  }>['shouldForwardProp'] = (prop: 'unknown'): prop is 'unknown' => true

  const shouldForwardProp8: FilteringStyledOptions<
    { foo: string; bar: string },
    'foo'
  >['shouldForwardProp'] = (prop: string): prop is 'foo' => true

  // $ExpectError
  const shouldForwardProp9: FilteringStyledOptions<
    { foo: string; bar: string },
    'foo'
  >['shouldForwardProp'] = (prop: 'foo' | 'bar'): prop is 'bar' => true

  styled('div', {
    shouldForwardProp: (prop: string) => true
  })({})

  // $ExpectError
  styled('div', { shouldForwardProp: (prop: 'color') => true })({})

  styled('div', {
    // $ExpectError
    shouldForwardProp: (prop: 'color'): prop is 'color' => true
  })({})

  // $ExpectError
  styled('div', { shouldForwardProp: (prop: 'foo') => true })({})
}
