import { PropsWithChildren, ReactElement } from 'react'
import { mediaQueries } from '../util'

type ContainerProps = PropsWithChildren<{
  className?: string
}>

export function Container({
  className,
  children
}: PropsWithChildren<ContainerProps>): ReactElement {
  return (
    <div
      className={className}
      css={{
        margin: '0 auto',
        maxWidth: 1132,
        padding: '0 1rem',
        [mediaQueries.mdUp]: { padding: '0 1.5rem' }
      }}
    >
      {children}
    </div>
  )
}
