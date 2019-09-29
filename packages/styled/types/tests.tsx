// TypeScript Version: 2.9

import styled from '@emotion/styled'

// $ExpectType CreateStyledComponent<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, { theme?: any; }>
styled.a
// $ExpectType CreateStyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>, { theme?: any; }>
styled.body
// $ExpectType CreateStyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { theme?: any; }>
styled.div
// $ExpectType CreateStyledComponent<SVGProps<SVGSVGElement>, { theme?: any; }>
styled.svg

{
  // $ExpectType StyledComponent<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, { bar: string; }>
  styled.div<{ bar: string }>`
    color: ${props => {
      // $ExpectType ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & { bar: string; } & { theme?: any; }
      const { theme } = props
      return theme.themed
    }};
  `
}
