---
title: "Usage with Webpack"
---

> **Note:**
> 
> This is only required if you use extractStatic

#### Bundling [extracted CSS](./extract-static)

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
