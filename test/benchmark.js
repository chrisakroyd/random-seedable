import { expect } from 'chai';
import {
  rangeTest,
  modulo,
  debiasedModuloOnce,
  debiasedModuloTwice,
  debiasedIntegerMultiplication,
  divisionWithRejection,
} from '../benchmark/ranges.js';
import { XORWow } from '../src/index.js';
import { MAX32 } from '../src/constants.js';

describe('Benchmarking sanity tests', () => {
  describe('Random range methods ', () => {
    const rangeFuncs = [
      { name: 'Modulo', gen: modulo },
      { name: 'Debiased modulo (once)', gen: debiasedModuloOnce },
      { name: 'Debiased modulo (twice)', gen: debiasedModuloTwice },
      { name: 'Debiased integer multiplication', gen: debiasedIntegerMultiplication },
      { name: 'Division with rejection', gen: divisionWithRejection },
    ];

    const lowerBound = 8;
    const upperBound = 24;
    const numDraws = 5000;

    rangeFuncs.forEach((range) => {
      const random = new XORWow(123456789);

      it(`Expect ${range.name} function to stay within the range ${lowerBound} - ${upperBound}`, () => {
        for (let i = 0; i < numDraws; i += 1) {
          const randNum = range.gen(random, lowerBound, upperBound);
          expect(randNum).to.not.equal(undefined);
          expect(randNum).to.be.greaterThanOrEqual(lowerBound);
          expect(randNum).to.be.lessThanOrEqual(upperBound);
        }
      });
    });
  });

  describe('Range benchmark runner test', () => {
    const random = new XORWow(123456789);
    // Wide-range test.
    const wideRange = rangeTest([{ name: 'Debiased', gen: debiasedIntegerMultiplication }], random, 0, MAX32, 500);
    wideRange.forEach((result) => {
      expect(result.name).to.equal('Debiased');
      expect(result.duration).to.be.a('number');
    });
  });
});
