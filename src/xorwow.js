import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

class XORWow extends PRNG {
  constructor(seed = Date.now(), y = 362436069, z = 521288629, w = 88675123,
    v = 5783321, d = 6615241, weyl = 362437) {
    super(MAX32, BigInt(seed));
    // Other PRNGs call the seed setter, we do not do this here as it would add too much complexity to the function.
    this._seed = this.cast(this._seed, 32);
    this.x = this._seed;

    this.y = this.cast(BigInt(y), 32);
    this.z = this.cast(BigInt(z), 32);
    this.w = this.cast(BigInt(w), 32);
    this.v = this.cast(BigInt(v), 32);
    this.d = this.cast(BigInt(d), 32);
    this.weyl = this.cast(BigInt(weyl), 32);

    this.origParams = {
      y: this.y, z: this.z, w: this.w, v: this.v, d: this.d,
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
    let t = this.x;
    let { v } = this;

    t ^= t >> 2n;
    t ^= t << 1n;
    v ^= v << 4n;

    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.v;
    this.v = this.cast(v ^ t, 32);
    this.d += this.weyl;
    return this.cast(this.d + this.v, 32);
  }
}

export default XORWow;
