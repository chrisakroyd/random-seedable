import chai from 'chai';
import PCG from '../src/pcg.js';

const expect = chai.expect;

// First ten numbers for seq 10 from cpp reference.
const seed = 0x4d595df4d0f33173n;
const testData = [676697322, 420258633, 3418632178, 3595600211, 3265791279, 257272927, 3607051826, 1330014364,
  1691133457, 2692391003, 1436966076, 3405603488, 3196723772, 2037651542, 1789776910, 3642929604, 3134326335,
  2746793161, 2907548636, 3720053141];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('Seeded 32 bit pcg generator to produce exact number sequence.', () => {
  const random = new PCG(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});

describe('Seeded 32 bit pcg generator to produce exact number sequence pre and post reset.', () => {
  const random = new PCG(seed);
  const preReset = testData.map(() => random.int());
  random.reset();
  const postReset = testData.map(() => random.int());

  it('Expect post-reset sequence to equal pre-reset sequence.', () => {
    preReset.forEach((expectedNumber, index) => {
      it(`Expect index: ${index} to equal ${expectedNumber}`, () => {
        expect(random.int()).to.equal(postReset[index]);
      });
    });
  });
});

describe('32 bit pcg generator produces ints within bounds', () => {
  const random = new PCG(seed);
  it(`Expect ${numDraws} calls of boundedInt() to produce ints within the range ${lowerBound} - ${upperBound}`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.randRange(lowerBound, upperBound);
      expect(randNum).to.be.greaterThanOrEqual(lowerBound);
      expect(randNum).to.be.lessThanOrEqual(upperBound);
    }
  });

  it(`Expect ${numDraws} calls of int() to produce ints less than maximum (${random.max})`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.int();
      expect(randNum).to.be.lessThanOrEqual(random.max);
    }
  });
});

describe('32 bit pcg generator produces floats.', () => {
  const random = new PCG(seed);
  it(`Expect ${numDraws} calls of float() to produce floats within the range 0.0 - 1.0`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.float();
      expect(randNum).to.be.greaterThanOrEqual(0.0);
      expect(randNum).to.be.lessThanOrEqual(1.0);
    }
  });
});
