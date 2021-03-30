// prettier fails to parse this because of the import.meta
// i didn't really want to update prettier at the time of adding the import.meta because that would probably create changes everywhere
/* eslint-disable prettier/prettier */
let worker =
  typeof document === 'undefined'
    ? undefined
    : new Worker(new URL('./worker', import.meta.url))

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
          // eslint-disable-next-line no-prototype-builtins
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
