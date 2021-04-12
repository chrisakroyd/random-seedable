import chai from 'chai';
import LCG from '../src/lcg.js';

const expect = chai.expect;

// First ten numbers for seq 10 from cpp reference.
const seed = 1234;
const lcgData = [3067928073, 889114580, 3219257635, 1486326822, 3450746189, 1275680328, 1045497095,
  742129338, 1126366929, 2032544252];

describe('Seeded 32 bit lcg generator to produce exact number sequence.', () => {
  const random = new LCG(seed);
  lcgData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});
