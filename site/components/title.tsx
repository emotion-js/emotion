import { PropsWithChildren, ReactElement } from 'react'

export function Title({ children }: PropsWithChildren<unknown>): ReactElement {
  return (
    <h1
      css={{
        paddingTop: 0,
        marginTop: 0,
        marginBottom: '1rem',
        fontWeight: 700
      }}
    >
      {children}
    </h1>
  )
}
