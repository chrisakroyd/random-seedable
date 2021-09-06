import PRNG from './PRNG.js';

/**
 * Linear Congruential Generator (LCG) is a simple generator originally devised in 1951,
 * if you need something quick with minimal memory usage and not the best quality randomness,
 * this is for you. 32 bits of output.
 *
 * @example
 * const random = new LCG(1234, 1664525, 1013904223, 4294967296);
 *
 * @class
 * @extends {PRNG}
 * @param {number} seed ->  Initial seed.
 * @param {number} a -> Multiplier parameter.
 * @param {number} c -> Increment parameter.
 * @param {number} m -> Modulus parameter.
 */
class LCG extends PRNG {
  /**
   * @constructor
   * @param {number} seed ->  Initial seed.
   * @param {number} a -> Multiplier parameter.
   * @param {number} c -> Increment parameter.
   * @param {number} m -> Modulus parameter.
   */
  constructor(seed = Date.now(), a = 1664525, c = 1013904223, m = 4294967296) {
    super(m, seed);
    [seed, a, c, m].forEach((num) => this.checkNum(num));
    this.seed = seed;
    Object.assign(this, { a, c, m }); // Group assignment for brevity.
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
   * @param {number | bigint} seed -> New seed to set.
   */
  set seed(seed) {
    this._seed = seed;
    this.x = this._seed;
  }

  _int() {
    this.x = (this.a * this.x + this.c) % this.m;
    return BigInt(this.x);
  }
}

export default LCG;
