import chai from 'chai';
import LCG from '../src/lcg.js';
import {
  exactSeqTestFn,
  resetTestFn,
  withinRangeTestFn,
  floatGenTestFn,
  seedChangeTestFn,
  choiceTestFn,
  arrayInitTestFn,
  uniqueItemTestFn,
} from './commonTests.js';

const expect = chai.expect;

// First ten numbers for seq 10 from cpp reference.
const seed = 1234;
const seed2 = 1234789;

const testData = [
  3067928073, 889114580, 3219257635, 1486326822, 3450746189, 1275680328, 1045497095, 742129338, 1126366929, 2032544252,
];

const testData2 = [
  3356696960, 1245751007, 268125874, 297694825, 2525613236, 3331461251, 557382662, 1028924333, 1540403496, 1501946471,
];

const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

const Random = LCG;

describe('LCG Generator.', () => {
  describe('Generator should be seeded with correct values.', () => {
    const random = new LCG(seed);

    it(`Expect initial seed to be set correctly.`, () => {
      expect(random.seed).to.equal(seed);
    });

    it(`Expect new seed to be set correctly.`, () => {
      random.seed = seed2;
      expect(random.seed).to.equal(seed2);
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

  // Choice
  choiceTestFn(new Random(seed), testData);
  choiceTestFn(new Random(seed), testData2);

  // Array initialisation.
  arrayInitTestFn(new Random(seed), numDraws, lowerBound, upperBound);
  uniqueItemTestFn(new Random(seed));
});
