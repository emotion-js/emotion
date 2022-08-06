import React, { ReactElement } from 'react'

export interface LiveContextData {
  code: string
  onCodeChange(code: string): void

  element: ReactElement | undefined
  errorMessage: string | undefined
}

export const LiveContext = React.createContext<LiveContextData>({
  code: '',
  onCodeChange: () => {},

  element: undefined,
  errorMessage: undefined
})
