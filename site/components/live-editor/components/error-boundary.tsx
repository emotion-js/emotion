import React, { PropsWithChildren, ReactNode } from 'react'

type ErrorBoundaryProps = PropsWithChildren<{
  onError(error: unknown): void
}>

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error: unknown): void {
    this.props.onError(error)
  }

  render(): ReactNode {
    return this.props.children
  }
}
