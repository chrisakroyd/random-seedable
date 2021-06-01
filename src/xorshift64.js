import PRNG64 from './PRNG64.js';
import { MAX53 } from './constants.js';

class XORShift64 extends PRNG64 {
  constructor(seed = Date.now(), a = 13, b = 7, c = 17) {
    super(MAX53, BigInt(seed));
    this.seed = seed;
    this.a = this.cast(BigInt(a), 64);
    this.b = this.cast(BigInt(b), 64);
    this.c = this.cast(BigInt(c), 64);
  }

  reset() {
    this.x = this.seed;
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 64);
    this.x = this._seed;
  }

  _int() {
    let { x } = this;
    x ^= x << this.a;
    x = this.cast(x, 64);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 64);
    this.x = x;
    return x;
  }
}

export default XORShift64;
