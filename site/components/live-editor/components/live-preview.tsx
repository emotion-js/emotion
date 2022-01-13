import { ReactElement, useContext } from 'react'
import { LiveContext } from './live-context'

interface LivePreviewProps {
  className?: string
}

export function LivePreview({ className }: LivePreviewProps): ReactElement {
  const { element } = useContext(LiveContext)

  return <div className={className}>{element}</div>
}
