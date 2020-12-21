'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var _extends = require('@babel/runtime/helpers/extends')
var React = require('react')
var isPropValid = require('@emotion/is-prop-valid')
var react = require('@emotion/react')
var utils = require('@emotion/utils')
var serialize = require('@emotion/serialize')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var _extends__default = /*#__PURE__*/ _interopDefault(_extends)
var isPropValid__default = /*#__PURE__*/ _interopDefault(isPropValid)

var testOmitPropsOnStringTag = isPropValid__default['default']

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme'
}

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
    ? testOmitPropsOnStringTag
    : testOmitPropsOnComponent
}
var composeShouldForwardProps = function composeShouldForwardProps(
  tag,
  options,
  isReal
) {
  var shouldForwardProp

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp
    shouldForwardProp =
      tag.__emotion_forwardProp && optionsShouldForwardProp
        ? function(propName) {
            return (
              tag.__emotion_forwardProp(propName) &&
              optionsShouldForwardProp(propName)
            )
          }
        : optionsShouldForwardProp
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp
  }

  return shouldForwardProp
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR =
  "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences"

var createStyled = function createStyled(tag, options) {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    }
  }

  var isReal = tag.__emotion_real === tag
  var baseTag = (isReal && tag.__emotion_base) || tag
  var identifierName
  var targetClassName

  if (options !== undefined) {
    identifierName = options.label
    targetClassName = options.target
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal)
  var defaultShouldForwardProp =
    shouldForwardProp || getDefaultShouldForwardProp(baseTag)
  var shouldUseAs = !defaultShouldForwardProp('as')
  return function() {
    var args = arguments
    var styles =
      isReal && tag.__emotion_styles !== undefined
        ? tag.__emotion_styles.slice(0)
        : []

    if (identifierName !== undefined) {
      styles.push('label:' + identifierName + ';')
    }

    if (args[0] == null || args[0].raw === undefined) {
      styles.push.apply(styles, args)
    } else {
      if (process.env.NODE_ENV !== 'production' && args[0][0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
      }

      styles.push(args[0][0])
      var len = args.length
      var i = 1

      for (; i < len; i++) {
        if (process.env.NODE_ENV !== 'production' && args[0][i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
        }

        styles.push(args[i], args[0][i])
      }
    } // $FlowFixMe: we need to cast StatelessFunctionalComponent to our PrivateStyledComponent class

    var Styled = react.withEmotionCache(function(props, cache, ref) {
      var finalTag = (shouldUseAs && props.as) || baseTag
      var className = ''
      var classInterpolations = []
      var mergedProps = props

      if (props.theme == null) {
        mergedProps = {}

        for (var key in props) {
          mergedProps[key] = props[key]
        }

        mergedProps.theme = React.useContext(react.ThemeContext)
      }

      if (typeof props.className === 'string') {
        className = utils.getRegisteredStyles(
          cache.registered,
          classInterpolations,
          props.className
        )
      } else if (props.className != null) {
        className = props.className + ' '
      }

      var serialized = serialize.serializeStyles(
        styles.concat(classInterpolations),
        cache.registered,
        mergedProps
      )
      var rules = utils.insertStyles(
        cache,
        serialized,
        typeof finalTag === 'string'
      )
      className += cache.key + '-' + serialized.name

      if (targetClassName !== undefined) {
        className += ' ' + targetClassName
      }

      var finalShouldForwardProp =
        shouldUseAs && shouldForwardProp === undefined
          ? getDefaultShouldForwardProp(finalTag)
          : defaultShouldForwardProp
      var newProps = {}

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue

        if (
          // $FlowFixMe
          finalShouldForwardProp(_key)
        ) {
          newProps[_key] = props[_key]
        }
      }

      newProps.className = className
      newProps.ref = ref
      var ele = /*#__PURE__*/ React.createElement(finalTag, newProps)

      return ele
    })
    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : 'Styled(' +
          (typeof baseTag === 'string'
            ? baseTag
            : baseTag.displayName || baseTag.name || 'Component') +
          ')'
    Styled.defaultProps = tag.defaultProps
    Styled.__emotion_real = Styled
    Styled.__emotion_base = baseTag
    Styled.__emotion_styles = styles
    Styled.__emotion_forwardProp = shouldForwardProp
    Object.defineProperty(Styled, 'toString', {
      value: function value() {
        if (
          targetClassName === undefined &&
          process.env.NODE_ENV !== 'production'
        ) {
          return 'NO_COMPONENT_SELECTOR'
        } // $FlowFixMe: coerce undefined to string

        return '.' + targetClassName
      }
    })

    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled(
        nextTag,
        _extends__default['default']({}, options, {}, nextOptions, {
          shouldForwardProp: composeShouldForwardProps(
            Styled,
            nextOptions,
            true
          )
        })
      ).apply(void 0, styles)
    }

    return Styled
  }
}

exports.default = createStyled
