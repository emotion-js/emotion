import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { LiveContext } from './live-context'
import { renderElementAsync, Scope } from './render-element-async'

type LiveProviderProps = PropsWithChildren<{
  defaultCode: string
  scope: Scope

  transformCode(code: string): Promise<string>
}>

export function LiveProvider({
  defaultCode,
  scope,
  transformCode,
  children
}: LiveProviderProps) {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [element, setElement] = useState<ReactElement>()
  const [code, setCode] = useState<string>(defaultCode)

  useEffect(() => {
    async function effectAsync(): Promise<void> {
      function onError(e: unknown): void {
        setErrorMessage((e as { toString(): string }).toString())
        setElement(undefined)
      }

      try {
        const transformedCode = await transformCode(code)

        setErrorMessage(undefined)
        setElement(undefined)

        const element = await renderElementAsync(
          transformedCode,
          scope,
          onError
        )
        setElement(element)
      } catch (e) {
        onError(e)
      }
    }

    effectAsync()
  }, [defaultCode, scope, transformCode])

  return (
    <LiveContext.Provider
      value={{
        code,
        onCodeChange: setCode,
        errorMessage,
        element
      }}
    >
      {children}
    </LiveContext.Provider>
  )
}
