import PRNG from './PRNG.js';

class PRNG64 extends PRNG {
  constructor(max, seed) {
    super(max, seed);
  }

  int() {
    // Javascript only has 2 ** 53 integer positions, take 64 bit output and only take the upper 53 bits for use
    // as our output Number in int mode.
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
