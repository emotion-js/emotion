'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var transform = require('css-to-react-native');
var React = require('react');
var react = require('@emotion/react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var transform__default = /*#__PURE__*/_interopDefault(transform);

function interleave(vals) {
  var strings = vals[0];
  var finalArray = [strings[0]];

  for (var i = 1, len = vals.length; i < len; i++) {
    finalArray.push(vals[i]);

    if (strings[i] !== undefined) {
      finalArray.push(strings[i]);
    }
  }

  return finalArray;
}

// they're reset on every call to css
// this is done so we don't create a new
// handleInterpolation function on every css call

var styles;
var generated = {};
var buffer = '';
var lastType;

function handleInterpolation(interpolation, i, arr) {
  var type = typeof interpolation;

  if (type === 'string') {
    // strip comments
    interpolation = interpolation.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
  }

  if (type === 'function') {
    if (this === undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Interpolating functions in css calls is not allowed.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + 'let SomeComponent = styled.View`${dynamicStyle}`');
      }
    } else {
      handleInterpolation.call(this, interpolation( // $FlowFixMe
      this), i, arr);
    }

    return;
  }

  var isIrrelevant = interpolation == null || type === 'boolean';
  var isRnStyle = type === 'object' && !Array.isArray(interpolation) || type === 'number';

  if (lastType === 'string' && (isRnStyle || isIrrelevant)) {
    var converted = convertStyles(buffer);

    if (converted !== undefined) {
      styles.push(converted);
    }

    buffer = '';
  }

  if (isIrrelevant) {
    return;
  }

  if (type === 'string') {
    buffer += interpolation;

    if (arr.length - 1 === i) {
      var _converted = convertStyles(buffer);

      if (_converted !== undefined) {
        styles.push(_converted);
      }

      buffer = '';
    }
  }

  if (isRnStyle) {
    styles.push(interpolation);
  }

  if (Array.isArray(interpolation)) {
    interpolation.forEach(handleInterpolation, this);
  }

  lastType = type;
} // Use platform specific StyleSheet method for creating the styles.
// This enables us to use the css``/css({}) in any environment (Native | Sketch | Web)


function createCss(StyleSheet) {
  return function css() {
    var prevBuffer = buffer;
    var vals; // these are declared earlier
    // this is done so we don't create a new
    // handleInterpolation function on every css call

    styles = [];
    buffer = '';
    lastType = undefined;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0] == null || args[0].raw === undefined) {
      vals = args;
    } else {
      vals = interleave(args);
    }

    try {
      vals.forEach(handleInterpolation, this);
    } finally {
      buffer = prevBuffer;
    }

    var hash = JSON.stringify(styles);

    if (!generated[hash]) {
      var styleSheet = StyleSheet.create({
        generated: StyleSheet.flatten(styles)
      });
      generated[hash] = styleSheet.generated;
    }

    return generated[hash];
  };
}
var propertyValuePattern = /\s*([^\s]+)\s*:\s*(.+?)\s*$/;

function convertPropertyValue(style) {
  // Get prop name and prop value
  var match = propertyValuePattern.exec(style); // match[2] will be " " in cases where there is no value
  // but there is whitespace, e.g. "color: "

  if (match !== null && match[2] !== ' ') {
    // the first value in the array will
    // be the whole string so we remove it
    match.shift(); // yes i know this looks funny

    this.push(match);
  }
}

function convertStyles(str) {
  if (str.trim() === '') return;
  var stylePairs = [];
  var parsedString = str.split(';');
  parsedString.forEach(convertPropertyValue, stylePairs);

  try {
    return transform__default['default'](stylePairs);
  } catch (error) {
    var msg = error.message;

    if (msg.includes('Failed to parse declaration')) {
      var values = msg.replace('Failed to parse declaration ', '').replace(/"/g, '').trim().split(':');
      var errorMsg = "'" + values[0] + "' shorthand property requires units for example - " + values[0] + ": 20px or " + values[0] + ": 10px 20px 40px 50px";
      console.error(errorMsg);
    }
  }
}

var testOmitPropsOnComponent = function testOmitPropsOnComponent(prop) {
  return prop !== 'theme' && prop !== 'as';
};

function createStyled(StyleSheet, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$getShouldForward = _ref.getShouldForwardProp,
      getShouldForwardProp = _ref$getShouldForward === void 0 ? function () {
    return testOmitPropsOnComponent;
  } : _ref$getShouldForward;

  var css = createCss(StyleSheet);
  return function createEmotion(component, options) {
    var shouldForwardProp = options && options.shouldForwardProp ? options.shouldForwardProp : undefined;
    var defaultShouldForwardProp = shouldForwardProp || getShouldForwardProp(component);
    var shouldUseAs = !defaultShouldForwardProp('as');
    return function createStyledComponent() {
      var styles;

      for (var _len = arguments.length, rawStyles = new Array(_len), _key = 0; _key < _len; _key++) {
        rawStyles[_key] = arguments[_key];
      }

      if (rawStyles[0] == null || rawStyles[0].raw === undefined) {
        styles = rawStyles;
      } else {
        styles = interleave(rawStyles);
      } // do we really want to use the same infra as the web since it only really uses theming?
      // $FlowFixMe


      var Styled = /*#__PURE__*/React.forwardRef(function (props, ref) {
        var finalTag = shouldUseAs && props.as || component;
        var mergedProps = props;

        if (props.theme == null) {
          mergedProps = {};

          for (var key in props) {
            mergedProps[key] = props[key];
          }

          mergedProps.theme = React.useContext(react.ThemeContext);
        }

        var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getShouldForwardProp(finalTag) : defaultShouldForwardProp;
        var newProps = {};

        for (var _key2 in props) {
          if (shouldUseAs && _key2 === 'as') continue;

          if (finalShouldForwardProp(_key2)) {
            newProps[_key2] = props[_key2];
          }
        }

        newProps.style = [css.apply(mergedProps, styles), props.style];
        newProps.ref = ref; // $FlowFixMe

        return /*#__PURE__*/React.createElement(finalTag, newProps);
      }); // $FlowFixMe

      Styled.withComponent = function (newComponent) {
        return createEmotion(newComponent).apply(void 0, styles);
      };

      Styled.displayName = "emotion(" + getDisplayName(component) + ")";
      return Styled;
    };
  };
}

var getDisplayName = function getDisplayName(primitive) {
  return typeof primitive === 'string' ? primitive : primitive.displayName || primitive.name || 'Styled';
};

exports.createCss = createCss;
exports.createStyled = createStyled;
