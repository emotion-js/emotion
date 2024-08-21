use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);
}


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
