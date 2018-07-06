'use strict';

exports.__esModule = true;


function toTag(emotion, ids, thing, nonceString) {
  var idhash = ids.reduce(function (o, x) {
    o[x] = true;
    return o;
  }, {});
  var styles = '';
  var idHydration = '';
  thing.keys = thing.keys.filter(function (id) {
    if (idhash[id] !== undefined && emotion.caches.inserted[id] !== true) {
      styles += emotion.caches.inserted[id];
      idHydration += ' ' + id;
    }
    return true;
  });
  return '<style data-emotion-' + emotion.caches.key + '="' + idHydration.substring(1) + '"' + nonceString + '>' + styles + '</style>';
}


var createRenderStylesToString = function createRenderStylesToString(emotion, nonceString) {
  return function (html) {
    var regex = new RegExp('<|' + emotion.caches.key + '-([a-zA-Z0-9-]+)', 'gm');

    var match = void 0;
    var lastBackIndex = 0;
    var idBuffer = [];
    var result = '';
    var insed = {};
    var keys = Object.keys(emotion.caches.inserted);
    var globalStyles = '';
    var globalIds = '';
    keys = keys.filter(function (id) {
      if (emotion.caches.registered[emotion.caches.key + '-' + id] === undefined && emotion.caches.inserted[id] !== true) {
        globalStyles += emotion.caches.inserted[id];
        globalIds += ' ' + id;
        return false;
      }
      return true;
    });
    if (globalStyles !== '') {
      result += '<style data-emotion-' + emotion.caches.key + '="' + globalIds.substring(1) + '"' + nonceString + '>' + globalStyles + '</style>';
    }
    var thing = { keys: keys };
    while ((match = regex.exec(html)) !== null) {
      if (match[0] === '<') {
        idBuffer = idBuffer.filter(function (x) {
          return !insed[x];
        });
        if (idBuffer.length > 0) {
          result += toTag(emotion, idBuffer, thing, nonceString);
        }
        result += html.substring(lastBackIndex, match.index);
        lastBackIndex = match.index;
        idBuffer.forEach(function (x) {
          insed[x] = true;
        });
        idBuffer = [];
      } else {
        idBuffer.push(match[1]);
      }
    }
    result += html.substring(lastBackIndex, html.length);
    return result;
  };
};

exports.default = createRenderStylesToString;