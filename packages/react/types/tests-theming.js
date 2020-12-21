// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1
import * as React from 'react'
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'
const WrappedCompC = withTheme(CompC)
;<ThemeProvider theme={theme}>{WrappedCompC}</ThemeProvider>
;<ThemeProvider theme={() => theme} />
;<ThemeProvider theme={(outerTheme) => ({ ...outerTheme, ...theme })} />
const ThemedFC = withTheme(CompFC)
;<ThemedFC prop />
;<ThemedFC prop theme={theme} />
const ThemedComp = withTheme(CompC)
;<ThemedComp prop />
;<ThemedComp prop theme={theme} />
const CompFCWithDefault = ({ prop }) => (prop ? <span /> : <div />)
CompFCWithDefault.defaultProps = { prop: false }
class CompCWithDefault extends React.Component {
  render() {
    return this.props.prop ? <span /> : <div />
  }
}
CompCWithDefault.defaultProps = { prop: false }
{
  const theme = useTheme()
}
const ThemedFCWithDefault = withTheme(CompFCWithDefault)
;<ThemedFCWithDefault />
;<ThemedFCWithDefault theme={theme} />
const ThemedCompWithDefault = withTheme(CompCWithDefault)
;<ThemedCompWithDefault />
;<ThemedCompWithDefault theme={theme} />
{
  const Readable = (props) => {
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
const style = ({ theme }) => ({
  color: theme.primary,
})
const style2 = {
  width: 100,
}
;<ThemeProvider theme={{ primary: 'val' }} />
