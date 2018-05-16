import reactPrimitives from 'react-primitives'

import { createEmotionPrimitive } from './createEmotion'
import { splitProps } from './splitProps'

const primitives = ['Text', 'View', 'Image']

const assignPrimitives = (styled) => {
  Object.assign(
    styled,
    primitives.reduce((getters, alias) => {
      getters[alias.toLowerCase()] = styled(reactPrimitives[alias])
      return getters
    }, {})
  )

  Object.assign(
    styled,
    primitives.reduce((getters, alias) => {
      const tag = alias.toLowerCase()
      getters[alias] = styled[tag]()
      getters[alias].tag = reactPrimitives[alias]
      getters[alias].displayName = `emotion.${tag}`
      return getters
    }, {})
  )

  return styled
}

const emotion = createEmotionPrimitive(splitProps)

// Validate primitives accessed using the emotion function directly like emotion.TEXT`` or emotion.VIEW``
const validate = (target) => {
  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop]
      } else {
        throw new Error(`Cannot style invalid primitive ${prop}. Expected primitive to be one of ['Text', 'View', 'Image']`)
      }
    }
  }

  return new Proxy(target, handler)
}

export default validate(assignPrimitives(emotion))