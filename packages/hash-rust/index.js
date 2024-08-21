let imports = {}
let wasm

const path = require('path').join(__dirname, './pkg/murmur_bg.wasm')
const bytes = require('fs').readFileSync(path)
const wasmModule = new WebAssembly.Module(bytes)
const wasmInstance = new WebAssembly.Instance(wasmModule, imports)
wasm = wasmInstance.exports

// Manually written to encode faster than wasm_bindgen does.

let MEM_START = 32 // Alignement for the bytes slice

let memory = new Uint8Array(wasm.memory.buffer).subarray(MEM_START)
let cachedTextEncoder = new TextEncoder('utf-8')

module.exports.xxh = wrapStringToU32('xxh')
module.exports.murmur2 = wrapStringToU32('murmur2')

function wrapStringToU32(name) {
  return function(input) {
      const ptr0 = MEM_START
      const len0 = cachedTextEncoder.encodeInto(input, memory).written
      const ret = wasm[name](ptr0, len0)
      return ret
  }
}

