import {
  CSSContextType, Interpolation, RegisteredCache, ScopedInsertableStyles, StyleSheet,
  getRegisteredStyles, insertStyles, isBrowser, shouldSerializeToReactTree,
} from '@emotion/utils';

declare const testContext: CSSContextType;
declare const testRegisteredCache: RegisteredCache;

getRegisteredStyles(testRegisteredCache, [], 'abc');
getRegisteredStyles(testRegisteredCache, [], 'abc def');
getRegisteredStyles(testRegisteredCache, [], 'dead end');
getRegisteredStyles(testRegisteredCache, ['color: red;'], 'black parade');
// $ExpectError
getRegisteredStyles();
// $ExpectError
getRegisteredStyles(testRegisteredCache);

insertStyles(testContext, {
  name: 'abc',
  styles: 'color: green;background: red;',
});
// $ExpectError
insertStyles();
// $ExpectError
insertStyles(testContext);
// $ExpectError
insertStyles(testContext, {});
// $ExpectError
insertStyles(testContext, {
  name: 'abc',
});
// $ExpectError
insertStyles(testContext, {
  styles: 'font-size: 18px;',
});

const test0: boolean = isBrowser;
// $ExpectError
const test1: number = isBrowser;
const test2: boolean = shouldSerializeToReactTree;
// $ExpectError
const test3: number = shouldSerializeToReactTree;
