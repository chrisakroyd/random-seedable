import PRNG from './PRNG.js';

class LCG extends PRNG {
  constructor(seed, a = 1664525, c = 1013904223, m = 4294967296) {
    super();
    this.orig = seed;
    this.x = this.orig;
    this.a = a;
    this.c = c;
    this.m = m;
    [seed, a, c, m].forEach(num => this.checkNum(num));
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
}

export default LCG;
