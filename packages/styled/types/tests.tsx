import * as React from 'react'
import styled from '@emotion/styled'

// This file uses the same Theme declaration from tests-base.tsx

// $ExpectType CreateStyledComponent<{ theme?: Theme | undefined; }, DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, { theme: Theme; }>
styled.a
// $ExpectType CreateStyledComponent<{ theme?: Theme | undefined; }, DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>, { theme: Theme; }>
styled.body
// $ExpectType CreateStyledComponent<{ theme?: Theme | undefined; }, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { theme: Theme; }>
styled.div
// $ExpectType CreateStyledComponent<{ theme?: Theme | undefined; }, SVGProps<SVGSVGElement>, { theme: Theme; }>
styled.svg

{
  styled.div<{ bar: string }>`
    color: ${props => {
      // $ExpectType { theme?: Theme | undefined; } & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & { bar: string; } & { theme: Theme; }
      props

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
