import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

class PCG extends PRNG {
  constructor(seed = 0x4d595df4d0f33173n, mul = 6364136223846793005n, inc = 1442695040888963407n) {
    super(MAX32);
    this.orig = this.cast(BigInt(seed), 64);
    this.x = this.orig;
    this.mul = this.cast(BigInt(mul), 64);
    this.inc = this.cast(BigInt(inc), 64);
  }

  reset() {
    this.x = this.orig;
  }

  set seed(seed) {
    this.orig = this.cast(BigInt(seed), 64);
    this.reset();
  }

  get seed() {
    return this.orig;
  }

  rotr32(x, r) {
    return this.cast(x >> r | x << (-r & 31n), 32);
  }

  int() {
    let x = this.x;
    let count = x >> 59n; // 59 = 64 - 5
    this.x = x * this.mul + this.inc;
    this.x = this.cast(this.x, 64);
    x ^= x >> 18n; // 18 = (64 - 27) / 2
    return Number(this.rotr32(this.cast((x >> 27n), 32), count)); // 27 = 32 - 5
  }
}

export default PCG;
