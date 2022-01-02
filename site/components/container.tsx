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
        paddingLeft: '1rem',
        paddingRight: '1rem',

        [mediaQueries.mdUp]: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem'
        }
      }}
    >
      {children}
    </div>
  )
}
