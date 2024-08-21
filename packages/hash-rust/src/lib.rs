use wasm_bindgen::prelude::*;
use xxhash_rust::xxh32::xxh32;
use xxhash_rust::xxh3::xxh3_64;

// xxh via xxhash_rust

#[wasm_bindgen]
pub fn xxh(bytes: *const u8, length: usize) -> u32 {
  let data = unsafe { std::slice::from_raw_parts(
    std::mem::transmute::<_, *const u8>(bytes),
    length,
  ) };

  return xxh32(data, 0);
}


// murmur2 implementation based on emotion's implementation (differs from original)

const M: u32 = 0x5bd1e995;
const R: u32 = 24;

#[wasm_bindgen]
pub fn murmur2(bytes: *const u8, mut length: usize) -> u32 {
  let data = unsafe { std::slice::from_raw_parts(
    std::mem::transmute::<_, *const u32>(bytes),
    length, // so wrong but doesnt matter
  ) };

  let mut h = 0; // Not initialized to match emotion's implementation
  let mut i = 0;

  while length >= 4 {
    let mut k = unsafe { *data.get_unchecked(i) };

    k *= M;
    k ^= k >> R;
    k *= M;

    h *= M;
    h ^= k;

    i += 1;
    length -= 4;
  }

  if length >= 3 {
    h ^= (unsafe { *bytes.add(i + 2) as u32 } & 0xff) << 16;
  }
  if length >= 2 {
    h ^= (unsafe { *bytes.add(i + 1) as u32 } & 0xff) << 8;
  }
  if length >= 1 {
    h ^= (unsafe { *bytes.add(i + 0) as u32 } & 0xff);
    h = (h & 0xffff) * M + (((h >> 16) * 0xe995) << 16);
  }

  h ^= h >> 13;
  h = (h & 0xffff) * M + (((h >> 16) * 0xe995) << 16);
  h = h ^ (h >> 15);

  return h;
}
