import PRNG from './PRNG.js';

class LCG extends PRNG {
  constructor(seed, a = 1664525, c = 1013904223, m = 4294967296) {
    super(m, seed);
    [seed, a, c, m].forEach(num => this.checkNum(num));
    this.seed = seed;
    Object.assign(this, { a, c, m }); // Group assignment for brevity.
  }

  reset() {
    this.x = this.seed;
  }

  get seed() {
    return this._seed;
  }

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
