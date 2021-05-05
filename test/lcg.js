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
  shuffleTestFn,
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

const generator = (genSeed) => new LCG(genSeed);

describe('LCG Generator.', () => {
  describe('Generator should be seeded with correct values.', () => {
    const random = generator(seed);

    it(`Expect initial seed to be set correctly.`, () => {
      expect(random.seed).to.be.oneOf([seed, BigInt(seed)]);
    });

    it(`Expect new seed to be set correctly.`, () => {
      random.seed = seed2;
      expect(random.seed).to.be.oneOf([seed2, BigInt(seed2)]);
    });
  });

  // Tests for the production of an exact sequence of numbers from the seed.
  exactSeqTestFn(generator(seed), testData, seed);
  exactSeqTestFn(generator(seed2), testData2, seed2);

  // Tests for successful reset of the generator.
  resetTestFn(generator(seed), testData);

  // Test that the generator stays within the given bounds.
  withinRangeTestFn(generator(seed), lowerBound, upperBound, numDraws);

  // Test that generator actually produces floats.
  floatGenTestFn(generator(seed), numDraws);

  // Test that generator generates two different, exact sequences after being reseeded.
  seedChangeTestFn(generator(seed), seed2, testData, testData2);

  // Choice
  choiceTestFn(generator(seed), testData);
  choiceTestFn(generator(seed), testData2);

  // Array initialisation.
  arrayInitTestFn(generator(seed), numDraws, lowerBound, upperBound);
  uniqueItemTestFn(generator(seed));

  // Array shuffling.
  shuffleTestFn(generator(seed));
});
