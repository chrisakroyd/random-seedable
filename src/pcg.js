import PseudoRandomGenerator from './pseudoRandomGenerator.js';

class PCG extends PseudoRandomGenerator {
  constructor(seed = 0x4d595df4d0f33173n, mul = 6364136223846793005n, inc = 1442695040888963407n) {
    super();
    this.orig = BigInt(seed);
    this.x = this.cast(this.orig, 64);
    this.mul = this.cast(BigInt(mul), 64);
    this.inc = this.cast(BigInt(inc), 64);
  }

  set seed(seed) {
    this.orig = BigInt(seed)
    this.x = this.cast(this.orig, 64) + this.inc;
  }

  get seed() {
    return this.orig;
  }

  rotr32(x, r) {
    return this.cast(x >> r | x << (-r & 31n), 32);
  }

  int() {
    let x = this.x;
    let count = this.cast((x >> 59n), 64); // 59 = 64 - 5
    this.x = x * this.mul + this.inc;
    this.x = this.cast(this.x, 64);
    x ^= x >> 18n; // 18 = (64 - 27) / 2
    return Number(this.rotr32(this.cast((x >> 27n), 32), count)); // 27 = 32 - 5
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

export default PCG;
