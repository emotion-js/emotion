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
