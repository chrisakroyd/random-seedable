import PRNG from '../src/PRNG.js';
import chai from 'chai';

const { expect } = chai;

const max = 235424;
const seed = 123123;

const overMax = [76886969, 879879789, 56757575, 5456478568];
const underMax = [12313, 123, 5446, 78556];

const castDown = [2n ** 43n, 2n ** 53n, 2n ** 51n, 2n ** 36n];
const castSame = [2n ** 21n, 2n ** 12n, 2n ** 31n, 2n ** 16n];
const bits = 32;

describe('PRNG method tests', () => {
  const prng = new PRNG(max, seed);

  it('Should catch numbers greater than max.', () => {
    overMax.forEach((num) => {
      expect(() => prng.checkNum(num)).to.throw(`Number greater than ${max}`);
    });

    underMax.forEach((num) => {
      expect(() => prng.checkNum(num)).to.not.throw(`Number greater than ${num}`);
    });
  });

  it('Should cast BigInt numbers correctly.', () => {
    castDown.forEach((num) => {
      expect(prng.cast(num, bits)).to.equal(0n);
    });

    castSame.forEach((num) => {
      expect(prng.cast(num, bits)).to.equal(num);
    });
  });

  it('Should throw error on non-subclassed int() calls.', () => {
    expect(() => prng._int()).to.throw('Method not implemented');
  });

  it('Should throw error on non-subclassed reset() calls.', () => {
    expect(() => prng.reset()).to.throw('Method not implemented');
  });
});
