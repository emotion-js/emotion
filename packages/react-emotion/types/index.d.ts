// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.3

import {
  CreateStyled,
  Interpolation,
  StyledComponent,
  StyledOptions,
  Themed,
} from 'create-emotion-styled';

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
