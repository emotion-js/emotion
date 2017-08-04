import { createElement as h } from 'react'
import { css } from '../index'
import { map, reduce } from '../utils'

export {
  flush,
  css,
  injectGlobal,
  fontFace,
  keyframes,
  hydrate,
  objStyle
} from '../index'

const push = (obj, items) => Array.prototype.push.apply(obj, items)

const re = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|valueLink|defaultChecked|checkedLink|innerHTML|suppressContentEditableWarning|accept|acceptCharset|accessKey|action|allowFullScreen|allowTransparency|alt|as|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|charSet|challenge|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|icon|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|manifest|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baseProfile|baselineShift|bbox|begin|bias|by|calcMode|capHeight|clip|clipPath|clipRule|clipPathUnits|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|paintOrder|panose1|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan)|(on[A-Z].*))$/

const assign: any = function (target) {
  let i = 1
  let length = arguments.length
  for (; i < length; i++) {
    var source = arguments[i]
    for (var key in source) {
      if (re.test(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export default function (tag, cls, objs, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  const componentTag = tag.displayName || tag.name || 'Component'

  function Styled (props, context) {
    const getValue = v => {
      if (v && typeof v === 'function') {
        if (v.__emotion_class) {
          return `& .${v.__emotion_class}`
        }
        return v(props, context)
      }

      return v
    }
    let localTag = tag

    let finalObjs = []

    if (tag.__emotion_spec) {
      push(
        finalObjs,
        reduce(
          tag.__emotion_spec,
          (accum, spec) => {
            push(accum, spec.objs)
            if (spec.content) {
              push(accum, spec.content.apply(null, map(spec.vars, getValue)))
            }
            push(accum, [spec.cls])
            return accum
          },
          []
        )
      )
      localTag = tag.__emotion_spec[0].tag
    }

    push(finalObjs, objs)

    push(finalObjs, [cls])

    if (content) {
      push(finalObjs, content.apply(null, map(vars, getValue)))
    }

    if (props.className) {
      push(finalObjs, props.className.split(' '))
    }

    const className = css(map(finalObjs, getValue))

    return h(
      localTag,
      assign({}, props, {
        ref: props.innerRef,
        className
      })
    )
  }

  Styled.displayName = `styled(${componentTag})`
  const spec = {
    vars,
    content,
    objs,
    tag,
    cls
  }
  Styled.__emotion_spec = tag.__emotion_spec
    ? tag.__emotion_spec.concat(spec)
    : [spec]
  Styled.__emotion_class = cls
  return Styled
}
