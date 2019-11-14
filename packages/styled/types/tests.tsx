import * as React from 'react'
import styled, { CreateStyled } from '@emotion/styled'

// $ExpectType CreateStyledComponent<{ theme?: any; }, DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, { theme: any; }>
styled.a
// $ExpectType CreateStyledComponent<{ theme?: any; }, DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>, { theme: any; }>
styled.body
// $ExpectType CreateStyledComponent<{ theme?: any; }, DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { theme: any; }>
styled.div
// $ExpectType CreateStyledComponent<{ theme?: any; }, SVGProps<SVGSVGElement>, { theme: any; }>
styled.svg

{
  styled.div<{ bar: string }>`
    color: ${props => {
      // $ExpectType { theme?: any; } & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & { bar: string; } & { theme: any; }
      props

      return {}
    }};
  `
}

const StyledDiv = styled.div({})
;<StyledDiv ref={React.createRef()} />

// can specify theme for StyledTags
const themedStyled = styled as CreateStyled<{ themeProp: string }>
const StyledDiv3 = themedStyled.div`
  color: ${props => props.theme.themeProp}
`
;<StyledDiv3 />
const StyledDiv2 = themedStyled.div(props => {
  // $ExpectType { themeProp: string; }
  props.theme

  return {}
})
;<StyledDiv2 />

// Can override theme optionally on prop
;<StyledDiv2 theme={{ themeProp: '' }} />

// $ExpectError
;<StyledDiv2 theme={{ themeProp: 0 }} />

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

export const Box = styled('div', {
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
