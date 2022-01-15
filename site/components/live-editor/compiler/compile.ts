import {
  CompilationFailureMessage,
  CompilationRequestMessage,
  CompilationSuccessMessage
} from './message'

// Instantiate the worker in the browser only
const worker =
  typeof Worker === 'function'
    ? new Worker(new URL('babel-worker.ts', import.meta.url))
    : undefined

let count = 0

export function compile(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!worker) {
      resolve('')
      return
    }

    const id = ++count

    function handler({
      data
    }: MessageEvent<
      CompilationSuccessMessage | CompilationFailureMessage
    >): void {
      if (data.id !== id) return
      worker!.removeEventListener('message', handler)

      switch (data.type) {
        case 'success':
          resolve(data.compiledCode)
          break
        case 'failure':
          reject(new Error(data.errorMessage))
          break
        default:
          throw new Error('Received an unexpected message.')
      }
    }
    worker.addEventListener('message', handler)

    const request: CompilationRequestMessage = {
      id,
      code
    }
    worker.postMessage(request)
  })
}
