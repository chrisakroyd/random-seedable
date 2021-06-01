import PRNG from './PRNG.js';

class PRNG64 extends PRNG {
  constructor(max, seed) {
    super(max, seed);
  }

  int() {
    return Number(this._int() >> 11n);
  }

  float() {
    return this.int() / this.max;
  }

  float53() {
    return this.float();
  }
}

export default PRNG64;
