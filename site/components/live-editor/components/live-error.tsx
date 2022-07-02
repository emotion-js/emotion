import { useContext, ReactElement } from 'react'
import { LiveContext } from './live-context'

interface LiveErrorProps {
  className?: string
}

export function LiveError({ className }: LiveErrorProps): ReactElement | null {
  const { errorMessage } = useContext(LiveContext)

  if (!errorMessage) return null

  return <pre className={className}>{errorMessage}</pre>
}
