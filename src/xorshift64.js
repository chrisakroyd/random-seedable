import PRNG64 from './PRNG64.js';
import { MAX53 } from './constants.js';

/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This implementation has 64 bit output with 64 bits of internal state.
 *
 * @example
 * const random = new XORShift64(11234, 13, 7, 17);
 *
 * @class
 * @extends {PRNG64}
 * @param {number | BigInt} seed -> Initial seed.
 * @param {number | BigInt} a -> First bit shift parameter.
 * @param {number | BigInt} b -> Second bit shift parameter.
 * @param {number | BigInt} c -> Third bit shift parameter.
 */
class XORShift64 extends PRNG64 {
  /**
   * @constructor
   * @param {number | BigInt} seed -> Initial seed.
   * @param {number | BigInt} a -> First bit shift parameter.
   * @param {number | BigInt} b -> Second bit shift parameter.
   * @param {number | BigInt} c -> Third bit shift parameter.
   */
  constructor(seed = Date.now(), a = 13, b = 7, c = 17) {
    super(MAX53, BigInt(seed));
    this.seed = seed;
    /**
     * @private
     * @type {BigInt}
     */
    this.a = this.cast(BigInt(a), 64);
    /**
     * @private
     * @type {BigInt}
     */
    this.b = this.cast(BigInt(b), 64);
    /**
     * @private
     * @type {BigInt}
     */
    this.c = this.cast(BigInt(c), 64);
  }

  /**
   * Resets the generator to its original state.
   */
  reset() {
    this.x = this.seed;
  }

  /**
   * Seed getter.
   *
   * @public
   * @returns {number | BigInt} Retrieves seed.
   */
  get seed() {
    return this._seed;
  }

  /**
   * Converts seed into BigInt + takes steps to reset generator.
   *
   * @public
   * @param {number | BigInt} seed -> New seed to set.
   */
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
