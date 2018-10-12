import * as emotionTheming from 'emotion-theming'
import * as React from 'react'

const { ThemeProvider, withTheme } = emotionTheming

interface Theme {
  primary: string
  secondary: string
}
declare const theme: Theme

interface Props {
  prop: boolean
  theme: Theme
}
declare const CompSFC: React.SFC<Props>
declare class CompC extends React.Component<Props> {}

const WrappedCompC = withTheme<typeof CompC>(CompC)
;<ThemeProvider theme={theme}>{WrappedCompC}</ThemeProvider>
;<ThemeProvider theme={() => theme} />
;<ThemeProvider theme={(outerTheme: Theme) => ({ ...outerTheme, ...theme })} />

const ThemedSFC = withTheme(CompSFC)
;<ThemedSFC prop />
;<ThemedSFC prop theme={theme} />

const ThemedComp = withTheme(CompC)
;<ThemedComp prop />
;<ThemedComp prop theme={theme} />

const {
  ThemeProvider: TypedThemeProvider,
  withTheme: typedWithTheme
} = emotionTheming as emotionTheming.EmotionTheming<Theme>
;<TypedThemeProvider theme={theme} />
// $ExpectError
;<TypedThemeProvider theme={{ primary: 5 }} />

typedWithTheme(CompSFC)
/**
 * @todo
 * Following line should report an error.
 */
typedWithTheme((props: { value: number }) => null)
