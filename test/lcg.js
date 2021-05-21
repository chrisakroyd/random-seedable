import LCG from '../src/lcg.js';
import { testRunner } from './common.js';

const testData = [
  3067928073, 889114580, 3219257635, 1486326822, 3450746189, 1275680328, 1045497095, 742129338, 1126366929, 2032544252,
];

const testData2 = [
  3356696960, 1245751007, 268125874, 297694825, 2525613236, 3331461251, 557382662, 1028924333, 1540403496, 1501946471,
];

const generator = (genSeed) => new LCG(genSeed);
const seeds = [1234, 1234789];
const data = [testData, testData2];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('LCG Generator.', () => {
  testRunner({
    generator, seeds, data, numDraws, lowerBound, upperBound,
  });
});
