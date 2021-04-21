import chai from 'chai';
import XORWow from '../src/xorwow.js';

const expect = chai.expect;

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

describe('XorWow generator should be seeded with correct values.', () => {
  const random = new XORWow(seed);

  it(`Expect initial seed to be set correctly.`, () => {
    expect(random.seed).to.equal(BigInt(seed));
  });

  it(`Expect new seed to be set correctly.`, () => {
    random.seed = seed2;
    expect(random.seed).to.equal(BigInt(seed2));
  });
});

describe('Seeded 32 bit xorwow generator to produce exact number sequence.', () => {
  const random = new XORWow(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});

describe('Seeded 32 bit xorwow generator to produce exact number sequence pre and post reset.', () => {
  const random = new XORWow(seed);
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

describe('32 bit xorwow generator produces ints.', () => {
  const random = new XORWow(seed);
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


describe('32 bit xorwow generator produces floats.', () => {
  const random = new XORWow(seed);
  it(`Expect ${numDraws} calls of float() to produce floats within the range 0.0 - 1.0`, () => {
    for (let i = 0; i < numDraws; i++) {
      const randNum = random.float();
      expect(randNum).to.be.greaterThanOrEqual(0.0);
      expect(randNum).to.be.lessThanOrEqual(1.0);
    }
  });
});
