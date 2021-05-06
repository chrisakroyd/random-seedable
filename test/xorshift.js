import XORShift from '../src/xorshift.js';
import { testRunner } from './common.js';

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

const generator = (genSeed) => new XORShift(genSeed);

describe('XorShift generator 32 bit.', () => {
  testRunner({
    generator,
    seeds: [seed, seed2],
    data:[testData, testData2],
    numDraws,
    lowerBound,
    upperBound,
  });
});
