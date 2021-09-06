import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This generator has 32 bit output with 32 bits of internal state.
 *
 * @example
 * const random = new XORShift(11234, 13, 17, 5);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} a -> First bit shift parameter.
 * @param {number | bigint} b -> Second bit shift parameter.
 * @param {number | bigint} c -> Third bit shift parameter.
 */
class XORShift extends PRNG {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} a -> First bit shift parameter.
   * @param {number | bigint} b -> Second bit shift parameter.
   * @param {number | bigint} c -> Third bit shift parameter.
   */
  constructor(seed = Date.now(), a = 13, b = 17, c = 5) {
    super(MAX32, BigInt(seed));
    this.seed = seed;
    /**
     * @private
     * @type {BigInt}
     */
    this.a = this.cast(BigInt(a), 32);
    /**
     * @private
     * @type {BigInt}
     */
    this.b = this.cast(BigInt(b), 32);
    /**
     * @private
     * @type {BigInt}
     */
    this.c = this.cast(BigInt(c), 32);
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
    this.x = this._seed;
  }

  _int() {
    let { x } = this;
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
