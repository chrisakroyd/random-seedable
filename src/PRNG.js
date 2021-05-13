import { MAX32 } from './constants.js';

/**
 * Superclass for all implemented generators.
**/
class PRNG {
  constructor(max, seed) {
    this.max = max;
    this._seed = seed;
  }

  cast(number, bits) {
    return BigInt.asUintN(bits, number);
  }

  checkNum(num) {
    if (num > this.max) {
      throw new Error(`Number greater than ${this.max}`);
    }
  }

  reset() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
  }

  _int() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
    return BigInt(0);
  }

  bool() {
    return this.float() > 0.5;
  }

  int() {
    return Number(this._int());
  }

  bigInt() {
    return this._int();
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

  randBelow(max) {
    return this.randRange(0, max);
  }

  choice(array) {
    return array[this.randBelow(array.length)];
  }

  shuffle(array, inPlace = true) {
    let toSort = array;

    if (!inPlace) {
      toSort = Array.from(toSort);
    }

   // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle.
   for (let i = toSort.length - 1; i > 0; i--) {
      const j = this.randRange(0, i);
      const temp = toSort[i];
      toSort[i] = toSort[j];
      toSort[j] = temp;
    }

    return toSort;
  };

  initArray(size, mapFn) {
    return Array.from({ length: size }, mapFn);
  }

  boolArray(size) {
    return this.initArray(size, () => this.bool());
  }

  intArray(size) {
    return this.initArray(size, () => this.int());
  }

  bigIntArray(size) {
    return this.initArray(size, () => this.bigInt());
  }

  randRangeArray(size, lowerBound, upperBound) {
    return this.initArray(size, () => this.randRange(lowerBound, upperBound));
  }

  floatArray(size) {
    return this.initArray(size, () => this.float());
  }

  float53Array(size) {
    return this.initArray(size, () => this.float53());
  }
}

export default PRNG;
