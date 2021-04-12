import PseudoRandomGenerator from './pseudoRandomGenerator.js';

class LCG extends PseudoRandomGenerator {
  constructor(seed, a = 1664525, c = 1013904223, m = 4294967296) {
    super();
    this.orig = seed;
    this.x = this.orig;
    this.a = a;
    this.c = c;
    this.m = m;
    this.max = m - 1;
    [seed, a, c, m].forEach(num => this.checkNum(num));
  }

  checkNum(num) {
    // 32bit only.
    if (num > 2 ** 32) {
      throw new Error('Too large error.');
    }
  }

  set seed(seed) {
    this.orig = seed;
    this.x = this.orig;
  }

  get seed() {
    return this.orig;
  }

  int() {
    this.x = (this.a * this.x + this.c) % this.m;
    return this.x;
  }

  float() {
    return this.int() / this.max;
  }

  boundedInt(min, max) {
    // Debiased Modulo method,
    // https://docs.oracle.com/javase/6/docs/api/java/util/Random.html#nextInt%28int%29
    // https://peteroupc.github.io/randomnotes.html
    // https://www.pcg-random.org/posts/bounded-rands.html
    let t = 2 ** 32 % max;
    let r = this.int();

    while (r < t) {
      r = this.int();
    }

    return min + (r % max);
  }
}

export default LCG;
