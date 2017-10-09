---
title: "Usage with Webpack"
---

#### Bundling [extracted CSS](https://github.com/emotion-js/emotion/blob/master/docs/extract-static.md)

```javascript
{
    test: /emotion\.css$/,
    // extract a css bundle file for production
    use: PROD
    ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: true
            }
        }
        })
    // extract css into a style tag
    : ['style-loader', 'css-loader']
},
```
