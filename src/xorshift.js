import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

class XORShift extends PRNG {
  constructor(seed, a = 13, b = 17, c = 5) {
    super(MAX32);
    this.orig = this.cast(BigInt(seed), 32);
    this.x = this.orig;
    this.a = this.cast(BigInt(a), 32);
    this.b = this.cast(BigInt(b), 32);
    this.c = this.cast(BigInt(c), 32);
  }

  reset() {
    this.x = this.orig;
  }

  set seed(seed) {
    this.orig = BigInt(seed)
    this.x = this.cast(this.orig, 32);
  }

  get seed() {
    return this.orig;
  }

  int() {
    let x = this.x;
    x ^= x << this.a;
    // Recast to uint32. BigInt on a left shift will always shift and keep digits regardless
    // of previous casting. Therefore re-cast is necessary to ensure code behaves the same w/r to orig c behaviour.
    x = this.cast(x, 32);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 32);
    this.x = x;
    return Number(this.x);
  }
}

export default XORShift;
