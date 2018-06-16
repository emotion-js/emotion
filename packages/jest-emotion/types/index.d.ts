// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.4

/// <reference types="jest" />
import { Emotion } from 'create-emotion';

export interface CreateSerializerOptions {
  classNameReplacer?: (className: string, index: number) => string;
  DOMElements?: boolean;
}

export function getStyles(emotion: Emotion): string;
export function createSerializer(emotion: Emotion, options?: CreateSerializerOptions): jest.SnapshotSerializerPlugin;
export function createMatchers(emotion: Emotion): jest.ExpectExtendMap;

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value: any): R;
    }
  }
}
