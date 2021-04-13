import chai from 'chai';
import XORShift from '../src/xorshift.js';

const expect = chai.expect;

// First twenty numbers from cpp reference.
const seed = 1;
const testData = [
  270369,
  67634689,
  2647435461,
  307599695,
  2398689233,
  745495504,
  632435482,
  435756210,
  2005365029,
  2916098932,
  2657092299,
  1495045943,
  3031976842,
  82049198,
  87470069,
  3385103793,
  891394312,
  3323190024,
  321008529,
  4283899417,
];

describe('Seeded 32 bit xorshift generator to produce exact number sequence.', () => {
  const random = new XORShift(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});
