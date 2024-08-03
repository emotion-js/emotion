/** @jsx jsx */
import * as React from 'react'
import {
  ClassNames,
  Global,
  css,
  jsx,
  keyframes,
  withEmotionCache,
  Interpolation,
  Theme
} from '@emotion/react'
import { JSX as EmotionJSX } from '@emotion/react/jsx-runtime'
import { CSSInterpolation } from '@emotion/serialize'

declare module '@emotion/react' {
  // tslint:disable-next-line: strict-export-declare-modifiers
  export interface Theme {
    primary: string
    secondary: string
    primaryColor: string
    secondaryColor: string
  }
}

;<Global styles={[]} />
;<Global styles={theme => [theme.primaryColor]} />

declare const getStyles: () => CSSInterpolation
;<Global styles={getStyles()} />

declare const getRandomColor: () => string

const ComponentWithCache = withEmotionCache((_props: {}, cache) => {
  return (
    <div
      onClick={() =>
        cache.sheet.insert(`div { backgroundColor: ${getRandomColor()} }`)
      }
    />
  )
})
;<ComponentWithCache ref={() => {}} />
;<div css={{}}>
  <h1
    css={css`
      font-size: 500px;
    `}
  >
    This is really big
  </h1>
  <Global
    styles={{
      body: {
        backgroundColor: 'hotpink'
      }
    }}
  />
</div>
;<Global
  styles={css`
    body {
      background-color: black;
    }
  `}
/>

declare const MyComponent: React.ComponentClass<{
  className?: string
  world: string
}>
;<MyComponent
  css={{
    backgroundColor: 'black'
  }}
  world="is-gone"
/>

const anim0 = keyframes({
  from: {
    top: 0
  },

  to: {
    top: '20px'
  }
})
;<MyComponent
  css={{
    animationName: anim0
  }}
  world="of-world"
/>

const anim1 = keyframes`
  from: {
    margin-left: 50px;
  }

  to: {
    margin-left: 0;
  }
`
;<MyComponent
  css={{
    animationName: anim1
  }}
  world="of-world"
/>
;<ClassNames>
  {({ css, cx, theme }) => {
    return (
      <div>
        <span className={cx('a', undefined, 'b', null, [['abc']])} />
        <span
          className={css({
            color: theme.primaryColor
          })}
        >
          Fst Text
        </span>
        <span
          className={css`
            color: ${theme.secondaryColor};
          `}
        >
          Snd Text
        </span>
      </div>
    )
  }}
</ClassNames>
;<div
  css={theme => css`
    color: ${theme.secondaryColor};
  `}
/>

{
  const CompWithClassNameSupport = (_props: {
    prop1: string
    className?: string
  }) => {
    return null
  }
  ;<CompWithClassNameSupport
    prop1="test"
    css={{
      backgroundColor: 'hotpink'
    }}
  />

  const MemoedCompWithClassNameSupport = React.memo(CompWithClassNameSupport)
  ;<MemoedCompWithClassNameSupport
    prop1="test"
    css={{
      backgroundColor: 'hotpink'
    }}
  />
}

{
  const CompWithoutClassNameSupport = (_props: { prop1: string }) => {
    return null
  }

  // TS@next reports an error on a different line, so this has to be in a single line so `test:typescript` can validate this on all TS versions correctly
  // $ExpectError
  ;<CompWithoutClassNameSupport prop1="test" css={{ color: 'hotpink' }} />

  const MemoedCompWithoutClassNameSupport = React.memo(
    CompWithoutClassNameSupport
  )
  // TS@next reports an error on a different line, so this has to be in a single line so `test:typescript` can validate this on all TS versions correctly
  // $ExpectError
  ;<MemoedCompWithoutClassNameSupport prop1="test" css={{ color: 'hotpink' }} />
}

{
  const CompWithoutProps = (_props: {}) => {
    return null
  }
  // $ExpectError
  ;<CompWithoutProps css={{ backgroundColor: 'hotpink' }} />
}

{
  // based on the code from @types/react@17.x
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/98fa4486aefd5a1916aa385402467a7157e3c73f/types/react/v17/index.d.ts#L540-L548
  type OldFC<P = {}> = OldFunctionComponent<P>
  interface OldFunctionComponent<P = {}> {
    (
      props: React.PropsWithChildren<P>,
      context?: any
    ): React.ReactElement<any, any> | null
    propTypes?: React.WeakValidationMap<P> | undefined
    contextTypes?: React.ValidationMap<any> | undefined
    defaultProps?: Partial<P> | undefined
    displayName?: string | undefined
  }
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40993
  // this is really problematic behaviour by @types/react@<18 IMO
  // but it's what @types/react did so let's not break it.
  const CompWithImplicitChildren: OldFC = () => null
  ;<CompWithImplicitChildren>
    content
    <div />
  </CompWithImplicitChildren>
}

// Tests for WithConditionalCSSProp
{
  // $ExpectType Interpolation<Theme>
  type _HasCssPropAsIntended3 = EmotionJSX.LibraryManagedAttributes<
    {},
    {
      className?: string
    }
  >['css']

  // $ExpectType Interpolation<Theme>
  type _HasCssPropAsIntended4 = EmotionJSX.LibraryManagedAttributes<
    {},
    {
      className: string
    }
  >['css']

  // $ExpectType Interpolation<Theme>
  type _HasCssPropAsIntended5 = EmotionJSX.LibraryManagedAttributes<
    {},
    {
      className?: unknown
    }
  >['css']

  // $ExpectType Interpolation<Theme>
  type _HasCssPropAsIntended6 = EmotionJSX.LibraryManagedAttributes<
    {},
    {
      className?: string | Array<string>
    }
  >['css']

  /*
     Additional brackets here prevent type reference('EmotionJSX.LibraryManagedAttributes<...>') from being resolved to type alias name('_HasCssPropAsIntended7').
     Without them, dtslint will compare the expected type to the type name.
  */
  type _HasCssPropAsIntended7 = [
    // $ExpectType { foo: boolean; } | ({ css?: Interpolation<Theme>; } & { foo: number; className: string; })
    EmotionJSX.LibraryManagedAttributes<
      {},
      { foo: number; className: string } | { foo: boolean }
    >
  ]

  // $ExpectType false
  type _NoCssPropAsIntended1 =
    'css' extends keyof EmotionJSX.LibraryManagedAttributes<
      {},
      { className?: undefined }
    >
      ? true
      : false
}
