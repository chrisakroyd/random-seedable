import PseudoRandomGenerator from './pseudoRandomGenerator.js';

class XORShift extends PseudoRandomGenerator {
  constructor(seed, a = 13, b = 17, c = 5) {
    super();
    this.orig = this.cast(BigInt(seed), 32);
    this.x = this.orig;
    this.a = this.cast(BigInt(a), 32);
    this.b = this.cast(BigInt(b), 32);
    this.c = this.cast(BigInt(c), 32);
  }

  set seed(seed) {
    this.orig = BigInt(seed)
    this.x = this.cast(this.orig, 32);
  }

  get seed() {
    return this.orig;
  }

  int() {
    let x = this.x;
    x ^= x << this.a;
    // Recast to uint32. BigInt on a left shift will always shift and keep digits regardless
    // of previous casting. Therefore re-cast is necessary to ensure code behaves the same w/r to orig c behaviour.
    x = this.cast(x, 32);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 32);
    this.x = x;
    return Number(this.x);
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

export default XORShift;
