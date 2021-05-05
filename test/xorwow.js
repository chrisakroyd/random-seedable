import XORWow from '../src/xorwow.js';
import {
  exactSeqTestFn,
  floatGenTestFn,
  resetTestFn,
  withinRangeTestFn,
  seedChangeTestFn,
  choiceTestFn,
  arrayInitTestFn,
  uniqueItemTestFn,
  shuffleTestFn,
  initialSeedTestFn,
  seedSetTestFn,
} from './common.js';

// First twenty numbers from cpp reference.
const seed = 123456789;
const seed2 = 234324531;

const testData = [
  246875399, 3690007200, 1264581005, 3906711041, 1866187943, 2481925219, 2464530826, 1604040631, 3653403911, 3578085384,
  1200525144, 4095560648, 505361588, 4238824340, 1727412667, 4242574606, 1873697870, 2935408675, 77509492, 3202066555,
];

const testData2 = [
  380625366, 1132903615, 1534864732, 3887864034, 2483314646, 2689154497, 2551412111, 977496925, 3250118166, 188833190,
  1765953039, 883559223, 754422101, 4228992642, 1465711668, 2888499133, 1467319108, 1429918816, 1587215780, 1156262721,
];

const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

const generator = (genSeed) => new XORWow(genSeed);

describe('XorWow generator 32 bit.', () => {
  // Tests for seed initial setting + updating.
  initialSeedTestFn(generator, [seed, seed2]);
  seedSetTestFn(generator(seed), seed2);

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
