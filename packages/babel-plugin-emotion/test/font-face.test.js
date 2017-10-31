import { createInline, createExtract } from './util'

const inline = {
  basic: {
    code: `
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  interpolation: {
    code: `
      fontFace\`
        font-family: \${fontFamilyName};
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  'static change import': {
    code: `
      f\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
            local("HelveticaNeue-Bold"),
            url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`,

    opts: { importedNames: { fontFace: 'f' } }
  },

  'dynamic change import': {
    code: `
      import { fontFace as f } from 'emotion';
      f\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
            local("HelveticaNeue-Bold"),
            url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  }
}
createInline('fontFace', inline)

const extract = {
  basic: {
    code: `
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  'basic assign to variable': {
    code: `
      const thisWillBeUndefined = fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  interpolation: {
    code: `
      fontFace\`
        font-family: \${fontFamilyName};
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`,
    extract: false
  }
}

createExtract('fontFace extract', extract)
