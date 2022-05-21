import {
  RuleListener,
  RuleModule
} from '@typescript-eslint/experimental-utils/dist/ts-eslint'
import resolveFrom from 'resolve-from'

export const espreeParser: string = resolveFrom(
  require.resolve('eslint'),
  'espree'
)

export type RuleModuleForTesting = RuleModule<
  string,
  readonly unknown[],
  RuleListener
>
