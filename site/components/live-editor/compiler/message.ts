export interface CompilationRequestMessage {
  id: number
  code: string
}

export interface CompilationSuccessMessage {
  id: number
  type: 'success'
  compiledCode: string
}

export interface CompilationFailureMessage {
  id: number
  type: 'failure'
  errorMessage: string
}
