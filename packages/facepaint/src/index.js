/* eslint-disable no-param-reassign */
import { css } from 'emotion'

export default breakpoints => {
  const mq = [''].concat(breakpoints)
  function flatten(obj) {
    return Object.keys(obj).reduce((slots, key) => {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((v, index) => {
          if (index === 0) {
            slots[key] = v
          } else if (!slots[mq[index]]) {
            slots[mq[index]] = { [key]: v }
          } else {
            slots[mq[index]][key] = v
          }
        })
      } else if (typeof obj[key] === 'object') {
        slots[key] = css(flatten(obj[key]))
      } else {
        slots[key] = obj[key]
      }
      return slots
    }, {})
  }

  return (...values) => values.map(flatten)
}
