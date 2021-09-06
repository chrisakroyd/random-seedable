import PRNG64 from './PRNG64.js';
import { MAX53 } from './constants.js';

/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * 64 bits of output with 128 internal state.
 *
 * @example
 * const random = new XORShift128Plus(Date.now(), 362436069);
 *
 * @class
 * @extends {PRNG64}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} y -> Second seed.
 */
class XORShift128Plus extends PRNG64 {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} y -> Second seed.
   */
  constructor(seed = Date.now(), y = 362436069) {
    super(MAX53, seed);
    this.seed = seed;
    this.y = this.cast(BigInt(y), 64);
    this.origParams = { y: this.y };
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
