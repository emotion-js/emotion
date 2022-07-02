import Highlight from 'prism-react-renderer'
import { useContext, ReactElement } from 'react'
import { LiveContext } from './live-context'
import SimpleCodeEditor from 'react-simple-code-editor'

const language = 'jsx'

interface LiveEditorProps {
  className?: string
  prism?: unknown
}

export function LiveEditor({
  className,
  prism
}: LiveEditorProps): ReactElement {
  const { code, onCodeChange } = useContext(LiveContext)

  function highlightCode(code: string): ReactElement {
    return (
      <Highlight Prism={prism as any} code={code} language={language}>
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
