// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'
import { useTheme, ThemeProvider, withTheme } from '@emotion/core'
import { Interpolation, ObjectInterpolation } from '@emotion/styled/base'

declare global {
  namespace Emotion {
    interface Theme {
      primary: string
      secondary: string
    }
  }
}

declare const theme: Emotion.Theme

interface Props {
  prop: boolean
}
declare const CompFC: React.FC<Props>
declare class CompC extends React.Component<Props & { theme: Emotion.Theme }> {}

const WrappedCompC = withTheme(CompC)
;<ThemeProvider theme={theme}>{WrappedCompC}</ThemeProvider>
;<ThemeProvider theme={() => theme} />
;<ThemeProvider
  theme={(outerTheme: Emotion.Theme) => ({ ...outerTheme, ...theme })}
/>

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
  const theme: Emotion.Theme = useTheme()
}

const ThemedFCWithDefault = withTheme(CompFCWithDefault)
;<ThemedFCWithDefault />
;<ThemedFCWithDefault theme={theme} />

const ThemedCompWithDefault = withTheme(CompCWithDefault)
;<ThemedCompWithDefault />
;<ThemedCompWithDefault theme={theme} />

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
}

export type StyleDefinition = Interpolation
export type ObjectStyleDefinition = ObjectInterpolation<{
  theme: Emotion.Theme
}>

const style: StyleDefinition = ({ theme }) => ({
  color: theme.primary
})
const style2: ObjectStyleDefinition = {
  width: 100
}

// Can use ThemeProvider
;<ThemeProvider theme={{ primary: 'val' }} />
