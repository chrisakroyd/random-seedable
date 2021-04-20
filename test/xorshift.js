import chai from 'chai';
import XORShift from '../src/xorshift.js';

const expect = chai.expect;

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

describe('XorShift generator should be seeded with correct values.', () => {
  const random = new XORShift(seed);

  it(`Expect initial seed to be set correctly.`, () => {
    expect(random.seed).to.equal(seed);
  });

  it(`Expect new seed to be set correctly.`, () => {
    random.seed = seed2;
    expect(random.seed).to.equal(seed2);
  });
});

describe('Seeded 32 bit xorshift generator to produce exact number sequence.', () => {
  const random = new XORShift(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});

describe('Seeded 32 bit xorshift generator to produce exact number sequence pre and post reset.', () => {
  const random = new XORShift(seed);
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

describe('32 bit xorshift generator produces ints within bounds', () => {
  const random = new XORShift(seed);

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


describe('32 bit xorshift generator produces floats.', () => {
  const random = new XORShift(seed);
  it(`Expect ${numDraws} calls of float() to produce floats within the range 0.0 - 1.0`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.float();
      expect(randNum).to.be.greaterThanOrEqual(0.0);
      expect(randNum).to.be.lessThanOrEqual(1.0);
    }
  });
});
