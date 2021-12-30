import {
  BabelFileResult,
  CompileFailureMessage,
  CompileRequestMessage,
  CompileSuccessMessage
} from './types'

const worker = new Worker(new URL('./babel-worker.js', import.meta.url))

let count = 0

export function compile(code: string): Promise<BabelFileResult> {
  return new Promise((resolve, reject) => {
    const id = ++count

    function messageHandler({
      data
    }: MessageEvent<CompileSuccessMessage | CompileFailureMessage>): void {
      if (data.id !== id) return

      worker.removeEventListener('message', messageHandler)

      if (data.type === 'success') {
        resolve(data.result)
      } else {
        if (
          !(
            data.error &&
            typeof (data.error as { message?: unknown }).message === 'string'
          )
        ) {
          reject(new Error('Unknown compilation error.'))
          return
        }

        const workerError = data.error as {
          message: string
          [key: string]: unknown
        }
        const error = new Error(workerError.message)

        for (const [key, value] of Object.entries(
          data.error as Record<string, unknown>
        )) {
          if (key === 'message') continue
          ;(error as unknown as Record<string, unknown>)[key] = value
        }

        reject(error)
      }
    }

    worker.addEventListener('message', messageHandler)

    const requestMessage: CompileRequestMessage = { id, code }
    worker.postMessage(requestMessage)
  })
}
