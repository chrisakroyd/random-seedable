import XORWow from '../src/xorwow.js';
import { testRunner } from './common.js';

const testData = [
  246875399, 3690007200, 1264581005, 3906711041, 1866187943, 2481925219, 2464530826, 1604040631, 3653403911, 3578085384,
  1200525144, 4095560648, 505361588, 4238824340, 1727412667, 4242574606, 1873697870, 2935408675, 77509492, 3202066555,
];

const testData2 = [
  380625366, 1132903615, 1534864732, 3887864034, 2483314646, 2689154497, 2551412111, 977496925, 3250118166, 188833190,
  1765953039, 883559223, 754422101, 4228992642, 1465711668, 2888499133, 1467319108, 1429918816, 1587215780, 1156262721,
];

const generator = (genSeed) => new XORWow(genSeed);
const seeds = [123456789, 234324531];
const data = [testData, testData2];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('XorWow generator 32 bit.', () => {
  testRunner({
    generator, seeds, data, numDraws, lowerBound, upperBound,
  });
});
