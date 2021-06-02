import PRNG64 from './prng64.js';
import { MAX53 } from './constants.js';

class XORShift128Plus extends PRNG64 {
  constructor(seed = Date.now(), y = 362436069) {
    super(MAX53, seed);
    this.seed = seed;
    this.y = this.cast(BigInt(y), 64);
    this.origParams = { y: this.y };
  }

  reset() {
    this.x = this.seed;
    Object.assign(this, this.origParams);
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 64);
    this.reset();
  }

  _int() {
    let s1 = this.x;
    const s0 = this.y;
    const result = this.cast(s0 + s1, 64);
    this.x = s0;
    s1 ^= s1 << 23n; // a
    s1 = this.cast(s1, 64);
    this.y = s1 ^ s0 ^ (s1 >> 18n) ^ (s0 >> 5n); // b, c
    return result;
  }
}

export default XORShift128Plus;
