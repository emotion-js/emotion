let imports = {};
let wasm;

const path = require('path').join(__dirname, './pkg/murmur_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;


// Manually written to encode faster than wasm_bindgen does.

let MEM_START = 32 // Alignement for the bytes slice

let memory = null;
let cachedTextEncoder = new TextEncoder('utf-8');

module.exports.murmur2 = function(input) {
    const result = cachedTextEncoder.encodeInto(input, memory);

    const ptr0 = MEM_START;
    const len0 = result.written;

    const ret = wasm.murmur2(ptr0, len0);
    return ret >>> 0;
};
memory = new Uint8Array(wasm.memory.buffer).subarray(MEM_START);
