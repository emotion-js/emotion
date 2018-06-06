import reactPrimitives from 'react-primitives'

import { createEmotionPrimitive } from './createEmotion'
import { splitProps } from './splitProps'

let validate

const primitives = ['Text', 'View', 'Image']

const assignPrimitives = styled => {
  Object.assign(
    styled,
    primitives.reduce((getters, alias) => {
      getters[alias] = styled(reactPrimitives[alias])
      return getters
    }, {})
  )

  return styled
}

const styled = createEmotionPrimitive(splitProps)

if (process.env.NODE_ENV !== 'production' && typeof Proxy !== 'undefined') {
  const Platform = reactPrimitives.Platform

  // Validate primitives accessed using the emotion function directly like emotion.TEXT`` or emotion.VIEW``
  // Proxy is not supported in Native or Sketch. So makes sure that errors are not logged out in those env.
  if (Platform.OS === 'web') {
    validate = target => {
      const handler = {
        get: (obj, prop) => {
          if (prop in obj) {
            return obj[prop]
          } else {
            throw new Error(
              `Cannot style invalid primitive ${prop}. Expected primitive to be one of ['Text', 'View', 'Image']`
            )
          }
        }
      }

      return new Proxy(target, handler)
    }
  } else {
    validate = fn => fn
  }
}

export default validate(assignPrimitives(styled))
