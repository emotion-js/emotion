/// <reference types="jest" />
import * as emotion from 'emotion';
import {
  CreateSerializerOptions,
  createSerializer,
  createMatchers,
  getStyles,
} from '../';

createSerializer(emotion);
createSerializer(emotion, {});
createSerializer(emotion, {
  DOMElements: true,
});
createSerializer(emotion, {
  classNameReplacer() {
    return 'abc';
  },
});
createSerializer(emotion, {
  classNameReplacer(className) {
    return className;
  },
});
createSerializer(emotion, {
  classNameReplacer(className, index) {
    return `${className}-${index}`;
  },
});
createSerializer(emotion, 213 as any as CreateSerializerOptions);
// $ExpectError
createSerializer();
// $ExpectError
createSerializer(emotion, 1);
// $ExpectError
createSerializer(emotion, true);
// $ExpectError
createSerializer(emotion, {}, undefined as any);

// $ExpectError
createMatchers();
// $ExpectError
createMatchers(emotion, undefined as any);

expect.addSnapshotSerializer(createSerializer(emotion));
expect.extend(createMatchers(emotion));

expect({}).toHaveStyleRule('width', 'black');
expect({}).toHaveStyleRule('height', /red/);
expect({}).toHaveStyleRule('color', expect.stringContaining('20'));
// $ExpectError
expect({}).toHaveStyleRule(5, 'abc');
