import PRNG from './PRNG.js';

class LCG extends PRNG {
  constructor(seed, a = 1664525, c = 1013904223, m = 4294967296) {
    super(m);
    [seed, a, c, m].forEach(num => this.checkNum(num));
    this.orig = seed;
    this.x = this.orig;
    Object.assign(this, { a, c, m }); // Group assignment for brevity.
  }

  reset() {
    this.x = this.orig;
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
