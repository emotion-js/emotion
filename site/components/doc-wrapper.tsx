import { PropsWithChildren, ReactElement } from 'react'

interface DocWrapperProps {
  sidebarOpen: boolean
  onSidebarOpenChange(sidebarOpen: boolean): void
}

export function DocWrapper({
  children
}: PropsWithChildren<DocWrapperProps>): ReactElement {
  return <>{children}</>
}
