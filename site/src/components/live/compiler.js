// eslint-disable-next-line import/no-webpack-loader-syntax
import BabelWorker from 'worker-loader!./worker'

let worker

if (typeof Worker !== 'undefined') {
  worker = new BabelWorker()
}

let count = 0

const call = (method, ...params) =>
  new Promise((resolve, reject) => {
    let id = ++count
    let handler = ({ data }) => {
      if (data.id !== id) return
      worker.removeEventListener('message', handler)
      if (data.error) {
        let error = new Error(data.error.message)
        for (let i in data.error) {
          if (data.error.hasOwnProperty(i)) {
            error[i] = data.error[i]
          }
        }
        reject(error)
      }
      resolve(data.result)
    }
    worker.addEventListener('message', handler)
    worker.postMessage({ id, method, params })
  })

const compile = code => call('transform', code)

export default compile
