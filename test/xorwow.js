import chai from 'chai';
import XORWow from '../src/xorwow.js';

const expect = chai.expect;

// First twenty numbers from cpp reference.
const seed = 123456789;
const testData = [246875399, 3690007200, 1264581005, 3906711041, 1866187943, 2481925219, 2464530826, 1604040631,
  3653403911, 3578085384, 1200525144, 4095560648, 505361588, 4238824340, 1727412667, 4242574606, 1873697870, 2935408675,
  77509492, 3202066555,
];

describe('Seeded 32 bit xorwow generator to produce exact number sequence.', () => {
  const random = new XORWow(seed);
  testData.forEach((expectedNumber, index) => {
    it(`Expect number ${index} to equal ${expectedNumber}`, () => {
      expect(random.int()).to.equal(expectedNumber);
    });
  });
});
