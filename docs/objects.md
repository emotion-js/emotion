## Objects as Styles

`css` can also take an object or an array of objects as a parameter.
This allows you to use your existing object styles in the emotion ecosystem.

Another great benefit is that you can now use [polished](https://polished.js.org/) with emotion and styles are prefixed automatically at build time via [postcss](https://github.com/postcss/postcss-js) and [autoprefixer](https://github.com/postcss/autoprefixer/)!

`styled` can also take objects or functions that return objects as parameters.

*Object styles cannot be optimized as well as template literal styles at this time. Object styles are also not autoprefixed.*
