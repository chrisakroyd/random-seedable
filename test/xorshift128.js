import { testRunner } from './common.js';
import XORShift128 from '../src/xorshift128.js';

const testData = [3701687786, 458299110, 2500872618, 3633119408, 516391518, 2377269574, 2599949379,
  717229868, 137866584, 395339113, 1301295572, 1728310821, 3538670320, 1187274473, 2316753268,
  4061953237, 2129415220, 448488982, 643481932, 934407046,
];

const testData2 = [1280753804, 2342814110, 98946252, 1215862728, 3000003819, 500671326, 914329476,
  3124074580, 2343767245, 736002998, 3776391910, 4160158120, 3828373247, 992787196, 1664411493,
  592406802, 1169048618, 453766457, 3753914098, 2275396577,
];

const generator = (genSeed) => new XORShift128(genSeed);
const seeds = [123456789, 2579111315];
const data = [testData, testData2];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('XORShift128 generator 32 bit.', () => {
  testRunner({
    generator, seeds, data, numDraws, lowerBound, upperBound,
  });
});
