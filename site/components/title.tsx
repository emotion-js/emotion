import { PropsWithChildren, ReactElement } from 'react'

type TitleProps = PropsWithChildren<{ className?: string }>

export function Title({ className, children }: TitleProps): ReactElement {
  return (
    <h1
      className={className}
      css={{
        marginBottom: '1rem',
        fontWeight: 700
      }}
    >
      {children}
    </h1>
  )
}
