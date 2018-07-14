import { Options, StyleSheet } from '@emotion/sheet';

new StyleSheet();
new StyleSheet({});
new StyleSheet({
  container: document.body,
});
new StyleSheet({
  container: document.head,
});
new StyleSheet({
  key: 'abc',
});
new StyleSheet({
  key: 'abc',
  maxLength: 200,
});
new StyleSheet({
  nonce: 'fefwe090rqr',
});
new StyleSheet({
  speedy: true,
});
// $ExpectError
new StyleSheet({
  maxLength: 'abc',
});
// $ExpectError
new StyleSheet({
  key: 120,
});
new StyleSheet({
  // $ExpectError
  kye: 'abc'
});

const styleSheet0 = new StyleSheet();
const styleSheet1: StyleSheet = styleSheet0;
const styleSheet2: StyleSheet = new StyleSheet();

const styleSheet = new StyleSheet();

styleSheet.insert('.name{ color: black; }');
styleSheet.insert('.cl{ width: 200px; height: 200px; }');
// $ExpectError
styleSheet.insert();
// $ExpectError
styleSheet.insert('.name{ color: black; }', (undefined as any));
// $ExpectError
styleSheet.insert('.name{ color: black; }', ...(undefined as any as Array<any>));

styleSheet.flush();
// $ExpectError
styleSheet.flush((undefined as any));
// $ExpectError
styleSheet.flush(...(undefined as any as Array<any>));
