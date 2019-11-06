import * as emotionTheming from 'emotion-theming'
import * as React from 'react'
import styled, { CreateStyled } from '@emotion/styled'
import { Interpolation, ObjectInterpolation } from '@emotion/styled/base'

const { ThemeProvider, withTheme, useTheme } = emotionTheming

interface Theme {
  primary: string
  secondary: string
}
declare const theme: Theme

interface Props {
  prop: boolean
}
declare const CompFC: React.FC<Props>
declare class CompC extends React.Component<Props & { theme: Theme }> {}

const WrappedCompC = withTheme(CompC)
;<ThemeProvider theme={theme}>{WrappedCompC}</ThemeProvider>
;<ThemeProvider theme={() => theme} />
;<ThemeProvider theme={(outerTheme: Theme) => ({ ...outerTheme, ...theme })} />

const ThemedFC = withTheme(CompFC)
;<ThemedFC prop />
;<ThemedFC prop theme={theme} />

const ThemedComp = withTheme(CompC)
;<ThemedComp prop />
;<ThemedComp prop theme={theme} />

const CompFCWithDefault = ({ prop }: Props) => (prop ? <span /> : <div />)
CompFCWithDefault.defaultProps = { prop: false }
class CompCWithDefault extends React.Component<Props> {
  static defaultProps = { prop: false }
  render() {
    return this.props.prop ? <span /> : <div />
  }
}

{
  const theme: Theme = useTheme()

  const themeFail: Theme = useTheme<number>() // $ExpectError
}

const ThemedFCWithDefault = withTheme(CompFCWithDefault)
;<ThemedFCWithDefault />
;<ThemedFCWithDefault theme={theme} />

const ThemedCompWithDefault = withTheme(CompCWithDefault)
;<ThemedCompWithDefault />
;<ThemedCompWithDefault theme={theme} />

const {
  ThemeProvider: TypedThemeProvider,
  withTheme: typedWithTheme
} = emotionTheming as emotionTheming.EmotionTheming<Theme>
;<TypedThemeProvider theme={theme} />
// $ExpectError
;<TypedThemeProvider theme={{ primary: 5 }} />

typedWithTheme(CompFC)

/**
 * @todo
 * Following line should report an error.
 */
typedWithTheme((props: { value: number }) => null)

{
  interface Book {
    kind: 'book'
    author: string
  }

  interface Magazine {
    kind: 'magazine'
    issue: number
  }

  type SomethingToRead = (Book | Magazine) & { theme?: any }

  const Readable: React.FC<SomethingToRead> = props => {
    if (props.kind === 'magazine') {
      return <div>magazine #{props.issue}</div>
    }

    return <div>magazine #{props.author}</div>
  }

  const ThemedReadable = withTheme(Readable)
  ;<Readable kind="book" author="Hejlsberg" />
  ;<ThemedReadable kind="book" author="Hejlsberg" />
  ;<Readable kind="magazine" author="Hejlsberg" /> // $ExpectError
  ;<ThemedReadable kind="magazine" author="Hejlsberg" /> // $ExpectError
}

const themedStyled = styled as CreateStyled<Theme>

const StyledCompC = themedStyled(WrappedCompC)({})
const AdditionallyStyledCompC = themedStyled(StyledCompC)({})
;<StyledCompC prop={true} />
;<AdditionallyStyledCompC prop={true} />

const StyledDiv = themedStyled('div')({})
;<StyledDiv />
// $ExpectError
;<StyledDiv theme={{ primary: 0, secondary: 0 }} />
const AdditionallyStyledDiv = themedStyled(StyledDiv)({})
;<AdditionallyStyledDiv />
// $ExpectError
;<AdditionallyStyledDiv theme={{ primary: 0, secondary: 0 }} />

const StyledDiv2 = themedStyled.div({})
;<StyledDiv2 />
// $ExpectError
;<StyledDiv2 theme={{ primary: 0, secondary: 0 }} />

export type StyleDefinition<T = {}> = Interpolation<
  emotionTheming.WithTheme<T, Theme>
>
export type ObjectStyleDefinition<T = {}> = ObjectInterpolation<
  emotionTheming.WithTheme<T, Theme>
>

const style: StyleDefinition = ({ theme }) => ({
  color: theme.primary
})
const style2: ObjectStyleDefinition = {
  width: 100
}

// Can use ThemeProvider
;<ThemeProvider theme={{ prop: 'val' }} />
;<TypedThemeProvider theme={{ primary: '', secondary: '' }} />
// $ExpectError
;<TypedThemeProvider theme={{ nope: 'string' }} />
