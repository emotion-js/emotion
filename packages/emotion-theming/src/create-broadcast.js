// https://github.com/styled-components/styled-components/blob/e05b3fe247e9d956bcde786cec376e32afb85bca/src/utils/create-broadcast.js
const createBroadcast = initialState => {
  const listeners = {}
  let id = 0
  let state = initialState

  function publish(nextState) {
    state = nextState

    for (const key in listeners) {
      const listener = listeners[key]
      if (listener === undefined) {
        continue
      }

      listener(state)
    }
  }

  function subscribe(listener) {
    const currentId = id
    listeners[currentId] = listener
    id += 1
    listener(state)
    return currentId
  }

  function unsubscribe(unsubID) {
    listeners[unsubID] = undefined
  }

  return { publish, subscribe, unsubscribe }
}

export default createBroadcast
