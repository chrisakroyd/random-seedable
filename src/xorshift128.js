import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

/**
 * XorShift generators are fast, efficient generators with good randomness quality. This implementation
 * has 32 bit output with 128 bits of internal state.
 *
 * @example
 * const random = new XORShift128(Date.now(), 362436069, 521288629, 88675123);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} y -> First bit shift parameter.
 * @param {number | bigint} z -> Second bit shift parameter.
 * @param {number | bigint} w -> Third bit shift parameter.
 */
class XORShift128 extends PRNG {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} y -> First bit shift parameter.
   * @param {number | bigint} z -> Second bit shift parameter.
   * @param {number | bigint} w -> Third bit shift parameter.
   */
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

  /**
   * Resets the generator to its original state.
   */
  reset() {
    this.x = this.seed;
    Object.assign(this, this.origParams);
  }

  /**
   * Seed getter.
   *
   * @public
   * @returns {number | bigint} Retrieves seed.
   */
  get seed() {
    return this._seed;
  }

  /**
   * Converts seed into BigInt + takes steps to reset generator.
   *
   * @public
   * @param {number | bigint} seed -> New seed to set.
   */
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

export default XORShift128;
