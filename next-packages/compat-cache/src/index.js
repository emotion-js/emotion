// @flow

let createCompatCache = (emotion: *) => {
  // rename this property to cache later and remove this package and tell people to use .cache
  return emotion.caches
}

export default createCompatCache
