import { XORWow } from '../src/index.js';
import { MAX32 } from '../src/constants.js';
import {
  debiasedIntegerMultiplication,
  debiasedModuloOnce,
  debiasedModuloTwice,
  divisionWithRejection,
  modulo, rangeTest
} from './ranges.js';

const resultLogger = (testType, results) => {
  console.log(`Benchmark results for ${testType}`);
  results.sort((a, b) => a.duration - b.duration);
  results.forEach((result) => {
    console.log(`${result.name}: ${result.duration}ms`);
  });
  console.log('\n');
};

export const rangeBenchmark = (numGen = 10000) => {
  const random =  new XORWow(123456789);
  const data = [
    { name: 'Modulo', gen: modulo },
    { name: 'Debiased modulo (once)', gen: debiasedModuloOnce, },
    { name: 'Debiased modulo (twice)', gen: debiasedModuloTwice, },
    { name: 'Debiased integer multiplication', gen: debiasedIntegerMultiplication, },
    { name: 'Division with rejection', gen: divisionWithRejection, }
  ];

  // Wide-range test.
  const wideRange = rangeTest(data, random, 0, MAX32, numGen);
  // Low-range test.
  const lowRange = rangeTest(data, random,12, 42, numGen);

  resultLogger('Wide range generation', wideRange);
  resultLogger('LOw range generation', lowRange);
};

rangeBenchmark();