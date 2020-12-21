module.exports = function (e) {
  for (var t, r = 0, c = 0, o = e.length; o >= 4; ++c, o -= 4)
    (t =
      1540483477 *
        (65535 &
          (t =
            (255 & e.charCodeAt(c)) |
            ((255 & e.charCodeAt(++c)) << 8) |
            ((255 & e.charCodeAt(++c)) << 16) |
            ((255 & e.charCodeAt(++c)) << 24))) +
      ((59797 * (t >>> 16)) << 16)),
      (r =
        (1540483477 * (65535 & (t ^= t >>> 24)) +
          ((59797 * (t >>> 16)) << 16)) ^
        (1540483477 * (65535 & r) + ((59797 * (r >>> 16)) << 16)))
  switch (o) {
    case 3:
      r ^= (255 & e.charCodeAt(c + 2)) << 16
    case 2:
      r ^= (255 & e.charCodeAt(c + 1)) << 8
    case 1:
      r =
        1540483477 * (65535 & (r ^= 255 & e.charCodeAt(c))) +
        ((59797 * (r >>> 16)) << 16)
  }
  return (
    ((r =
      1540483477 * (65535 & (r ^= r >>> 13)) + ((59797 * (r >>> 16)) << 16)) ^
      (r >>> 15)) >>>
    0
  ).toString(36)
}
//# sourceMappingURL=emotion-hash.js.map
