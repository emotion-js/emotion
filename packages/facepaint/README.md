# facepaint

## This project is experimental but amazing.

##### Responsive values for emotion's `css` function

## Example

```javascript
import { css } from 'emotion'
import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

css(mq({
  width: ['25%', '50%', '75%', '100%'],
  '& .foo': {
    color: ['red', 'green', 'blue', 'darkorchid'],
    '& img': {
      height: [10, 15, 20, 25]
    }
  }
}))
```

**Note that the first value is considered a default value and is not a child of a media query at-rule.**

**The following css is generated.**

```css
.css-14z9fgz {
  height: 10px;
}

@media (min-width:420px) {
  .css-14z9fgz {
    height: 15px;
  }
}

@media (min-width:920px) {
  .css-14z9fgz {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .css-14z9fgz {
    height: 25px;
  }
}

.css-183j8zy {
  color: red;
}

@media (min-width:420px) {
  .css-183j8zy {
    color: green;
  }
}

@media (min-width:920px) {
  .css-183j8zy {
    color: blue;
  }
}

@media (min-width:1120px) {
  .css-183j8zy {
    color: darkorchid;
  }
}

.css-183j8zy img {
  height: 10px;
}

@media (min-width:420px) {
  .css-183j8zy img {
    height: 15px;
  }
}

@media (min-width:920px) {
  .css-183j8zy img {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .css-183j8zy img {
    height: 25px;
  }
}

.css-1ohjc6h {
  width: 25%;
}

@media (min-width:420px) {
  .css-1ohjc6h {
    width: 50%;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h {
    width: 75%;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h {
    width: 100%;
  }
}

.css-1ohjc6h .foo {
  color: red;
}

@media (min-width:420px) {
  .css-1ohjc6h .foo {
    color: green;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h .foo {
    color: blue;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h .foo {
    color: darkorchid;
  }
}

.css-1ohjc6h .foo img {
  height: 10px;
}

@media (min-width:420px) {
  .css-1ohjc6h .foo img {
    height: 15px;
  }
}

@media (min-width:920px) {
  .css-1ohjc6h .foo img {
    height: 20px;
  }
}

@media (min-width:1120px) {
  .css-1ohjc6h .foo img {
    height: 25px;
  }
}
```

Notes:

- What looks like duplication is actually a result of emotion's internal caching. We can write the individual pieces of the style and use them to construct new, unique styles.

- The order looks strange because we are parsing from the inside out effectively. 
