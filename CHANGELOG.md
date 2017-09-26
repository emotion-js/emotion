## v8.0.2-7 (2017-09-25)

#### :rocket: Enhancement
* `emotion`, `react-emotion`
  * [#346](https://github.com/emotion-js/emotion/pull/346) Allow interpolation return value to be a function. . ([@tkh44](https://github.com/tkh44))
  * [#327](https://github.com/emotion-js/emotion/pull/327) Use cross-env to pass env vars across platforms. ([@apostolos](https://github.com/apostolos))

#### :memo: Documentation
* [#345](https://github.com/emotion-js/emotion/pull/345) Add /docs folder README and CodeSandbox.io links. ([@tkh44](https://github.com/tkh44))

#### Committers: 2
- Apostolos Tsakpinis ([apostolos](https://github.com/apostolos))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))

## v8.0.2-6 (2017-09-25)

#### :boom: Breaking Change
* `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  * [#334](https://github.com/emotion-js/emotion/pull/334) Remove component selectors. ([@tkh44](https://github.com/tkh44))

#### :rocket: Enhancement
* `react-emotion`, `site`
  * [#232](https://github.com/emotion-js/emotion/pull/232) Allow Styled tags to be updated via withComponent. ([@ifyoumakeit](https://github.com/ifyoumakeit))
* `emotion`
  * [#335](https://github.com/emotion-js/emotion/pull/335) Add a WeakMap cache to createStringFromObject. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* `babel-plugin-emotion`, `emotion`, `site`
  * [#332](https://github.com/emotion-js/emotion/pull/332) Add support for object arguments in css prop with source maps. ([@tkh44](https://github.com/tkh44))

#### :house: Internal
* `emotion`
  * [#339](https://github.com/emotion-js/emotion/pull/339) Don't abstract WeakMap cache. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* Other
  * [#333](https://github.com/emotion-js/emotion/pull/333) Run benchmarks and tests in parallel and cache packages node_modules. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 3
- Dave Garwacke ([ifyoumakeit](https://github.com/ifyoumakeit))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-5 (2017-09-24)

#### :rocket: Enhancement
* `babel-plugin-emotion`, `emotion-server`, `emotion`, `site`
  * [#320](https://github.com/emotion-js/emotion/pull/320) Add Source Maps 🗺 . ([@tkh44](https://github.com/tkh44))

#### :bug: Bug Fix
* `emotion`
  * [#326](https://github.com/emotion-js/emotion/pull/326) At rule fixes. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal
* `benchmarks`
  * [#328](https://github.com/emotion-js/emotion/pull/328) Benchmarks on Travis. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-4 (2017-09-22)

#### :bug: Bug Fix
* `emotion`
  * [#324](https://github.com/emotion-js/emotion/pull/324) Fix multiple nested selectors in media queries. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-3 (2017-09-22)

#### :boom: Breaking Change
* `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  * [#322](https://github.com/emotion-js/emotion/pull/322) Move emotion to peerDependencies. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix
* `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  * [#322](https://github.com/emotion-js/emotion/pull/322) Move emotion to peerDependencies. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-2 (2017-09-22)

#### :bug: Bug Fix
* `babel-plugin-emotion`, `emotion-server`, `emotion`, `react-emotion`
  * [#321](https://github.com/emotion-js/emotion/pull/321) Ensure proper insert order of nested rules & atRules. ([@tkh44](https://github.com/tkh44))

#### Committers: 2
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-1 (2017-09-21)

#### :bug: Bug Fix
* `babel-plugin-emotion`, `emotion`
  * [#317](https://github.com/emotion-js/emotion/pull/317) Media query nested selector fix. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v8.0.2-0 (2017-09-20)

#### :bug: Bug Fix
* `emotion`
  * [#316](https://github.com/emotion-js/emotion/pull/316) Handle null value in array of styles.. ([@tkh44](https://github.com/tkh44))

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
* `babel-plugin-emotion`
  * [#306](https://github.com/emotion-js/emotion/pull/306) Allow all imports to be configurable. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.3.0 (2017-09-13)

#### :rocket: Enhancement
* `babel-plugin-emotion`
  * [#290](https://github.com/emotion-js/emotion/pull/290) Configurable imports. ([@ChristopherBiscardi](https://github.com/ChristopherBiscardi))

#### :house: Internal
* `babel-plugin-emotion`, `emotion`, `react-emotion`
  * [#304](https://github.com/emotion-js/emotion/pull/304) Use babel-plugin-codegen to generate props regex. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* `babel-plugin-emotion`
  * [#298](https://github.com/emotion-js/emotion/pull/298) upgrade to babel-macros 1.0.0. ([@kentcdodds](https://github.com/kentcdodds))

#### Committers: 3
- Christopher Biscardi ([ChristopherBiscardi](https://github.com/ChristopherBiscardi))
- Kent C. Dodds ([kentcdodds](https://github.com/kentcdodds))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.2.1 (2017-09-05)

#### :memo: Documentation
* [#198](https://github.com/emotion-js/emotion/pull/198) add docs for using withProps from recompose. ([@divyagnan](https://github.com/divyagnan))

#### :house: Internal
* Other
  * [#294](https://github.com/emotion-js/emotion/pull/294) Add module name mapping for emotion-utils to .flowconfig. ([@bigslycat](https://github.com/bigslycat))
* `babel-plugin-emotion`
  * [#293](https://github.com/emotion-js/emotion/pull/293) Fix flowtype errors in babel-plugin-emotion. ([@bigslycat](https://github.com/bigslycat))
* `babel-plugin-emotion`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  * [#280](https://github.com/emotion-js/emotion/pull/280) Change rollup config. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `preact-emotion`, `react-emotion`
  * [#276](https://github.com/emotion-js/emotion/pull/276) chore: update packages to deeplink into their respective directories. ([@probablyup](https://github.com/probablyup))

#### Committers: 6
- Christopher Biscardi ([ChristopherBiscardi](https://github.com/ChristopherBiscardi))
- Divyagnan Kandala ([divyagnan](https://github.com/divyagnan))
- Evan Scott ([probablyup](https://github.com/probablyup))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- Pavel ([bigslycat](https://github.com/bigslycat))
- Siddharth Kshetrapal ([siddharthkp](https://github.com/siddharthkp))


## v7.2.0 (2017-08-20)

#### :rocket: Enhancement
* `emotion`, `preact-emotion`
  * [#273](https://github.com/tkh44/emotion/pull/273) Add preact-emotion. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.1.1 (2017-08-20)

#### :bug: Bug Fix
* `react-emotion`
  * [#268](https://github.com/tkh44/emotion/pull/268) Add missing macro.js to react-emotion package. ([@silvenon](https://github.com/silvenon))

#### :memo: Documentation
* `emotion`
  * [#269](https://github.com/tkh44/emotion/pull/269) Fix react size badges in readme. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Commiteters: 2
- Matija Marohnić ([silvenon](https://github.com/silvenon))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.1.0 (2017-08-18)

#### :rocket: Enhancement
* `babel-plugin-emotion`, `emotion-server`, `emotion`
  * [#265](https://github.com/tkh44/emotion/pull/265) Fix nested interpolated media queries and support random interpolations in injectGlobal. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* `babel-plugin-emotion`, `emotion-server`, `emotion-utils`, `emotion`, `react-emotion`
  * [#259](https://github.com/tkh44/emotion/pull/259) Split everything into its own package with Lerna. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* Other
  * [#253](https://github.com/tkh44/emotion/pull/253) Add identifier name to styled class. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix
* [#256](https://github.com/tkh44/emotion/pull/256) Fix nested selectors without parent declaration. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation
* [#252](https://github.com/tkh44/emotion/pull/252) Add documentation for nested selectors. ([@silvenon](https://github.com/silvenon))
* [#250](https://github.com/tkh44/emotion/pull/250) Remove Vue from the babel-macros doc. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 2
- Matija Marohnić ([silvenon](https://github.com/silvenon))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.12 (2017-08-09)

#### :bug: Bug Fix
* [#243](https://github.com/tkh44/emotion/pull/243) Pass filename to PostCSS correctly. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#236](https://github.com/tkh44/emotion/pull/236) Filter props on composed components. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation
* [#234](https://github.com/tkh44/emotion/pull/234) Add emotion-vue. ([@egoist](https://github.com/egoist))

#### :house: Internal
* [#237](https://github.com/tkh44/emotion/pull/237) adding theming to dev dependencies. ([@areai51](https://github.com/areai51))
* [#238](https://github.com/tkh44/emotion/pull/238) Make the styled content function return an object. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 3
- EGOIST ([egoist](https://github.com/egoist))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
- [areai51](https://github.com/areai51)


## v7.0.11 (2017-08-05)

#### :house: Internal
* [#233](https://github.com/tkh44/emotion/pull/233) Add postcss as a dependency. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#231](https://github.com/tkh44/emotion/pull/231) Use ESLint directly. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.10 (2017-08-04)

#### :memo: Documentation
* [#230](https://github.com/tkh44/emotion/pull/230) Fix typo in react gzip size badge. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.9 (2017-08-04)

#### :rocket: Enhancement
* [#227](https://github.com/tkh44/emotion/pull/227) Prop filtering. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#228](https://github.com/tkh44/emotion/pull/228) Spread out fragments earlier so that we can do redic nesting. ([@tkh44](https://github.com/tkh44))
* [#225](https://github.com/tkh44/emotion/pull/225) Remove theming. ([@tkh44](https://github.com/tkh44))

#### Committers: 2
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.7 (2017-08-02)

#### :rocket: Enhancement
* [#221](https://github.com/tkh44/emotion/pull/221) Random object interpolations. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix
* [#224](https://github.com/tkh44/emotion/pull/224) Handle case where css float property is converted to `cssFloat` by autoprefixer camelCase function. ([@tkh44](https://github.com/tkh44))
* [#223](https://github.com/tkh44/emotion/pull/223) Small fix for #221. ([@tkh44](https://github.com/tkh44))

#### Committers: 2
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.6 (2017-08-01)

#### :rocket: Enhancement
* [#213](https://github.com/tkh44/emotion/pull/213) Allow random expressions as long as they result in a className that begins with css. ([@tkh44](https://github.com/tkh44))

#### Committers: 1
- Kye Hohenberger ([tkh44](https://github.com/tkh44))


## v7.0.5 (2017-08-01)

#### :bug: Bug Fix
* [#218](https://github.com/tkh44/emotion/pull/218) Fix SSR hydration. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#214](https://github.com/tkh44/emotion/pull/214) [Fix] #196. ([@bogas04](https://github.com/bogas04))

#### Committers: 2
- Divjot Singh ([bogas04](https://github.com/bogas04))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.4 (2017-07-30)

#### :bug: Bug Fix
* [#205](https://github.com/tkh44/emotion/pull/205) Fix prefixed selectors in objects. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#204](https://github.com/tkh44/emotion/pull/204) Fix shorthand property syntax in object styles and use spread syntax instead of transform in tests. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#203](https://github.com/tkh44/emotion/pull/203) Component as selector fix. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :memo: Documentation
* [#207](https://github.com/tkh44/emotion/pull/207) Fix logo alignment on npm. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#206](https://github.com/tkh44/emotion/pull/206) Remove attr from Usage with CSS Modules docs. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#190](https://github.com/tkh44/emotion/pull/190) [Update] import `styled` from 'emotion/react'. ([@bogas04](https://github.com/bogas04))

#### Committers: 2
- Divjot Singh ([bogas04](https://github.com/bogas04))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.3 (2017-07-28)

#### :rocket: Enhancement
* [#202](https://github.com/tkh44/emotion/pull/202) Render fewer components when composing components. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### Committers: 1
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.2 (2017-07-28)

#### :rocket: Enhancement
* [#197](https://github.com/tkh44/emotion/pull/197) Prefix objects css props. ([@tkh44](https://github.com/tkh44))
* [#200](https://github.com/tkh44/emotion/pull/200) Auto import css for css prop. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :bug: Bug Fix
* [#192](https://github.com/tkh44/emotion/pull/192) Use postcss-nested and postcss-safe-parser instead of styled-components fork and pass filename to postcss. ([@mitchellhamilton](https://github.com/mitchellhamilton))

#### :house: Internal
* [#191](https://github.com/tkh44/emotion/pull/191) More tests, use fns from utils and rework core. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#193](https://github.com/tkh44/emotion/pull/193) Use spread over Object.assign. ([@bogas04](https://github.com/bogas04))

#### Committers: 3
- Divjot Singh ([bogas04](https://github.com/bogas04))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))


## v7.0.1 (2017-07-27)

#### :bug: Bug Fix

* [#177](https://github.com/tkh44/emotion/pull/177) fresh regex every time extractCritical is called. ([@threepointone](https://github.com/threepointone))

#### :house: Internal

* [#182](https://github.com/tkh44/emotion/pull/182) Move fbjs imports for warning and camelizeStyleName. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#176](https://github.com/tkh44/emotion/pull/176) Update jest-glamor-react. ([@mitchellhamilton](https://github.com/mitchellhamilton))
* [#175](https://github.com/tkh44/emotion/pull/175) Clean up css operations. ([@tkh44](https://github.com/tkh44))

#### Committers: 3
- Sunil Pai ([threepointone](https://github.com/threepointone))
- Kye Hohenberger ([tkh44](https://github.com/tkh44))
- Mitchell Hamilton ([mitchellhamilton](https://github.com/mitchellhamilton))
