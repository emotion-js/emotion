import { RegisteredCache, EmotionCache, SerializedStyles } from './types'
export declare function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
): string
export declare const registerStyles: (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) => void
export declare const insertStyles: (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) => string | undefined
export * from './types'
