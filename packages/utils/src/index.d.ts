import { RegisteredCache, EmotionCache, SerializedStyles } from './types'
export declare function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
): string
export declare const insertStyles: (
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) => string | void
export * from './types'
