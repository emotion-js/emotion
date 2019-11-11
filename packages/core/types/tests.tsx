/** @jsx jsx */
import { ComponentClass } from 'react'
import {
  ClassNames,
  ClassNamesContent,
  Global,
  css,
  jsx,
  keyframes,
  withEmotionCache
} from '@emotion/core'
;<Global styles={[]} />

declare global {
  namespace Emotion {
    interface Theme {
      primaryColor: string
      secondaryColor: string
    }
  }
}

;<Global styles={theme => [theme.primaryColor]} />

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
