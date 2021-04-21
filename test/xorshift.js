import chai from 'chai';
import XORShift from '../src/xorshift.js';
import { exactSeqTestFn, floatGenTestFn, resetTestFn, seedChangeTestFn, withinRangeTestFn } from './commonTests.js';

const expect = chai.expect;

// First twenty numbers from cpp reference.
const seed = 1;
const seed2 = 11234;

const testData = [
  270369, 67634689, 2647435461, 307599695, 2398689233, 745495504, 632435482, 435756210, 2005365029, 2916098932,
  2657092299, 1495045943, 3031976842, 82049198, 87470069, 3385103793, 891394312, 3323190024, 321008529, 4283899417,
];

const testData2 = [
  2867938012, 3623547561, 3160234430, 4198028139, 3941444449, 2947887233, 1023909427, 385004339, 1376427097, 834023353,
  2087700153, 330053701, 4100343, 2518885639, 2733913222, 2834837556, 1898057259, 738835800, 1878303145, 2214491497,
];

const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

const Random = XORShift;

describe('XorShift generator 32 bit.', () => {
  describe('XorShift generator should be seeded with correct values.', () => {
    const random = new XORShift(seed);

    it(`Expect initial seed to be set correctly.`, () => {
      expect(random.seed).to.equal(BigInt(seed));
    });

    it(`Expect new seed to be set correctly.`, () => {
      random.seed = seed2;
      expect(random.seed).to.equal(BigInt(seed2));
    });
  });

  // Tests for the production of an exact sequence of numbers from the seed.
  exactSeqTestFn(new Random(seed), testData, seed);
  exactSeqTestFn(new Random(seed2), testData2, seed2);

  // Tests for successful reset of the generator.
  resetTestFn(new Random(seed), testData);

  // Test that the generator stays within the given bounds.
  withinRangeTestFn(new Random(seed), lowerBound, upperBound, numDraws);

  // Test that generator actually produces floats.
  floatGenTestFn(new Random(seed), numDraws);

  // Test that generator generates two different, exact sequences after being reseeded.
  seedChangeTestFn(new Random(seed), seed2, testData, testData2);
});
