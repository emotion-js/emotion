// @flow
import Stylis from '@emotion/stylis'
import stylisRuleSheet from 'stylis-rule-sheet'

const specs = [
  {
    name: 'calc rules',
    sample: 'height:calc( 100vh - 1px );height:calc(100vh -1px);'
  },
  {
    name: 'at-rules',
    sample:
      '@page {    size:A4 landscape;  }@document url(http://www.w3.org/),url-prefix(http://www.w3.org/Style/),domain(mozilla.org),regexp("https:.*") {  body {    color: red;  }}@viewport {  min-width:640px;  max-width:800px;}@counter-style list {  system:fixed;  symbols:url();  suffix:" ";}',
    skip: true
  },
  {
    name: 'monkey-patch some invalid css patterns',
    sample:
      'margin:20px;.b {  border:3px solid green;}}.c {color:red;}color:red;}.d {color red;};@media(screen) {  width:20%;};@media(screen) {  width:30%;};;;;;h1 {color:red}}};}h1 {color:red}}}  ;}h1: hover{color:red;}'
  },
  {
    name: 'escape breaking control characters',
    sample: 'content:"\f\u0000\u000b";'
  },
  {
    name: 'universal selector',
    sample: '* {color:red;}'
  },
  {
    name: 'flat',
    sample: 'color:20px;font-size:20px;transition:all'
  },
  {
    name: 'namespace',
    sample: '{color:blue;}& {color:red;}'
  },
  {
    name: 'comments',
    sample:
      "// line comment// color: red;/** * removes block comments and line comments, * there's a fire in the house // there is */button /* // what's xxx  */{color: blue;}// hellobutton /* 1 */{color: red; /* 2 */}"
  },
  {
    name: '&',
    sample:
      '& {color:blue;}&&& {color:red;}& + & {color:red;}.wrapper button& {  color:red;}'
  },
  {
    name: '&:before',
    sample: '&:before{color:blue;}'
  },
  {
    name: '@import',
    sample: "@import url('http://example.com')",
    skip: true
  },
  {
    name: '@supports',
    sample:
      '@supports (display:block) {color:red;h1 {color:red;h2 {color:blue;}}display:none;}@supports (appearance: none) {color:red;}'
  },
  {
    name: '@media',
    skip: true,
    sample:
      '@media (max-width:600px) {color:red;h1 {color:red;h2 {color:blue;}}display:none;}@media (min-width:576px) {&.card-deck {.card { &:not(:first-child) {   margin-left:15px; }&:not(:last-child) {   margin-right:15px;}}}}@supports (display:block) {@media (min-width:10px) {  background-color:seagreen;}}@media (max-width:600px) {   & { color:red } } &:hover {   color:orange }'
  },
  {
    name: '@media specifity',
    sample:
      '> #box-not-working {  background:red;  padding-left:8px;  width:10px;  @media only screen and (min-width:10px) {width:calc(10px + 90px *(100vw - 10px) / 90);  }  @media only screen and (min-width:90px) {width:90px;  }  height: 10px;  @media only screen and (min-width:10px) {height:calc(10px + 90px *(100vw - 10px) / 90);  }  @media only screen and (min-width:90px) {    height: 90px;  }}'
  },
  {
    name: '@font-face',
    sample:
      "@font-face {font-family:Pangolin;src:url('Pangolin-Regular.ttf') format('truetype');}"
  },
  {
    name: 'multiple selectors',
    sample: 'span, h1 {color:red;}h1, &:after, &:before {color:red;}'
  },
  {
    name: '[title="a,b"] and :matches(a,b)',
    sample:
      '.test:matches(a,b,c), .test {color:blue;}.test[title=","] {color:red;}[title="a,b,c, something"], h1, [title="a,b,c"] {  color:red}[title="a"],[title="b"] {color:red;}'
  },
  {
    name: 'quoutes',
    sample:
      '.foo:before {  content:".hello {world}";  content:".hello {world} \' ";  content:\'.hello {world} " \';}'
  },
  {
    name: 'remove empty css',
    sample: '& {}'
  },
  {
    name: 'urls',
    sample:
      'background:url(http://url.com/});background:url(http://url.com//1234) \'(\'; // sdsdbackground-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAABCAIAAADsEU8HAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIklEQVQI12P8//8/Aw4wbdq0rKysAZG1trbGJXv06FH8sgDIJBbBfp+hFAAAAABJRU5ErkJggg==");'
  },
  {
    name: 'last semicolon omission',
    sample: '.content {display:none}.content {display:flex}'
  },
  {
    name: ':matches(:not())',
    sample: 'h1:matches(.a,.b,:not(.c)) {display: none}'
  },
  {
    name: 'vendor prefixing',
    sample:
      'html {  text-size-adjust: none;}input.red::placeholder {  color:red;}& {width:var(--foo-content);width:var(-content);width:var(--max-content);width:--max-content;width:max-content;width:min-content;display:flex!important;display:inline-flex;display:inline-box;  transform:rotate(30deg);  cursor:grab;  justify-content:flex-end;  justify-content:flex-start;  justify-content:justify;}div {align-items:value;align-self:value;align-content:value;}div {color:papayawhip;order:flex;}div {backface-visibility:hidden;}h1:read-only {  color:red;}& {transition:transform 1s,transform all 400ms,text-transform;}'
  },
  {
    name: 'vendor prefixing II',
    sample:
      'div {writing-mode:vertical-lr;writing-mode:vertical-rl;writing-mode:horizontal-tb;writing-mode:sideways-rl;writing-mode:sideways-lr;}'
  },
  {
    name: 'vendor prefixing III',
    sample:
      'color:red;columns:auto;column-count:auto;column-fill:auto;column-gap:auto;column-rule:auto;column-rule-color:auto;column-rule-style:auto;column-rule-width:auto;column-span:auto;column-width:auto;'
  },
  {
    name: 'vendor prefixing IV',
    sample:
      'text-size-adjust:none;text-decoration:none;filter:grayscale(100%);fill:red;position: sticky;mask-image: linear-gradient(#fff);mask-image: none;'
  },
  {
    name: 'vendor prefixing V',
    sample:
      'display :flex!important;justify-content: space-between;align-self: flex-start;align-self: flex-end;'
  },
  {
    name: 'vendor prefixing VI',
    sample: 'clip-path: none;mask-image: none;'
  },
  {
    name: 'nested',
    sample:
      ':global(div) {h2 {color:red;h3 {color:blue;}}}.foo & {    width:1px;    &:hover {        color:black;    }    li {  color:white;    }}h1, div {color:red;h2,&:before {color:red;}color:blue;header {font-size:12px;}@media {color:red;}@media {color:blue;}}&.foo {&.bar {color:orange}}&.foo {&.bar {&.barbar {color:orange}}}'
  },
  {
    name: 'class namespace',
    sample: 'h1 {animation:slide 1s;}'
  },
  {
    name: 'id namespace',
    sample: 'h1 {animation: slide 1s;}'
  },
  {
    name: 'attribute namespace',
    sample: 'h1 {animation: slide 1s;}'
  },
  {
    name: 'empty namespace',
    sample: 'h1 {animation:slide 1s;}@keyframes name {0: {top:0}}'
  },
  {
    name: 'edge cases',
    sample:
      '@media (min-width:537px) {  border-bottom:4px solid red;}&::placeholder {  color:pink;}.a {color:\'red\'}.b {color:"red"}.a {color:red;}[role=button]{color:red;}.b {padding:30 3} '
  },
  {
    name: 'whitespace cascade true',
    sample: 'html {width:0;}'
  },
  {
    name: 'whitespace cascade false',
    sample: 'html{width:0;}'
  },
  {
    name: 'cascade isolation simple',
    sample:
      '[data-id=foo] {color:red;}p {color:red;}p a {color:red;}p:hover {  color:red;}p::before {  color:red;}:hover {  color:red;}::before {  color:red;}:hover p {  color:red;}html.something & {color:red;}.class #id {color:red;}& {color:red}.a.b .c {color:red;}:nth-child(2n),:nth-last-child(2n),:nth-of-type(2n) {color:red;}a:not(:focus):disabled {color:red;}a:not(:focus) :disabled {color:red;}'
  },
  {
    name: 'cascade isolation complex',
    sample:
      '.List :global(>) :global(*) {  margin-top:10px;}.List :global(*) :global(+) :global(*) {  margin-top:10px;}.List :global(> *) {  margin-top:10px;}.List :global(* + *) {  margin-top:10px;}:global(.foo #bar > baz) {color:red;}div :global(.react-select .some-child-of-react-select) {color:red;}.root > :global(*):not(header) {  color:red;}a:matches( a +b foo:hover :global(marquee) a) > :hover {  color:red;}'
  },
  {
    name: 'cascade isolation @at-rules',
    sample:
      '@keyframes hahaha {  from { top:0 }  to { top:100 }}span {}      @media (min-width:480px) { div { color:red } }'
  },
  {
    name: 'cascade isolation nesting',
    sample:
      'color:red;h1 {:global(section) {color:red}}h1 {h2 {color:red}}div, span {h1 {color:red}}span {&:hover {color:red}}[data-id=foo] {&:hover {color:red}}'
  },
  {
    name: 'isolation edge cases',
    sample: 'width:0;@media(screen) {  color:red;}h1 {color:red;}'
  },
  {
    name: 'semi-colons',
    sample: 'color:redh2 {color:bluewidth:0h3 {display:none}}'
  },
  {
    name: 'no semi-colons I',
    sample:
      'color:redh2 {color:bluewidth:0h3 {display:none}}div:hover{color:red}'
  },
  {
    name: 'no semi-colons II',
    sample:
      'color:redcolor:redh1:hover,h2:hover,h3{color:redwidth:0/2}h1 {grid-template-areas:"header header header"\'. main .\';}h1 {width:calc(20px)20px;}'
  },
  {
    name: 'multiline declaration',
    sample:
      'html {  background-image:    linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),    url(/static/background.svg);}'
  },
  {
    name: 'nesting selector multiple levels',
    sample: 'a {a {a {a {a {a {a {a {a{a{a{a{color:red;}}}}}}}}}}}}'
  },
  {
    name: 'nesting @media multiple levels',
    sample: 'div {@media {a {color:red;@media {h1 {color:red;}}}}}',
    skip: true
  },
  {
    name: 'complex nested selector',
    sample:
      '&:hover{color:blue;&:active{color:red;}}font-size:2rem;padding:16px;&:hover{color:pink;&:active{color:purple;}&.some-class{color:yellow;}}'
  }
]

let stylisOptions = {
  global: false,
  preserve: false,
  keyframe: false,
  semicolon: true,
  cascade: true
}

let stylis = new Stylis(stylisOptions)
let regularStylis = new Stylis(stylisOptions)

specs.forEach((spec, i) => {
  const newTest = spec.only ? test.only : spec.skip ? test.skip : test
  newTest(spec.name, () => {
    let out = []
    const plugin = stylisRuleSheet(rule => {
      out.push(rule)
    })
    stylis.use(null)(plugin)
    stylis(`.css-${i}`, spec.sample)
    expect(out).toMatchSnapshot()
    expect(out.join('')).toEqual(regularStylis(`.css-${i}`, spec.sample))
  })
})
