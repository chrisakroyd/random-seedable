import { MAX32 } from './constants.js';

/**
 * Superclass for all implemented generators.
**/
class PRNG {
  constructor(max, seed) {
    this.max = max;
    this._seed = seed;
  }

  get seed() {
    return this._seed;
  }

  cast(number, bits) {
    return BigInt.asUintN(bits, number);
  }

  checkNum(num) {
    if (num > this.max) {
      throw new Error(`Number greater than ${this.max}`);
    }
  }

  int() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
    return 0;
  }

  reset() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
  }

  float() {
    return this.int() * (1.0 / this.max);
  }

  float53() {
    const a = this.int() >>> 5;
    const b = this.int() >>> 6;

    return ( a * 67108864.0 + b ) * ( 1.0 / 9007199254740992.0 );
  }

  randRange(min, max) {
    // Debiased Modulo method,
    // https://docs.oracle.com/javase/6/docs/api/java/util/Random.html#nextInt%28int%29
    // https://peteroupc.github.io/randomnotes.html
    // https://www.pcg-random.org/posts/bounded-rands.html
    const range = max - min;
    const t = MAX32 % range
    let r = this.int();

    while (r < t) {
      r = this.int();
    }

    return min + (r % range);
  }
}

export default PRNG;
