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
      // $ExpectType { theme?: any; } & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & { bar: string; }
      props

      return {}
    }};
  `
}

const StyledDiv = styled.div({})
;<StyledDiv ref={React.createRef()} />

// can specify theme for StyledTags
const themedStyled = styled as CreateStyled<{ themeProp: string }>
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
