import Highlight from 'prism-react-renderer'
import { useContext, ReactElement } from 'react'
import { LiveContext } from './live-context'
import SimpleCodeEditor from 'react-simple-code-editor'

// Use our customized instance of Prism, see prism-highlight-css.ts
import Prism from 'prismjs'

interface LiveEditorProps {
  className?: string
}

export function LiveEditor({ className }: LiveEditorProps): ReactElement {
  const { code, onCodeChange } = useContext(LiveContext)

  function highlightCode(code: string): ReactElement {
    // `Prism as any` is necessary because of this issue: https://github.com/FormidableLabs/prism-react-renderer/issues/136
    return (
      <Highlight Prism={Prism as any} code={code} language="jsx">
        {({ tokens, getLineProps, getTokenProps }) => (
          <>
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-key
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </>
        )}
      </Highlight>
    )
  }

  return (
    <SimpleCodeEditor
      className={className}
      value={code}
      onValueChange={onCodeChange}
      padding={10}
      highlight={highlightCode}
      css={{
        whiteSpace: 'pre',
        fontFamily: 'monospace'
      }}
    />
  )
}
