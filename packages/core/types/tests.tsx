/** @jsx jsx */
import { ComponentClass } from 'react'
import {
  ClassNames,
  ClassNamesContent,
  Global,
  Interpolation,
  CacheProvider,
  css,
  jsx,
  keyframes,
  withEmotionCache
} from '@emotion/core'
import { ObjectInterpolation } from '@emotion/css'
;<Global styles={[]} />

interface TestTheme0 {
  resetStyle: any
}

;<Global styles={(theme: TestTheme0) => [theme.resetStyle]} />

declare const getRandomColor: () => string

const ComponentWithCache = withEmotionCache((_props: {}, context) => {
  return (
    <div
      onClick={() =>
        context.sheet.insert(`div { backgroundColor: ${getRandomColor()} }`)
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

declare const MyComponent: ComponentClass<{ className?: string; world: string }>
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

interface TestTheme1 {
  primaryColor: string
  secondaryColor: string
}

;<ClassNames>
  {({ css, cx, theme }: ClassNamesContent<TestTheme1>) => {
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

// issue 1532 https://github.com/emotion-js/emotion/pull/1532
interface HaveObjectCss<T = any> {
  less: ObjectInterpolation<T>
}
// prior to 1532 the css prop being passed less would fail
const LessComponent = <T extends any>({ less }: HaveObjectCss<T>) => (
  <div css={less}>I have Css</div>
)

interface AnimationTheme {
  from: { top: number }
  to: { top: number }
}

// BEGIN NON TEMPLATE ANIMATIONS
// without restricting less
;<LessComponent
  less={keyframes<AnimationTheme>({ from: { top: 0 }, to: { top: 20 } })}
/>

// FAILS IN TYPESCRIPT 2.8 only due to <LessComponent<AnimationTheme> not being supported
// ;<LessComponent<AnimationTheme>
// less={keyframes<AnimationTheme>({ from: { top: 0 }, to: { top: 20 } })}
// />
// END NON TEMPLATE ANIMATIONS

// BEGIN TEMPLATE ANIMATIONS
// without restricting less
;<LessComponent
  less={keyframes<AnimationTheme>(
    `
  .off {
    from {
      top: 20px;
    }
    from {
      top: 0px;
    }
  }`,
    { from: { top: 0 }, to: { top: 20 } }
  )}
/>
// FAILS IN TYPESCRIPT 2.8 only due to <LessComponent<AnimationTheme> not being supported
// ;<LessComponent<AnimationTheme>
//   less={keyframes<AnimationTheme>(
//     `
//   .off {
//     from {
//       top: 20px;
//     }
//     from {
//       top: 0px;
//     }
//   }`,
//     { from: { top: 0 }, to: { top: 20 } }
//   )}
// />
// END TEMPLATE ANIMATIONS
