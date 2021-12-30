import Babel from '@babel/standalone'

export interface CompileRequestMessage {
  id: number
  code: string
}

export type BabelFileResult = ReturnType<typeof Babel['transform']>

export interface CompileSuccessMessage {
  id: number
  type: 'success'
  result: BabelFileResult
}

export interface CompileFailureMessage {
  id: number
  type: 'failure'
  error: unknown
}
