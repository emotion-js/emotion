`@emotion/babel-plugin` depends on some modules which require `fs` which obviously cannot be imported in the browser. (Furthermore, it's unclear if Next.js will allow you to require `fs` during SSR, if the require is located in code that is shared between client and server.)

So to get `@emotion/babel-plugin` to work in the browser / Next.js, we have to stub out any dependencies which require `fs`. This works via Webpack `require.alias` in `next.config.js`.

This is a very hacky workaround that could easily break things in the future.
