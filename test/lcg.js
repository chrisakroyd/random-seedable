import chai from 'chai';
import LCG from '../src/lcg.js';

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

describe('LCG generator should be seeded with correct values.', () => {
  const random = new LCG(seed);

  it(`Expect initial seed to be set correctly.`, () => {
    expect(random.seed).to.equal(seed);
  });

  it(`Expect new seed to be set correctly.`, () => {
    random.seed = seed2;
    expect(random.seed).to.equal(seed2);
  });
});

describe('Seeded 32 bit lcg generator to produce exact number sequence.', () => {
  const random = new LCG(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});

describe('Seeded 32 bit lcg generator to produce exact number sequence pre and post reset.', () => {
  const random = new LCG(seed);
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

describe('32 bit lcg generator produces ints within bounds', () => {
  const random = new LCG(seed);
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

describe('32 bit lcg generator produces floats.', () => {
  const random = new LCG(seed);
  it(`Expect ${numDraws} calls of float() to produce floats within the range 0.0 - 1.0`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.float();
      expect(randNum).to.be.greaterThanOrEqual(0.0);
      expect(randNum).to.be.lessThanOrEqual(1.0);
    }
  });
});