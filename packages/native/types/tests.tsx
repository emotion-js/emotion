import * as React from 'react'
import { View } from 'react-native'
import styled, { CreateStyled, css, ReactNativeStyle } from '@emotion/native'

const cssObject = {
  height: 100,
  width: '100%',
  display: 'flex',
  position: undefined
} as const

const className = css`
  ${(true as boolean) && ''}
  ${'bar'}
  ${css``}
  ${1}
  ${cssObject}
`

const className2: ReactNativeStyle = css(cssObject)

css([{ display: 'none' }, [{ position: 'relative' }, { width: 100 }]])

css({ display: 'none' }, [{ position: 'relative' }, { width: 100 }])

css(null)

interface ExtraProps {
  foo: string
}

interface AdditionalProps {
  bar: string
}

interface Theme {
  color: {
    primary: string
    positive: string
    negative: string
  }
}

export const ExplicitExtraPropsView = styled.View<ExtraProps>`
  background-color: red; // ${({ foo }) => foo}
`

export const InferredPropsView = styled.View`
  background-color: green; // ${({ testID }) => testID}
`

export const InferredExtraPropsView = styled.View<ExtraProps>`
  background-color: blue; // ${({ foo }) => foo}
`

export const ThemedView = (styled as CreateStyled<Theme>).View<AdditionalProps>`
  background-color: ${({ theme }) => theme.color.positive}; // ${({ bar }) =>
  bar}
`

export const ComposedView = styled.View`
  ${className} ${className2}
  background-color: white;
`

export const NestedComposedView = styled.View(css`
  ${className} ${className2}
  background-color: white;
`)

const theme: Theme = {
  color: {
    primary: 'blue',
    negative: 'red',
    positive: 'green'
  }
}

export const themed = <ThemedView bar="bar" theme={theme} />
export const composed = <ComposedView theme={theme} />

function MyComponent(_props: AdditionalProps) {
  return null
}

styled(MyComponent)({ width: 100 })
styled(MyComponent)(({ bar }) => ({ color: bar }))
styled(View)({ width: 100 })
styled(View)<ExtraProps>(({ foo, testID }) => ({ color: foo, testID }))
