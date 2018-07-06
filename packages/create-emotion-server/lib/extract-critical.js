'use strict';

exports.__esModule = true;


var createExtractCritical = function createExtractCritical(emotion) {
  return function (html) {
    // parse out ids from html
    // reconstruct css/rules/cache to pass
    var RGX = new RegExp(emotion.caches.key + '-([a-zA-Z0-9-]+)', 'gm');

    var o = { html: html, ids: [], css: '' };
    var match = void 0;
    var ids = {};
    while ((match = RGX.exec(html)) !== null) {
      if (ids[match[1]] === undefined) {
        ids[match[1]] = true;
      }
    }

    o.ids = Object.keys(emotion.caches.inserted).filter(function (id) {
      if ((ids[id] === true || emotion.caches.registered[emotion.caches.key + '-' + id] === undefined) && emotion.caches.inserted[id] !== true) {
        o.css += emotion.caches.inserted[id];
        return true;
      }
    });

    return o;
  };
};
exports.default = createExtractCritical;