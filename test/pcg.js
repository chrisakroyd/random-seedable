import chai from 'chai';
import PCG from '../src/pcg.js';

const expect = chai.expect;

// First ten numbers for seq 10 from cpp reference.
const seed = 0x4d595df4d0f33173n;
const testData = [676697322, 420258633, 3418632178, 3595600211, 3265791279, 257272927, 3607051826, 1330014364,
  1691133457, 2692391003, 1436966076, 3405603488, 3196723772, 2037651542, 1789776910, 3642929604, 3134326335,
  2746793161, 2907548636, 3720053141];

describe('Seeded 32 bit pcg generator to produce exact number sequence.', () => {
  const random = new PCG(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});