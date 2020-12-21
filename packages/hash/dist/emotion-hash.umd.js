!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = function (e) {
        for (var t, o = 0, c = 0, r = e.length; r >= 4; ++c, r -= 4)
          (t =
            1540483477 *
              (65535 &
                (t =
                  (255 & e.charCodeAt(c)) |
                  ((255 & e.charCodeAt(++c)) << 8) |
                  ((255 & e.charCodeAt(++c)) << 16) |
                  ((255 & e.charCodeAt(++c)) << 24))) +
            ((59797 * (t >>> 16)) << 16)),
            (o =
              (1540483477 * (65535 & (t ^= t >>> 24)) +
                ((59797 * (t >>> 16)) << 16)) ^
              (1540483477 * (65535 & o) + ((59797 * (o >>> 16)) << 16)))
        switch (r) {
          case 3:
            o ^= (255 & e.charCodeAt(c + 2)) << 16
          case 2:
            o ^= (255 & e.charCodeAt(c + 1)) << 8
          case 1:
            o =
              1540483477 * (65535 & (o ^= 255 & e.charCodeAt(c))) +
              ((59797 * (o >>> 16)) << 16)
        }
        return (
          ((o =
            1540483477 * (65535 & (o ^= o >>> 13)) +
            ((59797 * (o >>> 16)) << 16)) ^
            (o >>> 15)) >>>
          0
        ).toString(36)
      })
    : 'function' == typeof define && define.amd
    ? define(function () {
        return function (e) {
          for (var t, o = 0, c = 0, r = e.length; r >= 4; ++c, r -= 4)
            (t =
              1540483477 *
                (65535 &
                  (t =
                    (255 & e.charCodeAt(c)) |
                    ((255 & e.charCodeAt(++c)) << 8) |
                    ((255 & e.charCodeAt(++c)) << 16) |
                    ((255 & e.charCodeAt(++c)) << 24))) +
              ((59797 * (t >>> 16)) << 16)),
              (o =
                (1540483477 * (65535 & (t ^= t >>> 24)) +
                  ((59797 * (t >>> 16)) << 16)) ^
                (1540483477 * (65535 & o) + ((59797 * (o >>> 16)) << 16)))
          switch (r) {
            case 3:
              o ^= (255 & e.charCodeAt(c + 2)) << 16
            case 2:
              o ^= (255 & e.charCodeAt(c + 1)) << 8
            case 1:
              o =
                1540483477 * (65535 & (o ^= 255 & e.charCodeAt(c))) +
                ((59797 * (o >>> 16)) << 16)
          }
          return (
            ((o =
              1540483477 * (65535 & (o ^= o >>> 13)) +
              ((59797 * (o >>> 16)) << 16)) ^
              (o >>> 15)) >>>
            0
          ).toString(36)
        }
      })
    : ((e || self).hash = function (e) {
        for (var t, o = 0, c = 0, r = e.length; r >= 4; ++c, r -= 4)
          (t =
            1540483477 *
              (65535 &
                (t =
                  (255 & e.charCodeAt(c)) |
                  ((255 & e.charCodeAt(++c)) << 8) |
                  ((255 & e.charCodeAt(++c)) << 16) |
                  ((255 & e.charCodeAt(++c)) << 24))) +
            ((59797 * (t >>> 16)) << 16)),
            (o =
              (1540483477 * (65535 & (t ^= t >>> 24)) +
                ((59797 * (t >>> 16)) << 16)) ^
              (1540483477 * (65535 & o) + ((59797 * (o >>> 16)) << 16)))
        switch (r) {
          case 3:
            o ^= (255 & e.charCodeAt(c + 2)) << 16
          case 2:
            o ^= (255 & e.charCodeAt(c + 1)) << 8
          case 1:
            o =
              1540483477 * (65535 & (o ^= 255 & e.charCodeAt(c))) +
              ((59797 * (o >>> 16)) << 16)
        }
        return (
          ((o =
            1540483477 * (65535 & (o ^= o >>> 13)) +
            ((59797 * (o >>> 16)) << 16)) ^
            (o >>> 15)) >>>
          0
        ).toString(36)
      })
})(this)
//# sourceMappingURL=emotion-hash.umd.js.map
