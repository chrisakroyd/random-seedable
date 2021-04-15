import chai from 'chai';
import XORShift from '../src/xorshift.js';

const expect = chai.expect;

// First twenty numbers from cpp reference.
const seed = 1;
const testData = [270369, 67634689, 2647435461, 307599695, 2398689233, 745495504, 632435482, 435756210, 2005365029,
  2916098932, 2657092299, 1495045943, 3031976842, 82049198, 87470069, 3385103793, 891394312, 3323190024, 321008529,
  4283899417,
];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('Seeded 32 bit xorshift generator to produce exact number sequence.', () => {
  const random = new XORShift(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});

describe('32 bit xorshift generator produces ints within bounds', () => {
  const random = new XORShift(seed);

  it(`Expect ${numDraws} calls of boundedInt() to produce ints within the range ${lowerBound} - ${upperBound}`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.boundedInt(lowerBound, upperBound);
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
