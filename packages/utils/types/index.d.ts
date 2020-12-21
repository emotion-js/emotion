export function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
): string
export function insertStyles(
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
): string
export * from './types'
import { RegisteredCache } from './types'
import { EmotionCache } from './types'
import { SerializedStyles } from './types'
