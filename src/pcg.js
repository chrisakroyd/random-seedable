import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

/**
 * Permuted Congruential Generator (PCG) is again, a relatively simple generator that improves on the qualites
 * of LCG by improving its randomness quality by increasing its state size and using only the most significant bits
 * to produce the output. 32 bits of output.
 *
 * @example
 * const random = new PCG(Date.now(), 6364136223846793005n, 1442695040888963407n);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} mul -> Multiplier parameter.
 * @param {number | bigint} inc -> Increment parameter.
 */
class PCG extends PRNG {
  // constructor(seed = 0x4d595df4d0f33173n, mul = 6364136223846793005n, inc = 1442695040888963407n) {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} mul -> Multiplier parameter.
   * @param {number | bigint} inc -> Increment parameter.
   */
  constructor(seed = Date.now(), mul = 6364136223846793005n, inc = 1442695040888963407n) {
    super(MAX32, BigInt(seed));
    this.seed = seed;
    /**
     * @private
     * @type {bigint}
     */
    this.mul = this.cast(BigInt(mul), 64);
    /**
     * @private
     * @type {bigint}
     */
    this.inc = this.cast(BigInt(inc), 64);
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
   * Converts seed into BigInt + sets.
   *
   * @param {number | bigint} seed -> New seed to set.
   */
  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 64);
    this.x = this._seed;
  }

  /**
   * 32 bit rotation op.
   * @param {bigint} x -> x parameter of PCG algorithm.
   * @param {bigint} r -> r parameter of PCG algorithm.
   * @returns {bigint} Returns 32 bit result of rotation operation.
   */
  rotr32(x, r) {
    return this.cast(x >> r | x << (-r & 31n), 32);
  }

  _int() {
    let x = this.x;
    let count = x >> 59n; // 59 = 64 - 5
    this.x = x * this.mul + this.inc;
    this.x = this.cast(this.x, 64);
    x ^= x >> 18n; // 18 = (64 - 27) / 2
    return this.rotr32(this.cast((x >> 27n), 32), count); // 27 = 32 - 5
  }
}

export default PCG;
