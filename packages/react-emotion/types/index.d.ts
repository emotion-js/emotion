// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.3

import {
  CreateStyled,
  Interpolation,
  StyledComponent,
  StyledOptions,
  Themed,
  StyledOtherComponent
} from 'create-emotion-styled';

export * from 'emotion';

export type ThemedReactEmotionInterface<Theme extends object> = CreateStyled<Theme>;

export {
  CreateStyled,
  Interpolation,
  StyledComponent,
  StyledOptions,
  Themed,
  StyledOtherComponent
};

declare const styled: CreateStyled;
export default styled;
