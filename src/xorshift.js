import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

class XORShift extends PRNG {
  constructor(seed = Date.now(), a = 13, b = 17, c = 5) {
    super(MAX32, BigInt(seed));
    this.seed = seed;
    this.a = this.cast(BigInt(a), 32);
    this.b = this.cast(BigInt(b), 32);
    this.c = this.cast(BigInt(c), 32);
  }

  reset() {
    this.x = this.seed;
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 32);
    this.x = this._seed;
  }

  _int() {
    let x = this.x;
    x ^= x << this.a;
    // Recast to uint32. BigInt on a left shift will always shift and keep digits regardless
    // of previous casting. Therefore re-cast is necessary to ensure code behaves the same w/r to _seed c behaviour.
    x = this.cast(x, 32);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 32);
    this.x = x;
    return x;
  }
}

export default XORShift;
