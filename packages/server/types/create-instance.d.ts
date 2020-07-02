// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

/// <reference types="node" />
import { EmotionCache } from '@emotion/utils'

export interface EmotionCritical {
  html: string
  ids: Array<string>
  css: string
}

export interface EmotionServer {
  extractCritical(html: string): EmotionCritical
  renderStylesToString(html: string): string
  renderStylesToNodeStream(): NodeJS.ReadWriteStream
}

export default function createEmotionServer(cache: EmotionCache): EmotionServer
