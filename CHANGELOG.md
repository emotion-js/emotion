## v10.0.0 (2018-10-27)

Emotion 10 is a big change that we're really excited about with improvements to the css prop, a Global component for dynamic global styles, zero config SSR, lots of small fixes and improvements and more with an incremental adoption strategy. For a higher-level overview, read the [Medium article on Emotion 10](). For a migration guide, visit [the migrating to Emotion 10 page on emotion.sh](https://emotion.sh/docs/migrating-to-emotion-10)

#### :rocket: Enhancement

- The css prop works without `babel-plugin-emotion`
  - The css prop receives the theme
  - Labels are added to the css prop without `babel-plugin-emotion` in some cases
- Add the Global and ClassNames components
- styled uses forwardRef
- Add the as prop to styled
- Providing options can be done via the CacheProvider
- The autoLabel and sourceMap options are enabled in development with the Babel Macros
- The autoLabel and sourceMap options are on by default in development in `babel-plugin-emotion`
- Add warning for kebab-case css properties in objects
- Add keyframes to snapshots with jest-emotion
- Add codemod rules for Emotion 10
- Fix SSR with \_ in labels
- Add warnings for unsafe pseudo classes

#### :boom: Breaking Change

- create-emotion no longer accepts a global context object
- Support for preact-emotion has been dropped(note that the emotion package still works with preact)
- Emotion only supports react@>=16.3
- The `channel` and `createBroadcast` exports from emotion-theming have been removed
- The `extractStatic` option to babel-plugin-emotion has been removed
- jest-emotion no longer accepts an emotion instance
- `create-emotion-server` accepts a cache instead of an emotion instance
- The css prop doesn't work via the babel plugin. `jsx` can be manually imported from `@emotion/core`(which can be automated with eslint-plugin-emotion) or [babel-plugin-jsx-pragmatic](https://github.com/jmm/babel-plugin-jsx-pragmatic) can be used.
- Functions in interpolations are stringified in css and cx calls(probably won't affect you very much, there's a warning about it in v9)
- `create-emotion` doesn't return a caches property and instead returns a cache property which is the same return value as `@emotion/cache`
- The `importedNames` option to babel-plugin-emotion is gone
- The `hoist` option is gone, hoisting always happens

## v9.2.7 (2018-07-29)

#### :rocket: Enhancement

- `native`, `primitives-core`, `primitives`
  - [#759](https://github.com/emotion-js/emotion/pull/759) Emotion Native. ([@nitin42](https://github.com/nitin42))
- `jest-emotion`
  - [#777](https://github.com/emotion-js/emotion/pull/777) add serializer file. ([@kentcdodds](https://github.com/kentcdodds))

#### Committers: 4

- Billy Vong ([billyvg](https://github.com/billyvg))
- Kent C. Dodds ([kentcdodds](https://github.com/kentcdodds))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Nitin Tulswani ([nitin42](https://github.com/nitin42))

## v9.2.6 (2018-07-15)

#### :rocket: Enhancement

- `create-emotion`
  - [#751](https://github.com/emotion-js/emotion/pull/751) classnames also accept undefined as value. ([@pasix](https://github.com/pasix))

#### :bug: Bug Fix

- `create-emotion`, `emotion`
  - [#695](https://github.com/emotion-js/emotion/pull/695) Generate the same class names for server and client if source maps are different. ([@mgroenhoff](https://github.com/mgroenhoff))

#### Committers: 2

- Iacopo ([pasix](https://github.com/pasix))
- Melvin Groenhoff ([mgroenhoff](https://github.com/mgroenhoff))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.2.5 (2018-07-07)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `@emotion/primitives`
  - [#658](https://github.com/emotion-js/emotion/pull/658) Emotion Primitives. ([@nitin42](https://github.com/nitin42))

#### :bug: Bug Fix

- `create-emotion-styled`, `preact-emotion`
  - [#737](https://github.com/emotion-js/emotion/pull/737) Add ComponentType overloading. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion-styled`, `create-emotion`, `emotion`, `preact-emotion`, `react-emotion`
  - [#729](https://github.com/emotion-js/emotion/pull/729) Enable css prop in Preact with TypeScript. ([@aaronjensen](https://github.com/aaronjensen))

#### :memo: Documentation

- Other
  - [#748](https://github.com/emotion-js/emotion/pull/748) update link to site in examples section. ([@bpote](https://github.com/bpote))
  - [#636](https://github.com/emotion-js/emotion/pull/636) Add eslint-plugin-emotion to docs. ([@alex-pex](https://github.com/alex-pex))
- `babel-plugin-emotion`, `emotion-theming`, `emotion`, `jest-emotion`, `site`
  - [#720](https://github.com/emotion-js/emotion/pull/720) Use emotion-next in the site, update to gatsby v2 and add Community page. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `babel-plugin-emotion`, `create-emotion-server`, `create-emotion-styled`, `create-emotion`, `emotion-server`, `emotion-theming`, `emotion`, `eslint-plugin-emotion`, `jest-emotion`, `preact-emotion`, `react-emotion`
  - [#747](https://github.com/emotion-js/emotion/pull/747) Change build system and update Jest. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 7

- Aaron Jensen ([aaronjensen](https://github.com/aaronjensen))
- Alexandre Paixao ([alex-pex](https://github.com/alex-pex))
- Brisha Pote ([bpote](https://github.com/bpote))
- Junyoung Clare Jang ([Ailrun](https://github.com/Ailrun))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Nitin Tulswani ([nitin42](https://github.com/nitin42))

## v9.2.4 (2018-06-22)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `create-emotion`
  - [#741](https://github.com/emotion-js/emotion/pull/741) Improve labels and upgrade @emotion/stylis. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `jest-emotion`
  - [#723](https://github.com/emotion-js/emotion/pull/723) Add typings for jest-emotion. ([@Ailrun](https://github.com/Ailrun))

#### :bug: Bug Fix

- `jest-emotion`
  - [#731](https://github.com/emotion-js/emotion/pull/731) Fix jest-emotion for preact. ([@aaronjensen](https://github.com/aaronjensen))
- `babel-plugin-emotion`
  - [#730](https://github.com/emotion-js/emotion/pull/730) No duplicated ast nodes. ([@Andarist](https://github.com/Andarist))

#### :house: Internal

- `create-emotion-server`
  - [#725](https://github.com/emotion-js/emotion/pull/725) create-emotion-server: refactor inline for performance. ([@apapirovski](https://github.com/apapirovski))
- `emotion-theming`
  - [#714](https://github.com/emotion-js/emotion/pull/714) Fix tsconfig for emotion-theming. ([@Ailrun](https://github.com/Ailrun))

#### Committers: 6

- Aaron Jensen ([aaronjensen](https://github.com/aaronjensen))
- Anatoli Papirovski ([apapirovski](https://github.com/apapirovski))
- Junyoung Clare Jang ([Ailrun](https://github.com/Ailrun))
- Konrad Kruk ([konradk](https://github.com/konradk))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.2.3 (2018-06-09)

#### :bug: Bug Fix

- `create-emotion-styled`, `emotion-server`, `emotion-theming`, `emotion`, `preact-emotion`, `react-emotion`
  - [#710](https://github.com/emotion-js/emotion/pull/710) Remove allowSyntheticDefaultImports from typings. ([@Ailrun](https://github.com/Ailrun))

#### Committers: 1

- Junyoung Clare Jang ([Ailrun](https://github.com/Ailrun))

## v9.2.1 (2018-06-07)

#### :bug: Bug Fix

- `create-emotion-styled`, `create-emotion`, `emotion-theming`, `emotion`, `preact-emotion`, `react-emotion`
  - [#704](https://github.com/emotion-js/emotion/pull/704) Update rollup to fix bundle size regression. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.2.0 (2018-06-07)

#### :rocket: Enhancement

- `react-emotion`
  - [#678](https://github.com/emotion-js/emotion/pull/678) Fix react-emotion typing. ([@Ailrun](https://github.com/Ailrun))
- `preact-emotion`
  - [#680](https://github.com/emotion-js/emotion/pull/680) Add typings for preact-emotion. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion-styled`, `create-emotion`
  - [#676](https://github.com/emotion-js/emotion/pull/676) Add ClassInterpolation to typings. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion-styled`
  - [#671](https://github.com/emotion-js/emotion/pull/671) Fix typing for create-emotion-styled. ([@Ailrun](https://github.com/Ailrun))
  - [#668](https://github.com/emotion-js/emotion/pull/668) Add typing for create-emotion-styled. ([@Ailrun](https://github.com/Ailrun))
- `jest-emotion`
  - [#662](https://github.com/emotion-js/emotion/pull/662) Add toHaveStyleRule to jest-emotion. ([@danreeves](https://github.com/danreeves))
- `create-emotion-styled`, `react-emotion`
  - [#670](https://github.com/emotion-js/emotion/pull/670) compose shouldForwardProp. ([@brentertz](https://github.com/brentertz))
  - [#659](https://github.com/emotion-js/emotion/pull/659) Forward .defaultProps when reusing \_\_emotion_base. ([@Andarist](https://github.com/Andarist))
- `emotion`
  - [#667](https://github.com/emotion-js/emotion/pull/667) Fix typing for emotion package. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion`
  - [#663](https://github.com/emotion-js/emotion/pull/663) Add TS typings to create-emotion. ([@Ailrun](https://github.com/Ailrun))

#### :bug: Bug Fix

- `babel-plugin-emotion`, `create-emotion`, `emotion-server`, `emotion`
  - [#650](https://github.com/emotion-js/emotion/pull/650) Remove comments from styles in babel-plugin-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `jest-emotion`
  - [#641](https://github.com/emotion-js/emotion/pull/641) Fix jest-emotion in certain cases with nested selectors. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- `site`
  - [#679](https://github.com/emotion-js/emotion/pull/679) Update typescript document to match with current types. ([@Ailrun](https://github.com/Ailrun))
- Other
  - [#691](https://github.com/emotion-js/emotion/pull/691) Fix example in TS docs. ([@gillchristian](https://github.com/gillchristian))
  - [#660](https://github.com/emotion-js/emotion/pull/660) added govuk-react to list of examples. ([@marksy](https://github.com/marksy))
  - [#656](https://github.com/emotion-js/emotion/pull/656) Tweak babel.md. ([@smhutch](https://github.com/smhutch))

#### :house: Internal

- `create-emotion-server`, `emotion-server`, `emotion-theming`, `emotion`, `react-emotion`
  - [#692](https://github.com/emotion-js/emotion/pull/692) Add Typescript definitions for 'create-emotion-server' and 'emotion-server'. ([@mgroenhoff](https://github.com/mgroenhoff))
- `create-emotion`
  - [#698](https://github.com/emotion-js/emotion/pull/698) Remove unused type in create-emotion typing. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion-styled`, `emotion-theming`, `preact-emotion`, `react-emotion`
  - [#694](https://github.com/emotion-js/emotion/pull/694) Add react/preact as peer-dependencies to react-emotion/preact-emotion. ([@mgroenhoff](https://github.com/mgroenhoff))
- Other
  - [#699](https://github.com/emotion-js/emotion/pull/699) chore: add Node.js 10. ([@DanielRuf](https://github.com/DanielRuf))
  - [#681](https://github.com/emotion-js/emotion/pull/681) Update yarn.lock again.... ([@Ailrun](https://github.com/Ailrun))
  - [#677](https://github.com/emotion-js/emotion/pull/677) Add type test to TravisCI. ([@Ailrun](https://github.com/Ailrun))
- `babel-plugin-emotion`, `site`
  - [#674](https://github.com/emotion-js/emotion/pull/674) Update yarn.lock. ([@Ailrun](https://github.com/Ailrun))
- `create-emotion`, `emotion`
  - [#643](https://github.com/emotion-js/emotion/pull/643) Deprecate passing functions to css and cx. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `react-emotion`
  - [#635](https://github.com/emotion-js/emotion/pull/635) Add StyledComponent to allowed Interpolation types. ([@mvestergaard](https://github.com/mvestergaard))

#### Committers: 12

- Brent Ertz ([brentertz](https://github.com/brentertz))
- Christian Gill ([gillchristian](https://github.com/gillchristian))
- Dan Reeves ([danreeves](https://github.com/danreeves))
- Daniel Ruf ([DanielRuf](https://github.com/DanielRuf))
- Junyoung Clare Jang ([Ailrun](https://github.com/Ailrun))
- Mark Chambers ([marksy](https://github.com/marksy))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mathias Vestergaard ([mvestergaard](https://github.com/mvestergaard))
- Melvin Groenhoff ([mgroenhoff](https://github.com/mgroenhoff))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Scott Martin Hutcheson ([smhutch](https://github.com/smhutch))
- osdevisnot ([osdevisnot](https://github.com/osdevisnot))

## v9.1.3 (2018-05-07)

#### :rocket: Enhancement

- `create-emotion`, `emotion`
  - [#634](https://github.com/emotion-js/emotion/pull/634) Support array fallback syntax in objects. ([@mitchellhamilton](https://github.com/mitchellhamilton))
  - [#633](https://github.com/emotion-js/emotion/pull/633) Add warning for invalid content values in objects. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2

- Andrew Hutchings ([ahutchings](https://github.com/ahutchings))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.1.2 (2018-04-17)

#### :rocket: Enhancement

- `jest-emotion`
  - [#622](https://github.com/emotion-js/emotion/pull/622) Add support to jest-emotion for printing DOM Elements (#619). ([@rszewczyk](https://github.com/rszewczyk))
- `emotion-theming`
  - [#614](https://github.com/emotion-js/emotion/pull/614) Export "createBroadcast". ([@billyvg](https://github.com/billyvg))
- `create-emotion-styled`, `react-emotion`
  - [#616](https://github.com/emotion-js/emotion/pull/616) Support shouldForwardProp in styled's options. ([@Andarist](https://github.com/Andarist))

#### :house: Internal

- `babel-plugin-emotion`, `create-emotion-server`, `create-emotion-styled`, `create-emotion`, `emotion-utils`, `emotion`, `site`
  - [#628](https://github.com/emotion-js/emotion/pull/628) Remove emotion-utils and use packages from emotion-js/next. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `create-emotion`, `emotion`
  - [#624](https://github.com/emotion-js/emotion/pull/624) Closes [#623](https://github.com/emotion-js/emotion/issues/623) (remove redundant HTML attribute). ([@karol-majewski](https://github.com/karol-majewski))
- `create-emotion-styled`, `emotion-utils`
  - [#620](https://github.com/emotion-js/emotion/pull/620) Use @emotion/memoize. ([@Andarist](https://github.com/Andarist))

#### Committers: 8

- Billy Vong ([billyvg](https://github.com/billyvg))
- Claudio Procida ([claudiopro](https://github.com/claudiopro))
- Karol Majewski ([karol-majewski](https://github.com/karol-majewski))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Rob Szewczyk ([rszewczyk](https://github.com/rszewczyk))
- Thomas Ingram ([ravinggenius](https://github.com/ravinggenius))

## v9.1.1 (2018-04-04)

#### :rocket: Enhancement

- `create-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#609](https://github.com/emotion-js/emotion/pull/609) Allow labels to be composed. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `create-emotion-styled`
  - [#612](https://github.com/emotion-js/emotion/pull/612) Use @emotion/is-prop-valid for checking valid props on string tags. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamiltosn))

## v9.1.0 (2018-03-24)

#### :rocket: Enhancement

- `babel-plugin-emotion`
  - [#583](https://github.com/emotion-js/emotion/pull/583) Output dir support. ([@wardpeet](https://github.com/wardpeet))

#### :bug: Bug Fix

- `create-emotion`
  - [#605](https://github.com/emotion-js/emotion/pull/605) Fix SSR with multiple createEmotion calls with the same context. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion`
  - [#596](https://github.com/emotion-js/emotion/pull/596) Remove fontface type. ([@renanrboliveira](https://github.com/renanrboliveira))
- `react-emotion`
  - [#590](https://github.com/emotion-js/emotion/pull/590) Fixed TSLint errors. ([@alex-pex](https://github.com/alex-pex))
- `create-emotion-styled`, `react-emotion`
  - [#589](https://github.com/emotion-js/emotion/pull/589) Carry styles from flattened components with withComponent. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`
  - [#584](https://github.com/emotion-js/emotion/pull/584) Preserve existing options passed to styled calls. ([@Andarist](https://github.com/Andarist))

#### Committers: 8

- Alexandre PAIXAO ([alex-pex](https://github.com/alex-pex))
- Felix Jung ([felixjung](https://github.com/felixjung))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Rajan Singh ([woahitsraj](https://github.com/woahitsraj))
- Renan R. Oliveira ([renanrboliveira](https://github.com/renanrboliveira))
- Utopia፲ ([utopiaio](https://github.com/utopiaio))
- Ward Peeters ([wardpeet](https://github.com/wardpeet))

## v9.0.2 (2018-02-23)

#### :bug: Bug Fix

- `create-emotion`
  - [#575](https://github.com/emotion-js/emotion/pull/575) Remove Array.from() usage to support IE11. ([@asistapl](https://github.com/asistapl))

#### :memo: Documentation

- Other
  - [#577](https://github.com/emotion-js/emotion/pull/577) Add Website Development to CONTRIBUTING.md. ([@azizhk](https://github.com/azizhk))
- `emotion`, `site`
  - [#576](https://github.com/emotion-js/emotion/pull/576) Fix links on both github and website. ([@azizhk](https://github.com/azizhk))

#### Committers: 2

- Asista ([asistapl](https://github.com/asistapl))
- Aziz Khambati ([azizhk](https://github.com/azizhk))

## v9.0.1 (2018-02-13)

#### :rocket: Enhancement

- `babel-plugin-emotion`
  - [#566](https://github.com/emotion-js/emotion/pull/566) Add option for label formatting. ([@sgal](https://github.com/sgal))

#### :bug: Bug Fix

- `create-emotion-styled`, `create-emotion`, `emotion`
  - [#568](https://github.com/emotion-js/emotion/pull/568) Change component selector error throwing. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion-utils`
  - [#567](https://github.com/emotion-js/emotion/pull/567) Line clamp property needs webkit vendor prefix. ([@jschr](https://github.com/jschr))

#### Committers: 5

- Alex LaFroscia ([alexlafroscia](https://github.com/alexlafroscia))
- Chris Bolin ([chrisbolin](https://github.com/chrisbolin))
- Jordan Schroter ([jschr](https://github.com/jschr))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Sergey Galchenko ([sgal](https://github.com/sgal))

## v9.0.0 (2018-02-04)

Emotion 9 introduces [instances](https://emotion.sh/docs/create-emotion), jest-emotion, two new SSR methods, a bunch of fixes and a brand new website!! Instances allow you to customize prefixing options, run plugins during CSS processing, set nonces for CSP and they're totally optional so if you don't need instances keep on using `emotion`. jest-emotion offers a better out of the box experience and has the potential for more features in the future. emotion-server has new methods for inlining CSS in HTML right before it's needed and adds support for streaming.

#### :rocket: Enhancement

- `jest-emotion`
  - [#495](https://github.com/emotion-js/emotion/pull/495) Add jest-emotion ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion-server`
  - [#448](https://github.com/emotion-js/emotion/pull/448) Add SSR streaming API and stuff ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Migrating from Emotion 8

1.  Emotion no longer has `fontFace`, you can use `injectGlobal` to insert font faces instead.

```diff
-import { fontFace } from 'emotion'
+import { injectGlobal } from 'emotion'

-fontFace`
-  font-family: 'Oxygen';
-  font-style: normal;
-  font-weight: 400;
-  src: local('Oxygen Regular'), local('Oxygen-Regular'),
-    url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2)
-      format('woff2');
-  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
-    U+2000-206f, U+2074, U+20ac, U+2212, U+2215;
-`
+injectGlobal`
+  @font-face {
+    font-family: 'Oxygen';
+    font-style: normal;
+    font-weight: 400;
+    src: local('Oxygen Regular'), local('Oxygen-Regular'),
+      url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2)
+        format('woff2');
+    unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
+      U+2000-206f, U+2074, U+20ac, U+2212, U+2215;
+  }
+`
```

2.  If you used [jest-glamor-react](https://github.com/kentcdodds/jest-glamor-react) in emotion 8, you can switch to jest-emotion by installing it and changing your test setup as shown below.

```bash
npm install --save jest-emotion
```

```diff
-import { sheet } from 'emotion'
-import serializer from 'jest-glamor-react'
+import * as emotion from 'emotion'
+import { createSerializer } from 'jest-emotion'

-expect.addSnapshotSerializer(serializer(sheet))
+expect.addSnapshotSerializer(createSerializer(emotion))
```

3.  Emotion doesn't automatically insert semicolons in styles now. We recommend using [Prettier](https://prettier.io/) to ensure that your styles are formatted correctly.
4.  That's It!! You might want to check the more detailed list of breaking changes below just in case though.

#### :boom: Breaking Change

- `emotion`
  - `fontFace` is gone, it can be replaced with `injectGlobal` with a regular css `@font-face` rule.
  - The `registered` and `inserted` caches are no longer exports of emotion (they're now on the `caches` object which is exported by emotion) but these aren't documented and should never be relied on externally so this shouldn't cause a problem.
  - Semicolons are not automatically added in style blocks.
  - `StyleSheet` is no longer used for SSR, this is completely internal(except that emotion exports an instance of this as `sheet`) so it shouldn't cause any problems.
- `emotion-server`
  - `extractCritical` no longer returns a rules property, this was never documented so it shouldn't cause any problems.

#### :boom: Breaking Change

- `babel-plugin-emotion`, `create-emotion-server`, `create-emotion-styled`, `create-emotion`, `emotion-server`, `emotion-theming`, `emotion-utils`, `emotion`, `jest-emotion`, `preact-emotion`, `react-emotion`, `site`
  - [#464](https://github.com/emotion-js/emotion/pull/464) Add Instances. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion`, `react-emotion`
  - [#503](https://github.com/emotion-js/emotion/pull/503) [babel-plugin-emotion][react-emotion] Adds Support for Components as Selectors Using the Object Syntax #501. ([@smlmrkhlms](https://github.com/smlmrkhlms))

#### :bug: Bug Fix

- `emotion`
  - [#500](https://github.com/emotion-js/emotion/pull/500) Fix styles getting injected in the classname (#492). ([@pimmey](https://github.com/pimmey))
- `emotion-theming`
  - [#497](https://github.com/emotion-js/emotion/pull/497) Fixed nested themes not being republished on outer theme changes. ([@Andarist](https://github.com/Andarist))
- `jest-emotion`
  - [#504](https://github.com/emotion-js/emotion/pull/504) Change class name prefix in jest-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `emotion`
  - [#502](https://github.com/emotion-js/emotion/pull/502) Pass converted arguments as array directly to the underlaying classnames helper. ([@Andarist](https://github.com/Andarist))
- `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#498](https://github.com/emotion-js/emotion/pull/498) used a simpler hashing strategy when a file system is available. ([@probablyup](https://github.com/probablyup))
- `create-emotion`
  - [#550](https://github.com/emotion-js/emotion/pull/550) Check for `document` instead of `window`. ([@alexlafroscia](https://github.com/alexlafroscia))
- `emotion-utils`
  - [#544](https://github.com/emotion-js/emotion/pull/544) Change hash implementation. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 12

- Evan Scott ([probablyup](https://github.com/probablyup))
- Mark Holmes ([smlmrkhlms](https://github.com/smlmrkhlms))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Yegor Borisenco ([pimmey](https://github.com/pimmey))
- Dara Hak ([darahak](https://github.com/darahak))
- Divyanshu Maithani ([divyanshu013](https://github.com/divyanshu013))
- Haroen Viaene ([Haroenv](https://github.com/Haroenv))
- Mouad Debbar ([mdebbar](https://github.com/mdebbar))
- Oliver Turner ([oliverturner](https://github.com/oliverturner))
- [ARChilton](https://github.com/ARChilton)
- ryota-murakami ([ryota-murakami](https://github.com/ryota-murakami))
- Alex LaFroscia ([alexlafroscia](https://github.com/alexlafroscia))
- Devin Otway ([TroutZen](https://github.com/TroutZen))

## v9.0.0-3 (2018-02-03)

#### :bug: Bug Fix

- `create-emotion-styled`, `emotion`, `site`
  - [#540](https://github.com/emotion-js/emotion/pull/540) Fix create-emotion-styled proxy with react-hot-loader and add appearance: none to search input. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `create-emotion`
  - [#550](https://github.com/emotion-js/emotion/pull/550) Check for `document` instead of `window`. ([@alexlafroscia](https://github.com/alexlafroscia))
- `emotion-utils`
  - [#544](https://github.com/emotion-js/emotion/pull/544) Change hash implementation. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 3

- Alex LaFroscia ([alexlafroscia](https://github.com/alexlafroscia))
- Devin Otway ([TroutZen](https://github.com/TroutZen))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.0.0-2 (2018-01-17)

#### :rocket: Enhancement

- `create-emotion-styled`, `create-emotion`, `emotion-utils`, `emotion`, `react-emotion`
  - [#516](https://github.com/emotion-js/emotion/pull/516) Throw a nice error when using the styled shorthand without babel-plugin-emotion and remove duplication in component selector code. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix

- `create-emotion`, `emotion`
  - [#532](https://github.com/emotion-js/emotion/pull/532) Fix extra whitespace in cx. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- Other
  - [#533](https://github.com/emotion-js/emotion/pull/533) Reusable Media Queries with String Styles wasn't working. ([@ARChilton](https://github.com/ARChilton))
  - [#529](https://github.com/emotion-js/emotion/pull/529) Update examples in Readme. ([@divyanshu013](https://github.com/divyanshu013))
  - [#509](https://github.com/emotion-js/emotion/pull/509) fix Readme markdown list syntax. ([@ryota-murakami](https://github.com/ryota-murakami))
  - [#505](https://github.com/emotion-js/emotion/pull/505) Fixed jest-glamor-react -> jest-emotion upgrade description. ([@Andarist](https://github.com/Andarist))
- `site`
  - [#530](https://github.com/emotion-js/emotion/pull/530) Add search to docs. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`
  - [#514](https://github.com/emotion-js/emotion/pull/514) Better example for hoist option. ([@Andarist](https://github.com/Andarist))

#### :house: Internal

- `create-emotion-styled`, `create-emotion`, `emotion-server`, `emotion`, `site`
  - [#534](https://github.com/emotion-js/emotion/pull/534) Update prettier and add .prettierrc.yaml. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`, `benchmarks`, `emotion`
  - [#525](https://github.com/emotion-js/emotion/pull/525) chore: upgrade to babel-plugin-macros. ([@Haroenv](https://github.com/Haroenv))
- Other
  - [#507](https://github.com/emotion-js/emotion/pull/507) Use lerna-alias for rollup config + fixed rollup plugins order. ([@Andarist](https://github.com/Andarist))
  - [#506](https://github.com/emotion-js/emotion/pull/506) Added lerna-alias dep to automate creating jest aliases. ([@Andarist](https://github.com/Andarist))

#### Committers: 9

- Dara Hak ([darahak](https://github.com/darahak))
- Divyanshu Maithani ([divyanshu013](https://github.com/divyanshu013))
- Haroen Viaene ([Haroenv](https://github.com/Haroenv))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Mouad Debbar ([mdebbar](https://github.com/mdebbar))
- Oliver Turner ([oliverturner](https://github.com/oliverturner))
- [ARChilton](https://github.com/ARChilton)
- ryota-murakami ([ryota-murakami](https://github.com/ryota-murakami))

## v9.0.0-1 (2017-12-23)

#### :bug: Bug Fix

- `babel-plugin-emotion`, `create-emotion`, `emotion-theming`, `emotion`, `jest-emotion`, `react-emotion`
  - [#504](https://github.com/emotion-js/emotion/pull/504) Change class name prefix in jest-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v9.0.0-0 (2017-12-23)

#### :boom: Breaking Change

- `babel-plugin-emotion`, `create-emotion-server`, `create-emotion-styled`, `create-emotion`, `emotion-server`, `emotion-theming`, `emotion-utils`, `emotion`, `jest-emotion`, `preact-emotion`, `react-emotion`, `site`
  - [#464](https://github.com/emotion-js/emotion/pull/464) Add Instances. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion`, `react-emotion`
  - [#503](https://github.com/emotion-js/emotion/pull/503) [babel-plugin-emotion][react-emotion] Adds Support for Components as Selectors Using the Object Syntax #501. ([@smlmrkhlms](https://github.com/smlmrkhlms))

#### :bug: Bug Fix

- `emotion`
  - [#500](https://github.com/emotion-js/emotion/pull/500) Fix styles getting injected in the classname (#492). ([@pimmey](https://github.com/pimmey))
- `emotion-theming`
  - [#497](https://github.com/emotion-js/emotion/pull/497) Fixed nested themes not being republished on outer theme changes. ([@Andarist](https://github.com/Andarist))

#### :house: Internal

- `emotion`
  - [#502](https://github.com/emotion-js/emotion/pull/502) Pass converted arguments as array directly to the underlaying classnames helper. ([@Andarist](https://github.com/Andarist))
- `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#498](https://github.com/emotion-js/emotion/pull/498) used a simpler hashing strategy when a file system is available. ([@probablyup](https://github.com/probablyup))

#### Committers: 5

- Evan Scott ([probablyup](https://github.com/probablyup))
- Mark Holmes ([smlmrkhlms](https://github.com/smlmrkhlms))
- Mateusz Burzyński ([Andarist](https://github.com/Andarist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Yegor Borisenco ([pimmey](https://github.com/pimmey))

## v8.0.12 (2017-12-01)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion-server`, `emotion-theming`, `emotion-utils`, `emotion`, `react-emotion`, `site`
  - [#474](https://github.com/emotion-js/emotion/pull/474) Reimplement component selectors. ([@probablyup](https://github.com/probablyup))

#### :bug: Bug Fix

- `babel-plugin-emotion`
  - [#483](https://github.com/emotion-js/emotion/pull/483) Fix css prop in babel 7 with module transformer and fix source maps in latest babel 7 beta. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion`
  - [#480](https://github.com/emotion-js/emotion/pull/480) Do not add px to css custom-properties. ([@TrySound](https://github.com/TrySound))

#### Committers: 3

- Bogdan Chadkin ([TrySound](https://github.com/TrySound))
- Evan Scott ([probablyup](https://github.com/probablyup))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.11 (2017-11-24)

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion`, `react-emotion`
  - [#465](https://github.com/emotion-js/emotion/pull/465) Add SVG attributes. ([@sleepycat](https://github.com/sleepycat))
- `babel-plugin-emotion`, `emotion`
  - [#458](https://github.com/emotion-js/emotion/pull/458) Fix source maps without a semicolon or newline after the last declaration. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `emotion-theming`
  - [#459](https://github.com/emotion-js/emotion/pull/459) Create rollup builds with Babel 7. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion-theming`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  - [#457](https://github.com/emotion-js/emotion/pull/457) Update rollup. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2

- Mike Williamson ([sleepycat](https://github.com/sleepycat))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.10 (2017-11-07)

#### :rocket: Enhancement

- `react-emotion`
  - [#443](https://github.com/emotion-js/emotion/pull/443) Don't filter props on string tags started with Uppercase letter. ([@asvetliakov](https://github.com/asvetliakov))
- `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#375](https://github.com/emotion-js/emotion/pull/375) Add label property and autoLabel option for babel-plugin-emotion. ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix

- `babel-plugin-emotion`, `benchmarks`, `emotion-server`, `emotion-theming`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`, `site`
  - [#440](https://github.com/emotion-js/emotion/pull/440) Babel 7 compatibility and change tests. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- `emotion-theming`
  - [#445](https://github.com/emotion-js/emotion/pull/445) docs(emotion-theming): fix typo in README of packages/emotion-theming. ([@cherealnice](https://github.com/cherealnice))
- Other
  - [#444](https://github.com/emotion-js/emotion/pull/444) docs(css): fix import in example. ([@justinobney](https://github.com/justinobney))
  - [#441](https://github.com/emotion-js/emotion/pull/441) Object style docs. ([@tkh44](https://github.com/tkh44))
  - [#439](https://github.com/emotion-js/emotion/pull/439) Add docs for media queries and reusable media queries. ([@dstaley](https://github.com/dstaley))
  - [#438](https://github.com/emotion-js/emotion/pull/438) Add blazity.com to In the Wild section 🔥. ([@hmeissner](https://github.com/hmeissner))
  - [#435](https://github.com/emotion-js/emotion/pull/435) add design-system-utils to ecosystem. ([@mrmartineau](https://github.com/mrmartineau))
  - [#429](https://github.com/emotion-js/emotion/pull/429) Updates README Ecosystem with ShevyJS. ([@kyleshevlin](https://github.com/kyleshevlin))
- `babel-plugin-emotion`
  - [#436](https://github.com/emotion-js/emotion/pull/436) Fix typo in package description. ([@ismamz](https://github.com/ismamz))
  - [#431](https://github.com/emotion-js/emotion/pull/431) extractStatic Default Value in Readme. ([@malectro](https://github.com/malectro))

#### :house: Internal

- `emotion-theming`, `emotion`, `react-emotion`
  - [#421](https://github.com/emotion-js/emotion/pull/421) Switched to using dtslint from just running tsc --noEmit for typescript tests. ([@cameron-martin](https://github.com/cameron-martin))

#### Committers: 12

- Alexey Svetliakov ([asvetliakov](https://github.com/asvetliakov))
- Cameron Martin ([cameron-martin](https://github.com/cameron-martin))
- Dan Cherouny ([cherealnice](https://github.com/cherealnice))
- Dylan Staley ([dstaley](https://github.com/dstaley))
- Hugo Meissner ([hmeissner](https://github.com/hmeissner))
- Ismael Martínez ([ismamz](https://github.com/ismamz))
- Justin Obney ([justinobney](https://github.com/justinobney))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Kyle Shevlin ([kyleshevlin](https://github.com/kyleshevlin))
- Kyle Warren ([malectro](https://github.com/malectro))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- ZΛNDΞR ([mrmartineau](https://github.com/mrmartineau))

## v8.0.9 (2017-10-23)

#### :rocket: Enhancement

- `react-emotion`
  - [#426](https://github.com/emotion-js/emotion/pull/426) Added TypeScript definitions for innerRef. ([@cameron-martin](https://github.com/cameron-martin))
- `emotion`
  - [#416](https://github.com/emotion-js/emotion/pull/416) Added TypeScript definitions for css prop. ([@cameron-martin](https://github.com/cameron-martin))
- `babel-plugin-emotion`, `benchmarks`
  - [#414](https://github.com/emotion-js/emotion/pull/414) Automatic hoisting. ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion`
  - [#428](https://github.com/emotion-js/emotion/pull/428) Fix editing styles in devtools with source maps. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- [#423](https://github.com/emotion-js/emotion/pull/423) Fix incorrect usage of css variable in docs. ([@ekeric13](https://github.com/ekeric13))
- [#413](https://github.com/emotion-js/emotion/pull/413) Fix a typo in docs on composition. ([@ervasive](https://github.com/ervasive))
- [#412](https://github.com/emotion-js/emotion/pull/412) Remove dead links. ([@greggb](https://github.com/greggb))

#### :house: Internal

- `babel-plugin-emotion`, `benchmarks`, `emotion-server`, `emotion-theming`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`, `site`
  - [#415](https://github.com/emotion-js/emotion/pull/415) Use yarn workspaces. ([@tkh44](https://github.com/tkh44))
- `react-emotion`
  - [#420](https://github.com/emotion-js/emotion/pull/420) Fix component type in TS typings. ([@asvetliakov](https://github.com/asvetliakov))
- `emotion-theming`, `react-emotion`
  - [#419](https://github.com/emotion-js/emotion/pull/419) Typescript typings: Added emotion-theming typings and fixed react-emotion typings. ([@asvetliakov](https://github.com/asvetliakov))
- `emotion`
  - [#417](https://github.com/emotion-js/emotion/pull/417) Added TypeScript definitions for the newly-added cx function.. ([@cameron-martin](https://github.com/cameron-martin))

#### Committers: 7

- Alexey Svetliakov ([asvetliakov](https://github.com/asvetliakov))
- Cameron Martin ([cameron-martin](https://github.com/cameron-martin))
- Eric Kennedy ([ekeric13](https://github.com/ekeric13))
- Gregg Brewster ([greggb](https://github.com/greggb))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Ruslan Vasiliev ([ervasive](https://github.com/ervasive))

## v8.0.8 (2017-10-16)

#### :rocket: Enhancement

- `emotion`
  - [#397](https://github.com/emotion-js/emotion/pull/397) Add a basic cx api so that users can merge emotion and custom classes. ([@tkh44](https://github.com/tkh44))

#### :memo: Documentation

- [#410](https://github.com/emotion-js/emotion/pull/410) added gatsbythemes.com to the list In The Wild in the README. ([@saschajullmann](https://github.com/saschajullmann))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Sascha Jullmann ([saschajullmann](https://github.com/saschajullmann))

## v8.0.7 (2017-10-16)

#### :rocket: Enhancement

- `emotion`
  - [#338](https://github.com/emotion-js/emotion/pull/338) change "DO-NOT-USE" to "emotion.umd" in umd file names. ([@tkh44](https://github.com/tkh44))
- `react-emotion`
  - [#398](https://github.com/emotion-js/emotion/pull/398) Add types to react-emotion. ([@renatorib](https://github.com/renatorib))

#### :memo: Documentation

- `emotion-theming`, `emotion`
  - [#408](https://github.com/emotion-js/emotion/pull/408) readme and doc consolidation updates. ([@greggb](https://github.com/greggb))
- Other
  - [#407](https://github.com/emotion-js/emotion/pull/407) Clarify Babel plugin usage in install docs. ([@wKovacs64](https://github.com/wKovacs64))

#### Committers: 5

- Gregg Brewster ([greggb](https://github.com/greggb))
- Justin Hall ([wKovacs64](https://github.com/wKovacs64))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Renato Ribeiro ([renatorib](https://github.com/renatorib))

## v8.0.6 (2017-10-14)

#### :rocket: Enhancement

- `emotion`
  - [#379](https://github.com/emotion-js/emotion/pull/379) Added TypeScript types and tests for the emotion package.. ([@cameron-martin](https://github.com/cameron-martin))

#### :house: Internal

- `babel-plugin-emotion`, `emotion`, `react-emotion`, `stylis-plugin-emotion`
  - [#406](https://github.com/emotion-js/emotion/pull/406) Remove stylis-plugin-emotion and use stylis-rule-sheet. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `emotion`
  - [#392](https://github.com/emotion-js/emotion/pull/392) Remove flatten. ([@tkh44](https://github.com/tkh44))

#### Committers: 4

- Cameron Martin ([cameron-martin](https://github.com/cameron-martin))
- Hosmel Quintana ([hosmelq](https://github.com/hosmelq))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.5 (2017-10-07)

#### :memo: Documentation

- [#390](https://github.com/emotion-js/emotion/pull/390) jest-glamor-react docs. ([@greggb](https://github.com/greggb))

#### :house: Internal

- `emotion`, `stylis-plugin-emotion`
  - [#391](https://github.com/emotion-js/emotion/pull/391) Extract insertion plugin into stylis-plugin-emotion. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Gregg Brewster ([greggb](https://github.com/greggb))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.4 (2017-10-07)

#### :house: Internal

- `emotion`, `react-emotion`
  - [#387](https://github.com/emotion-js/emotion/pull/387) Insert nested selectors differently. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.3 (2017-10-06)

#### :rocket: Enhancement

- `emotion`
  - [#377](https://github.com/emotion-js/emotion/pull/377) Add isBrowser as a property of sheet so that it can be manually set.. ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion`, `react-emotion`
  - [#386](https://github.com/emotion-js/emotion/pull/386) Insertion plugin with tree. ([@tkh44](https://github.com/tkh44))

#### :memo: Documentation

- [#380](https://github.com/emotion-js/emotion/pull/380) Create webpack.md. ([@greggb](https://github.com/greggb))

#### :house: Internal

- [#371](https://github.com/emotion-js/emotion/pull/371) Add codecov.yml. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Gregg Brewster ([greggb](https://github.com/greggb))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.2 (2017-10-01)

#### :bug: Bug Fix

- `react-emotion`
  - [#364](https://github.com/emotion-js/emotion/pull/364) Make the theme prop always exist. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-13 (2017-10-01)

#### :bug: Bug Fix

- `react-emotion`
  - [#364](https://github.com/emotion-js/emotion/pull/364) Make the theme prop always exist. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-12 (2017-10-01)

#### :rocket: Enhancement

- `emotion`, `react-emotion`
  - [#363](https://github.com/emotion-js/emotion/pull/363) Recursively call functions in styled with props. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-11 (2017-09-30)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion-theming`, `react-emotion`
  - [#361](https://github.com/emotion-js/emotion/pull/361) Add more context to the styled component displayName. ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix

- `emotion`
  - [#360](https://github.com/emotion-js/emotion/pull/360) Handle boolean values. ([@tkh44](https://github.com/tkh44))

#### :house: Internal

- `emotion`, `react-emotion`
  - [#359](https://github.com/emotion-js/emotion/pull/359) Hoist some functions in react-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-10 (2017-09-29)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion-theming`, `react-emotion`, `site`
  - [#292](https://github.com/emotion-js/emotion/pull/292) Migrate "theming" library. ([@probablyup](https://github.com/probablyup))

#### Committers: 2

- Evan Scott ([probablyup](https://github.com/probablyup))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.2-9 (2017-09-27)

#### :bug: Bug Fix

- `emotion`, `react-emotion`
  - [#352](https://github.com/emotion-js/emotion/pull/352) Check for null when evaluating input strings in createStyles. ([@tkh44](https://github.com/tkh44))

#### Committers: 1

- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.2-8 (2017-09-27)

#### :rocket: Enhancement

- `emotion`
  - [#347](https://github.com/emotion-js/emotion/pull/347) Allow external stylis plugins. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- [#348](https://github.com/emotion-js/emotion/pull/348) Document CSS prop incompatibility with babel-plugin-transform-react-inline-elements. ([@apostolos](https://github.com/apostolos))

#### Committers: 2

- Apostolos Tsakpinis ([apostolos](https://github.com/apostolos))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-7 (2017-09-25)

#### :rocket: Enhancement

- `emotion`, `react-emotion`
  - [#346](https://github.com/emotion-js/emotion/pull/346) Allow interpolation return value to be a function. . ([@tkh44](https://github.com/tkh44))
  - [#327](https://github.com/emotion-js/emotion/pull/327) Use cross-env to pass env vars across platforms. ([@apostolos](https://github.com/apostolos))

#### :memo: Documentation

- [#345](https://github.com/emotion-js/emotion/pull/345) Add /docs folder README and CodeSandbox.io links. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Apostolos Tsakpinis ([apostolos](https://github.com/apostolos))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.2-6 (2017-09-25)

#### :boom: Breaking Change

- `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#334](https://github.com/emotion-js/emotion/pull/334) Remove component selectors. ([@tkh44](https://github.com/tkh44))

#### :rocket: Enhancement

- `react-emotion`, `site`
  - [#232](https://github.com/emotion-js/emotion/pull/232) Allow Styled tags to be updated via withComponent. ([@ifyoumakeit](https://github.com/ifyoumakeit))
- `emotion`
  - [#335](https://github.com/emotion-js/emotion/pull/335) Add a WeakMap cache to createStringFromObject. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`, `emotion`, `site`
  - [#332](https://github.com/emotion-js/emotion/pull/332) Add support for object arguments in css prop with source maps. ([@tkh44](https://github.com/tkh44))

#### :house: Internal

- `emotion`
  - [#339](https://github.com/emotion-js/emotion/pull/339) Don't abstract WeakMap cache. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- Other
  - [#333](https://github.com/emotion-js/emotion/pull/333) Run benchmarks and tests in parallel and cache packages node_modules. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 3

- Dave Garwacke ([ifyoumakeit](https://github.com/ifyoumakeit))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-5 (2017-09-24)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion-server`, `emotion`, `site`
  - [#320](https://github.com/emotion-js/emotion/pull/320) Add Source Maps 🗺 . ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix

- `emotion`
  - [#326](https://github.com/emotion-js/emotion/pull/326) At rule fixes. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- `benchmarks`
  - [#328](https://github.com/emotion-js/emotion/pull/328) Benchmarks on Travis. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-4 (2017-09-22)

#### :bug: Bug Fix

- `emotion`
  - [#324](https://github.com/emotion-js/emotion/pull/324) Fix multiple nested selectors in media queries. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-3 (2017-09-22)

#### :boom: Breaking Change

- `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  - [#322](https://github.com/emotion-js/emotion/pull/322) Move emotion to peerDependencies. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  - [#322](https://github.com/emotion-js/emotion/pull/322) Move emotion to peerDependencies. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-2 (2017-09-22)

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  - [#321](https://github.com/emotion-js/emotion/pull/321) Ensure proper insert order of nested rules & atRules. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-1 (2017-09-21)

#### :bug: Bug Fix

- `babel-plugin-emotion`, `emotion`
  - [#317](https://github.com/emotion-js/emotion/pull/317) Media query nested selector fix. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v8.0.2-0 (2017-09-20)

#### :bug: Bug Fix

- `emotion`
  - [#316](https://github.com/emotion-js/emotion/pull/316) Handle null value in array of styles.. ([@tkh44](https://github.com/tkh44))

#### Committers: 1

- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.0-0 (2017-09-14)

(This is a WIP changelog)

#### :boom: Breaking Change

- composes is gone and replaced with random interpolations ([there's a codemod](https://github.com/emotion-js/emotion-composes-codemod))
- Nested class selectors default to `& .class` instead of `&.class` if the `&` is omitted

#### :rocket: Enhancement

- Better performance

#### :bug: Bug Fix

- All edge cases with prefixing are gone
- css prop specificity (#308)

#### :house: Internal

- Don't convert tagged template literals to objects

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.3.2 (2017-09-14)

#### :rocket: Enhancement

- `babel-plugin-emotion`
  - [#306](https://github.com/emotion-js/emotion/pull/306) Allow all imports to be configurable. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.3.0 (2017-09-13)

#### :rocket: Enhancement

- `babel-plugin-emotion`
  - [#290](https://github.com/emotion-js/emotion/pull/290) Configurable imports. ([@ChristopherBiscardi](https://github.com/ChristopherBiscardi))

#### :house: Internal

- `babel-plugin-emotion`, `emotion`, `react-emotion`
  - [#304](https://github.com/emotion-js/emotion/pull/304) Use babel-plugin-codegen to generate props regex. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`
  - [#298](https://github.com/emotion-js/emotion/pull/298) upgrade to babel-macros 1.0.0. ([@kentcdodds](https://github.com/kentcdodds))

#### Committers: 3

- Christopher Biscardi ([ChristopherBiscardi](https://github.com/ChristopherBiscardi))
- Kent C. Dodds ([kentcdodds](https://github.com/kentcdodds))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.2.1 (2017-09-05)

#### :memo: Documentation

- [#198](https://github.com/emotion-js/emotion/pull/198) add docs for using withProps from recompose. ([@divyagnan](https://github.com/divyagnan))

#### :house: Internal

- Other
  - [#294](https://github.com/emotion-js/emotion/pull/294) Add module name mapping for emotion-utils to .flowconfig. ([@bigslycat](https://github.com/bigslycat))
- `babel-plugin-emotion`
  - [#293](https://github.com/emotion-js/emotion/pull/293) Fix flowtype errors in babel-plugin-emotion. ([@bigslycat](https://github.com/bigslycat))
- `babel-plugin-emotion`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  - [#280](https://github.com/emotion-js/emotion/pull/280) Change rollup config. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  - [#276](https://github.com/emotion-js/emotion/pull/276) chore: update packages to deeplink into their respective directories. ([@probablyup](https://github.com/probablyup))

#### Committers: 6

- Christopher Biscardi ([ChristopherBiscardi](https://github.com/ChristopherBiscardi))
- Divyagnan Kandala ([divyagnan](https://github.com/divyagnan))
- Evan Scott ([probablyup](https://github.com/probablyup))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Pavel ([bigslycat](https://github.com/bigslycat))
- Siddharth Kshetrapal ([siddharthkp](https://github.com/siddharthkp))

## v7.2.0 (2017-08-20)

#### :rocket: Enhancement

- `emotion`, `preact-emotion`
  - [#273](https://github.com/tkh44/emotion/pull/273) Add preact-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.1.1 (2017-08-20)

#### :bug: Bug Fix

- `react-emotion`
  - [#268](https://github.com/tkh44/emotion/pull/268) Add missing macro.js to react-emotion package. ([@silvenon](https://github.com/silvenon))

#### :memo: Documentation

- `emotion`
  - [#269](https://github.com/tkh44/emotion/pull/269) Fix react size badges in readme. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Commiteters: 2

- Matija Marohnić ([silvenon](https://github.com/silvenon))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.1.0 (2017-08-18)

#### :rocket: Enhancement

- `babel-plugin-emotion`, `emotion-server`, `emotion`
  - [#265](https://github.com/tkh44/emotion/pull/265) Fix nested interpolated media queries and support random interpolations in injectGlobal. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `react-emotion`
  - [#259](https://github.com/tkh44/emotion/pull/259) Split everything into its own package with Lerna. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- Other
  - [#253](https://github.com/tkh44/emotion/pull/253) Add identifier name to styled class. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix

- [#256](https://github.com/tkh44/emotion/pull/256) Fix nested selectors without parent declaration. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- [#252](https://github.com/tkh44/emotion/pull/252) Add documentation for nested selectors. ([@silvenon](https://github.com/silvenon))
- [#250](https://github.com/tkh44/emotion/pull/250) Remove Vue from the babel-macros doc. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2

- Matija Marohnić ([silvenon](https://github.com/silvenon))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.12 (2017-08-09)

#### :bug: Bug Fix

- [#243](https://github.com/tkh44/emotion/pull/243) Pass filename to PostCSS correctly. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#236](https://github.com/tkh44/emotion/pull/236) Filter props on composed components. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- [#234](https://github.com/tkh44/emotion/pull/234) Add emotion-vue. ([@egoist](https://github.com/egoist))

#### :house: Internal

- [#237](https://github.com/tkh44/emotion/pull/237) adding theming to dev dependencies. ([@areai51](https://github.com/areai51))
- [#238](https://github.com/tkh44/emotion/pull/238) Make the styled content function return an object. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 3

- EGOIST ([egoist](https://github.com/egoist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- [areai51](https://github.com/areai51)

## v7.0.11 (2017-08-05)

#### :house: Internal

- [#233](https://github.com/tkh44/emotion/pull/233) Add postcss as a dependency. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#231](https://github.com/tkh44/emotion/pull/231) Use ESLint directly. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.10 (2017-08-04)

#### :memo: Documentation

- [#230](https://github.com/tkh44/emotion/pull/230) Fix typo in react gzip size badge. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.9 (2017-08-04)

#### :rocket: Enhancement

- [#227](https://github.com/tkh44/emotion/pull/227) Prop filtering. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#228](https://github.com/tkh44/emotion/pull/228) Spread out fragments earlier so that we can do redic nesting. ([@tkh44](https://github.com/tkh44))
- [#225](https://github.com/tkh44/emotion/pull/225) Remove theming. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.7 (2017-08-02)

#### :rocket: Enhancement

- [#221](https://github.com/tkh44/emotion/pull/221) Random object interpolations. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix

- [#224](https://github.com/tkh44/emotion/pull/224) Handle case where css float property is converted to `cssFloat` by autoprefixer camelCase function. ([@tkh44](https://github.com/tkh44))
- [#223](https://github.com/tkh44/emotion/pull/223) Small fix for #221. ([@tkh44](https://github.com/tkh44))

#### Committers: 2

- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.6 (2017-08-01)

#### :rocket: Enhancement

- [#213](https://github.com/tkh44/emotion/pull/213) Allow random expressions as long as they result in a className that begins with css. ([@tkh44](https://github.com/tkh44))

#### Committers: 1

- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v7.0.5 (2017-08-01)

#### :bug: Bug Fix

- [#218](https://github.com/tkh44/emotion/pull/218) Fix SSR hydration. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#214](https://github.com/tkh44/emotion/pull/214) [Fix] #196. ([@bogas04](https://github.com/bogas04))

#### Committers: 2

- Divjot Singh ([bogas04](https://github.com/bogas04))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.4 (2017-07-30)

#### :bug: Bug Fix

- [#205](https://github.com/tkh44/emotion/pull/205) Fix prefixed selectors in objects. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#204](https://github.com/tkh44/emotion/pull/204) Fix shorthand property syntax in object styles and use spread syntax instead of transform in tests. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#203](https://github.com/tkh44/emotion/pull/203) Component as selector fix. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation

- [#207](https://github.com/tkh44/emotion/pull/207) Fix logo alignment on npm. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#206](https://github.com/tkh44/emotion/pull/206) Remove attr from Usage with CSS Modules docs. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#190](https://github.com/tkh44/emotion/pull/190) [Update] import `styled` from 'emotion/react'. ([@bogas04](https://github.com/bogas04))

#### Committers: 2

- Divjot Singh ([bogas04](https://github.com/bogas04))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.3 (2017-07-28)

#### :rocket: Enhancement

- [#202](https://github.com/tkh44/emotion/pull/202) Render fewer components when composing components. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1

- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.2 (2017-07-28)

#### :rocket: Enhancement

- [#197](https://github.com/tkh44/emotion/pull/197) Prefix objects css props. ([@tkh44](https://github.com/tkh44))
- [#200](https://github.com/tkh44/emotion/pull/200) Auto import css for css prop. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix

- [#192](https://github.com/tkh44/emotion/pull/192) Use postcss-nested and postcss-safe-parser instead of styled-components fork and pass filename to postcss. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal

- [#191](https://github.com/tkh44/emotion/pull/191) More tests, use fns from utils and rework core. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#193](https://github.com/tkh44/emotion/pull/193) Use spread over Object.assign. ([@bogas04](https://github.com/bogas04))

#### Committers: 3

- Divjot Singh ([bogas04](https://github.com/bogas04))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))

## v7.0.1 (2017-07-27)

#### :bug: Bug Fix

- [#177](https://github.com/tkh44/emotion/pull/177) fresh regex every time extractCritical is called. ([@threepointone](https://github.com/threepointone))

#### :house: Internal

- [#182](https://github.com/tkh44/emotion/pull/182) Move fbjs imports for warning and camelizeStyleName. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#176](https://github.com/tkh44/emotion/pull/176) Update jest-glamor-react. ([@mitchellhamilton](https://github.com/mitchellhamilton))
- [#175](https://github.com/tkh44/emotion/pull/175) Clean up css operations. ([@tkh44](https://github.com/tkh44))

#### Committers: 3

- Sunil Pai ([threepointone](https://github.com/threepointone))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
