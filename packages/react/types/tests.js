/** @jsx jsx */
import * as React from 'react'
import {
  ClassNames,
  Global,
  css,
  jsx,
  keyframes,
  withEmotionCache
} from '@emotion/react'
;<Global styles={[]} />
;<Global styles={theme => [theme.primaryColor]} />
const ComponentWithCache = withEmotionCache((_props, cache) => {
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
  const CompWithClassNameSupport = _props => {
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
  const CompWithoutClassNameSupport = _props => {
    return null
  }
  ;<CompWithoutClassNameSupport prop1="test" css={{ color: 'hotpink' }} />
  const MemoedCompWithoutClassNameSupport = React.memo(
    CompWithoutClassNameSupport
  )
  ;<MemoedCompWithoutClassNameSupport prop1="test" css={{ color: 'hotpink' }} />
}
{
  const CompWithoutProps = _props => {
    return null
  }
  ;<CompWithoutProps css={{ backgroundColor: 'hotpink' }} />
}
{
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40993
  // this is really problematic behaviour by @types/react IMO
  // but it's what @types/react does so let's not break it.
  const CompWithImplicitChildren = () => null
  ;<CompWithImplicitChildren>
    content
    <div />
  </CompWithImplicitChildren>
}
// Tests for WithConditionalCSSProp
{
}
