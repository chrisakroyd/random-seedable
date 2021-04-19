/**
 * Superclass for all implemented 32 bit generators.
**/
class PRNG {
  constructor() {
    this.max = (2 ** 32);
  }

  cast(number, bits) {
    return BigInt.asUintN(bits, number);
  }

  checkNum(num) {
    // 32bit only.
    if (num > this.max) {
      console.log(num);
      console.log(this.max);
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

  boundedInt(min, max) {
    // Debiased Modulo method,
    // https://docs.oracle.com/javase/6/docs/api/java/util/Random.html#nextInt%28int%29
    // https://peteroupc.github.io/randomnotes.html
    // https://www.pcg-random.org/posts/bounded-rands.html
    const range = max - min;
    const t = (2 ** 32) % range
    let r = this.int();

    while (r < t) {
      r = this.int();
    }

    return min + (r % range);
  }
}

export default PRNG;
