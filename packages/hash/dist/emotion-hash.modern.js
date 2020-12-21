function t(t) {
  for (var e, r = 0, a = 0, c = t.length; c >= 4; ++a, c -= 4)
    (e =
      1540483477 *
        (65535 &
          (e =
            (255 & t.charCodeAt(a)) |
            ((255 & t.charCodeAt(++a)) << 8) |
            ((255 & t.charCodeAt(++a)) << 16) |
            ((255 & t.charCodeAt(++a)) << 24))) +
      ((59797 * (e >>> 16)) << 16)),
      (r =
        (1540483477 * (65535 & (e ^= e >>> 24)) +
          ((59797 * (e >>> 16)) << 16)) ^
        (1540483477 * (65535 & r) + ((59797 * (r >>> 16)) << 16)))
  switch (c) {
    case 3:
      r ^= (255 & t.charCodeAt(a + 2)) << 16
    case 2:
      r ^= (255 & t.charCodeAt(a + 1)) << 8
    case 1:
      r =
        1540483477 * (65535 & (r ^= 255 & t.charCodeAt(a))) +
        ((59797 * (r >>> 16)) << 16)
  }
  return (
    ((r =
      1540483477 * (65535 & (r ^= r >>> 13)) + ((59797 * (r >>> 16)) << 16)) ^
      (r >>> 15)) >>>
    0
  ).toString(36)
}
export default t
//# sourceMappingURL=emotion-hash.modern.js.map
