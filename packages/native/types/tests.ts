import { StyleSheet } from 'react-native'
import styled, { css, Styled } from '@emotion/native'

const cssObject = {
  height: 100,
  width: '100%',
  display: 'block',
  position: undefined,
  ':hover': {
    display: 'block'
  }
}

const className = css`
  ${(true as boolean) && ''}
  ${'bar'}
  ${css``}
  ${1}
  ${cssObject}
`

const className2: ReturnType<typeof StyleSheet.flatten> = css(cssObject)

css([{ display: 'none' }, [{ position: 'relative' }, { width: 100 }]])

css({ display: 'none' }, [{ position: 'relative' }, { width: 100 }])

css(null)

interface ExtraProps {
  foo: string
}

interface AdditionalProps {
  bar: string
}

type Theme = {
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

export const InferredExtraPropsView = (styled as Styled<{}, ExtraProps>).View`
  background-color: blue; // ${({ foo }) => foo}
`

export const ThemedView = (styled as Styled<Theme, ExtraProps>).View<
  AdditionalProps
>`
  background-color: ${({ theme }) => theme.color.positive}; // ${({
  foo,
  bar
}) => foo + bar}
`

export const ComposedView = styled.View`
  ${className} ${className2}
  background-color: white;
`

export const NestedComposedView = styled.View(css`
  ${className} ${className2}
  background-color: white;
`)
