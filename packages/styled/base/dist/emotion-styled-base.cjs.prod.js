'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var _extends = require('@babel/runtime/helpers/extends'),
  React = require('react'),
  isPropValid = require('@emotion/is-prop-valid'),
  react = require('@emotion/react'),
  utils = require('@emotion/utils'),
  serialize = require('@emotion/serialize')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var _extends__default = _interopDefault(_extends),
  isPropValid__default = _interopDefault(isPropValid),
  testOmitPropsOnStringTag = isPropValid__default.default,
  testOmitPropsOnComponent = function(key) {
    return 'theme' !== key
  },
  getDefaultShouldForwardProp = function(tag) {
    return 'string' == typeof tag && tag.charCodeAt(0) > 96
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent
  },
  composeShouldForwardProps = function(tag, options, isReal) {
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
    return (
      'function' != typeof shouldForwardProp &&
        isReal &&
        (shouldForwardProp = tag.__emotion_forwardProp),
      shouldForwardProp
    )
  },
  ILLEGAL_ESCAPE_SEQUENCE_ERROR =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  isBrowser = 'undefined' != typeof document,
  createStyled = function createStyled(tag, options) {
    var identifierName,
      targetClassName,
      isReal = tag.__emotion_real === tag,
      baseTag = (isReal && tag.__emotion_base) || tag
    void 0 !== options &&
      ((identifierName = options.label), (targetClassName = options.target))
    var shouldForwardProp = composeShouldForwardProps(tag, options, isReal),
      defaultShouldForwardProp =
        shouldForwardProp || getDefaultShouldForwardProp(baseTag),
      shouldUseAs = !defaultShouldForwardProp('as')
    return function() {
      var args = arguments,
        styles =
          isReal && void 0 !== tag.__emotion_styles
            ? tag.__emotion_styles.slice(0)
            : []
      if (
        (void 0 !== identifierName &&
          styles.push('label:' + identifierName + ';'),
        null == args[0] || void 0 === args[0].raw)
      )
        styles.push.apply(styles, args)
      else {
        0, styles.push(args[0][0])
        for (var len = args.length, i = 1; i < len; i++)
          styles.push(args[i], args[0][i])
      }
      var Styled = react.withEmotionCache(function(props, cache, ref) {
        var finalTag = (shouldUseAs && props.as) || baseTag,
          className = '',
          classInterpolations = [],
          mergedProps = props
        if (null == props.theme) {
          for (var key in ((mergedProps = {}), props))
            mergedProps[key] = props[key]
          mergedProps.theme = React.useContext(react.ThemeContext)
        }
        'string' == typeof props.className
          ? (className = utils.getRegisteredStyles(
              cache.registered,
              classInterpolations,
              props.className
            ))
          : null != props.className && (className = props.className + ' ')
        var serialized = serialize.serializeStyles(
            styles.concat(classInterpolations),
            cache.registered,
            mergedProps
          ),
          rules = utils.insertStyles(
            cache,
            serialized,
            'string' == typeof finalTag
          )
        ;(className += cache.key + '-' + serialized.name),
          void 0 !== targetClassName && (className += ' ' + targetClassName)
        var finalShouldForwardProp =
            shouldUseAs && void 0 === shouldForwardProp
              ? getDefaultShouldForwardProp(finalTag)
              : defaultShouldForwardProp,
          newProps = {}
        for (var _key in props)
          (shouldUseAs && 'as' === _key) ||
            (finalShouldForwardProp(_key) && (newProps[_key] = props[_key]))
        ;(newProps.className = className), (newProps.ref = ref)
        var ele = React.createElement(finalTag, newProps)
        if (!isBrowser && void 0 !== rules) {
          for (
            var _ref, serializedNames = serialized.name, next = serialized.next;
            void 0 !== next;

          )
            (serializedNames += ' ' + next.name), (next = next.next)
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'style',
              (((_ref = {})['data-emotion'] =
                cache.key + ' ' + serializedNames),
              (_ref.dangerouslySetInnerHTML = {
                __html: rules
              }),
              (_ref.nonce = cache.sheet.nonce),
              _ref)
            ),
            ele
          )
        }
        return ele
      })
      return (
        (Styled.displayName =
          void 0 !== identifierName
            ? identifierName
            : 'Styled(' +
              ('string' == typeof baseTag
                ? baseTag
                : baseTag.displayName || baseTag.name || 'Component') +
              ')'),
        (Styled.defaultProps = tag.defaultProps),
        (Styled.__emotion_real = Styled),
        (Styled.__emotion_base = baseTag),
        (Styled.__emotion_styles = styles),
        (Styled.__emotion_forwardProp = shouldForwardProp),
        Object.defineProperty(Styled, 'toString', {
          value: function() {
            return '.' + targetClassName
          }
        }),
        (Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled(
            nextTag,
            _extends__default.default({}, options, {}, nextOptions, {
              shouldForwardProp: composeShouldForwardProps(
                Styled,
                nextOptions,
                !0
              )
            })
          ).apply(void 0, styles)
        }),
        Styled
      )
    }
  }

exports.default = createStyled
