// Returns true for null, false, undefined and {}
function isFalsy (value) {
  return (
    value === null ||
    value === undefined ||
    value === false ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  )
}

function cleanObject (object) {
  if (isFalsy(object)) return null
  if (typeof object !== 'object') return object

  let acc = {},
    keys = Object.keys(object),
    hasFalsy = false
  for (let i = 0; i < keys.length; i++) {
    let value = object[keys[i]]
    const filteredValue = clean(value)
    if (filteredValue === null || filteredValue !== value) {
      hasFalsy = true
    }
    if (filteredValue !== null) {
      acc[keys[i]] = filteredValue
    }
  }
  return Object.keys(acc).length === 0 ? null : hasFalsy ? acc : object
}

function cleanArray (rules) {
  let hasFalsy = false
  const filtered = []
  rules.forEach(rule => {
    const filteredRule = clean(rule)
    if (filteredRule === null || filteredRule !== rule) {
      hasFalsy = true
    }
    if (filteredRule !== null) {
      filtered.push(filteredRule)
    }
  })
  return filtered.length == 0 ? null : hasFalsy ? filtered : rules
}

// Takes style array or object provided by user and clears all the falsy data
// If there is no styles left after filtration returns null
export default function clean (input) {
  return Array.isArray(input) ? cleanArray(input) : cleanObject(input)
}
