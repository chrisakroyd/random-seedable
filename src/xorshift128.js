import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

class XorShift128 extends PRNG {
  constructor(seed = Date.now(), y = 362436069, z = 521288629, w = 88675123) {
    super(MAX32, BigInt(seed));
    this.seed = seed;
    this.y = this.cast(BigInt(y), 32);
    this.z = this.cast(BigInt(z), 32);
    this.w = this.cast(BigInt(w), 32);
    this.origParams = {
      y: this.y, z: this.z, w: this.w,
    };
  }

  reset() {
    this.x = this.seed;
    Object.assign(this, this.origParams);
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 32);
    this.reset();
  }

  _int() {
    let { x, w } = this;

    x ^= x << 11n;
    x = this.cast(x, 32);
    x ^= x >> 8n;
    w ^= w >> 19n;

    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = w ^ x;
    return this.w;
  }
}

export default XorShift128;
