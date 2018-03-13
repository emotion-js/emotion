import {
  sheet,
  useStylisPlugin,
  injectGlobal,
  flush,
  css,
  hydrate,
  cx
} from '../';
// tslint:disable-next-line:no-implicit-dependencies
import React from 'react';

sheet.speedy(true);
sheet.inject();
sheet.insert('.foo { font-size: 1 };', 'some source map');
sheet.flush();

useStylisPlugin(() => {})([() => {}, () => {}])(null);

flush();

const cssObject = {
  height: 100,
  width: '100%',
  display: (true as boolean) && 'block',
  position: undefined,
  color: null,
  ':hover': {
    display: 'block'
  }
};

const className: string = css`
  ${(true as boolean) && ''}
  ${'bar'}
  ${css``}
  ${1}
  ${cssObject}
`;

const className2: string = css(cssObject);

css(() => ({
  height: 100
}));

css([
  { display: 'none' },
  [
    { position: false },
    { width: 100 }
  ]
]);

css(
  { display: 'none' },
  [
    { position: false },
    { width: 100 }
  ]
);

css(null);

injectGlobal`
  #foo {
    font-face: 'Foo';
  }
`;

const cxResult: string = cx(() => () => [
  () => [className, false && className2, 'modal'],
  () => [() => [className, () => ({ [className2]: true }), 'profile']]
]);

hydrate(['css-123', 'css-456']);

/*
 * Can use css prop, transpiled by babel plugin
 */

<div css={`color: red;`} />;
<div css={{ color: 'red' }} />;
