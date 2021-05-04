import PRNG from './PRNG.js';
import { MAX32 } from './constants.js';

const MATRIX_A = 0x9908b0dfn; /* constant vector a */
const UPPER_MASK = 0x80000000n; /* most significant w-r bits */
const LOWER_MASK = 0x7fffffffn; /* least significant r bits */

// https://github.com/boo1ean/mersenne-twister/blob/master/src/mersenne-twister.js
//   https://gist.github.com/banksean/300494
//     https://upload.wikimedia.org/wikipedia/commons/b/b5/Mersenne_Twister_visualisation.svg
// https://gitlab.com/rockerest/fast-mersenne-twister/-/blob/master/mersenne.js

class MersenneTwister extends PRNG {
  constructor(seed, n = 624, m = 397) {
    super(MAX32, BigInt(seed));
    this.state = new Array(n);
    this.N = n;
    this.M = m;
    this.initf = 0;
    this.stateIndex = 0;

    // Trigger seed setter after all variables initialised.
    this.seed = seed;
  }

  get seed() {
    return this._seed;
  }

  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 32)
    this.state[0] = this._seed & 0xffffffffn;

    for (let j = 1; j < this.N; j++) {
      this.state[j] = (1812433253n * (this.state[j - 1] ^ (this.state[j - 1] >> 30n)) + BigInt(j));
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array state[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.state[j] &= 0xffffffffn;  /* for >32 bit machines */
    }
    this.initf = 1;
  }

  mixBits(u, v) {
    return ( ((u) & UPPER_MASK) | ((v) & LOWER_MASK) );
  }

  twist(u, v) {
    return ((this.mixBits(u, v) >> 1n) ^ ((v) & 1n ? MATRIX_A : 0n))
  }

  nextState() {
    let j = 0;

    for (; j < this.N - this.M; j++) {
      this.state[j] = this.state[j + this.M] ^ this.twist(this.state[j], this.state[j + 1]);
    }

    for (; j < this.N - 1; j++) {
      this.state[j] = this.state[j + (this.M - this.N)] ^ this.twist(this.state[j], this.state[j + 1]);
    }

    this.state[this.N - 1] = this.state[this.M - 1] ^ this.twist(this.state[this.N - 1], this.state[0])
    this.stateIndex = 0;
    this.initf = 0;
  }

  _int() {
    let y;

    if (this.stateIndex >= this.N || this.initf) {
      this.nextState();
    }

    y = this.state[this.stateIndex++];

    /* Tempering */
    y ^= (y >> 11n);
    y ^= (y << 7n) & 0x9d2c5680n;
    y ^= (y << 15n) & 0xefc60000n;
    y ^= (y >> 18n);

    return y;
  }
}

export default MersenneTwister;
