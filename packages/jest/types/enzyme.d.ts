// TypeScript Version: 2.9

/// <reference types="jest" />

import {
  CreateSerializerOptions,
  EmotionMatchers,
  StyleRuleOptions
} from './index'
export { CreateSerializerOptions, EmotionMatchers, StyleRuleOptions }

type SnapshotSerializerPlugin = Extract<
  jest.SnapshotSerializerPlugin,
  { serialize: any }
>

export const matchers: EmotionMatchers

export function createEnzymeSerializer(
  options?: CreateSerializerOptions
): SnapshotSerializerPlugin
