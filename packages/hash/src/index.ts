/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86

const hasTextEncoder = typeof TextEncoder !== 'undefined'

const encoder = hasTextEncoder ? new TextEncoder() : undefined

let bufferLength = -1
let buffer: ArrayBuffer
let uint8View: Uint8Array
let int32View: Int32Array

function encode(input: string): number {
  // Legacy IE11 support
  if (hasTextEncoder === false) {
    const bytes = []
    for (let i = 0; i < input.length; i++) {
      const codePoint = input.charCodeAt(i)
      if (codePoint > 0xff) {
        bytes.push(codePoint >>> 8)
        bytes.push(codePoint & 0xff)
      } else {
        bytes.push(codePoint)
      }
    }
    uint8View = new Uint8Array(bytes)
    int32View = new Int32Array(uint8View.buffer, 0, Math.floor(bytes.length / 4))

    return bytes.length
  }

  if (input.length > bufferLength) {
    // bufferLength must be a multiple of 4 to satisfy Int32Array constraints
    bufferLength = input.length + (4 - input.length % 4)

    // buffer.resize() is only available in recent browsers, so we re-allocate
    // a new buffer and views
    buffer = new ArrayBuffer(bufferLength)
    uint8View = new Uint8Array(buffer)
    int32View = new Int32Array(buffer)
  }

  return encoder!.encodeInto(input, uint8View).written as number;
}

export default function murmur2(input: string): string {
  const length = encode(input);

  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.

  const m = 0x5bd1e995;
  const r = 24;

  // Initialize the hash
  let h = 0

  // Mix 4 bytes at a time into the hash

  let i = 0
  let len = length
  for (; len >= 4; i++, len -= 4) {
    let k = int32View[i]

    k = Math.imul(k, m)
    k ^= k >>> r
    k = Math.imul(k, m)

    h = Math.imul(h, m)
    h ^= k
  }

  // Handle the last few bytes of the input array

  switch (len) {
    case 3:
      h ^= (uint8View[i * 4 + 2] & 0xff) << 16
    case 2:
      h ^= (uint8View[i * 4 + 1] & 0xff) << 8
    case 1:
      h ^= uint8View[i * 4] & 0xff
      h = Math.imul(h, m)
  }

  // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.

  h ^= h >>> 13
  h = Math.imul(h, m)
  h = (h ^ (h >>> 15)) >>> 0

  return h.toString(36)
}
