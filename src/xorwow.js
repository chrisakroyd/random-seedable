import PseudoRandomGenerator from './pseudoRandomGenerator.js';

// First twenty numbers for from cpp reference.
// 246875399
// 3690007200
// 1264581005
// 3906711041
// 1866187943
// 2481925219
// 2464530826
// 1604040631
// 3653403911
// 3578085384
// 1200525144
// 4095560648
// 505361588
// 4238824340
// 1727412667
// 4242574606
// 1873697870
// 2935408675
// 77509492
// 3202066555

class XORWow extends PseudoRandomGenerator {
  constructor(seed = 123456789, y = 362436069, z = 521288629, w = 88675123,
              v = 5783321, d = 6615241, weyl = 362437) {
    super();
    this.orig = this.cast(BigInt(seed), 32);
    this.x = this.orig;
    this.y = this.cast(BigInt(y), 32);
    this.z = this.cast(BigInt(z), 32);
    this.w = this.cast(BigInt(w), 32);
    this.v = this.cast(BigInt(v), 32);
    this.d = this.cast(BigInt(d), 32);
    this.weyl = this.cast(BigInt(weyl), 32);
    this.max = (2 ** 32) - 1;
  }

  int() {
    let t = this.x;
    let v = this.v;

    t ^= t >> 2n;
    t = this.cast(t, 32);
    t ^= t << 1n;
    t = this.cast(t, 32);
    v ^= v << 4n;
    v = this.cast(v, 32);

    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.v;
    this.v = v ^ t;
    this.d += this.weyl;

    return Number(this.d + this.v);
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

export default XORWow;
