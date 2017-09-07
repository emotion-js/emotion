export const isFunction = test => typeof test === 'function'
export const isPlainObject = test =>
  Object.prototype.toString.call(test) === '[object Object]'
