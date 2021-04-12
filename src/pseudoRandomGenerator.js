/**
 * Superclass for all implemented 32 bit generators.
**/
class PseudoRandomGenerator {
  constructor() {
    this.max = (2 ** 32) - 1;
  }

  cast(number, bits) {
    return BigInt.asUintN(bits, number);
  }
}

export default PseudoRandomGenerator;
