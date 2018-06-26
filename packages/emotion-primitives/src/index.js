import reactPrimitives from 'react-primitives'

import { createEmotionPrimitive } from './createEmotion'
import { splitProps } from './splitProps'

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

export default assignPrimitives(styled)
