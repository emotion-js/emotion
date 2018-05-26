// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.6

import {
  Interpolation,
  StyledOptions,
  Themed,
} from 'create-emotion-styled/types/common';
import {
  CreateStyled,
  StyledComponent,
} from './preact';

export * from 'emotion';

export type ThemedReactEmotionInterface<Theme extends object> = CreateStyled<Theme>;

export {
  CreateStyled,
  Interpolation,
  StyledComponent,
  StyledOptions,
  Themed,
};

declare const styled: CreateStyled;
export default styled;
