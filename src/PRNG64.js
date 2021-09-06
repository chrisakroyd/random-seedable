import PRNG from './PRNG.js';

/**
 * 64 bit modification of PRNG class.
 * @class
 * @extends {PRNG}
 * @param {number | BigInt} max -> Max number that can be generated by this generator.
 * @param {number | BigInt} seed -> Initial seed.
 */
class PRNG64 extends PRNG {
  /**
   * @constructor
   * @param {number | BigInt} max -> Max number that can be generated by this generator.
   * @param {number | BigInt} seed -> Initial seed.
   */
  constructor(max, seed) {
    super(max, seed);
  }

  /**
   * Generates and returns the next number in the PRNGs sequence.
   * As this is a 64 bit generator and javascript integers are limited to 53 bits,
   * the generated BigInt result is right-shifted 11 bits; discarding the least significant bits.
   *
   * @example
   * random.int();
   *
   * @example
   * random.int(); // 85424123
   *
   * @public
   * @returns {number} Number less than 2 ** 53 for 64 bit generators.
   */
  int() {
    // Javascript only has 2 ** 53 integer positions, take 64 bit output and only take the upper 53 bits for use
    // as our output Number in int mode.
    return Number(this._int() >> 11n);
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float();
   *
   * @example
   * random.float(); // 0.234242
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float() {
    return this.int() / this.max;
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float53();
   *
   * @example
   * random.float53(); // 0.2342422341231
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float53() {
    return this.float();
  }
}

export default PRNG64;
