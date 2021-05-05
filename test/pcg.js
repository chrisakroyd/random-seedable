import PCG from '../src/pcg.js';
import {
  arrayInitTestFn,
  choiceTestFn,
  exactSeqTestFn,
  floatGenTestFn,
  resetTestFn,
  seedChangeTestFn,
  withinRangeTestFn,
  uniqueItemTestFn,
  shuffleTestFn,
  initialSeedTestFn,
  seedSetTestFn,
} from './commonTests.js';

// First ten numbers for seq 10 from cpp reference.
const seed = 0x4d595df4d0f33173n;
const seed2 = 0x6d193ac4d3f12149n;

const testData = [
  676697322, 420258633, 3418632178, 3595600211, 3265791279, 257272927, 3607051826, 1330014364, 1691133457, 2692391003,
  1436966076, 3405603488, 3196723772, 2037651542, 1789776910, 3642929604, 3134326335, 2746793161, 2907548636, 3720053141,
];

const testData2 = [
  2191333665, 1496534883, 1975480820, 3964832384, 3952842012, 699877961, 766099024, 3832042469, 317477406, 1735065530,
  769368729, 3530453751, 1238223033, 2705512115, 1702475146, 3390600453, 2733117708, 2286600132, 143739048, 4178275569,
];

const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

const generator = (genSeed) => new PCG(genSeed);

describe('PCG Generator 32 bit.', () => {
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
