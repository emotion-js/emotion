// @flow

let finished = false
let available = false
let callbacks = []

if (typeof window !== 'undefined') {
  window.searchLoaded = () => {
    available = true
    finished = true
    callbacks.forEach(callback => {
      callback(available)
    })
  }
  window.searchError = () => {
    available = false
    finished = true
    callbacks.forEach(callback => {
      callback(available)
    })
  }
  if (window.searchErrored) {
    available = false
    finished = true
  }
  if (window.docsearch !== undefined) {
    available = true
    finished = true
  }
}

export const addCallback = (callback: boolean => mixed) => {
  if (finished) {
    callback(available)
  } else {
    callbacks.push(callback)
  }
}
