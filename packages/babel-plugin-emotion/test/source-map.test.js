import { createInline } from './util'

const inline = {
  'css source map': {
    code: `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        @media(min-width: 420px) {
          line-height: 40px;
        }
        width: \${widthVar};
      \``,

    filename: 'css.source-map.test.js'
  },

  'styled object styles source map': {
    code: `
      styled('div')({
        color: 'blue',
        '&:hover': {
          '& .name': {
            color: 'amethyst',
            '&:focus': {
              color: 'burlywood',
              [mq[0]]: {
                color: 'rebeccapurple'
              }
            }
          },
          color: 'green'
        }
      })
    `,

    filename: 'css-nested.source-map.test.js'
  },

  'styled source map': {
    code: `const Avatar = styled('img')\`
        width: 96px;
        height: 96px;

        border-radius: $\{props =>
          props.theme.borderRadius};

        border: 1px solid $\{props =>
          props.theme.borderColor};
      \``,

    filename: 'styled.source-map.test.js'
  },

  'fontFace source map': {
    code: `
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`,

    filename: 'fontFace.source-map.test.js'
  },

  'css prop': {
    code: `
    <div
      css={\`
        width: 128px;
        height: 128px;
        background-color: #8c81d8;
        border-radius: 4px;
  
        & img {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          transition: all 400ms ease-in-out;
  
          &:hover {
            transform: scale(1.2);
          }
        }
      \`}
    />
  `,

    filename: 'site.source-map.test.js'
  },

  'css prop with objects': {
    code: `
      <div
        css={{
          color: 'plum'
        }}
      />
    `,

    filename: 'site.source-map.test.js'
  },

  'css prop with merge': {
    code: `
      <div
        className={someClassName}
        css={{
          color: 'plum'
        }}
      />
    `,

    filename: 'site.source-map.test.js'
  }
}

for (const thing in inline) {
  inline[thing].opts = { sourceMap: true }
}

createInline('source map', inline)
