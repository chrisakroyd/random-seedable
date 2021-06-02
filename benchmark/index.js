import {
  XORWow, LCG, MersenneTwister, PCG, XORShift, XORShift64, XORShift128, XORShift128Plus
} from '../src/index.js';
import { MAX32 } from '../src/constants.js';
import {
  debiasedIntegerMultiplication,
  debiasedModuloOnce,
  debiasedModuloTwice,
  divisionWithRejection,
  modulo, rangeTest,
} from './ranges.js';
import { generatorTest, MathRandomGen } from './generator.js';

const resultLogger = (testType, results) => {
  console.log(`Benchmark results for ${testType}`);
  results.sort((a, b) => a.duration - b.duration);
  results.forEach((result) => {
    console.log(`${result.name}: ${result.duration}ms`);
  });
  console.log('\n');
};

export const rangeBenchmark = (numGen = 10000) => {
  const random = new XORWow(123456789);
  const data = [
    { name: 'Modulo', gen: modulo },
    { name: 'Debiased modulo (once)', gen: debiasedModuloOnce },
    { name: 'Debiased modulo (twice)', gen: debiasedModuloTwice },
    { name: 'Debiased integer multiplication', gen: debiasedIntegerMultiplication },
    { name: 'Division with rejection', gen: divisionWithRejection },
  ];

  // Wide-range test.
  const wideRange = rangeTest(data, random, 0, MAX32, numGen);
  // Low-range test.
  const lowRange = rangeTest(data, random, 12, 42, numGen);

  resultLogger('Wide range generation', wideRange);
  resultLogger('LOw range generation', lowRange);
};

export const generatorBenchmark = (numGen = 10000) => {
  const data = [
    { name: 'LCG', gen: new LCG(1234) },
    { name: 'PCG', gen: new PCG(0x4d595df4d0f33173n) },
    { name: 'Mersenne Twister', gen: new MersenneTwister(5489) },
    { name: 'Xorshift', gen: new XORShift(11234) },
    { name: 'Xorshift64', gen: new XORShift64(11234) },
    { name: 'Xorshift128', gen: new XORShift128(11234) },
    { name: 'Xorshift128+', gen: new XORShift128Plus(11234) },
    { name: 'XorWow', gen: new XORWow(123456789) },
    { name: 'Math.Random() Generator', gen: new MathRandomGen() },
  ];

  const generatorResults = generatorTest(data, numGen);
  resultLogger('Generator performance benchmark', generatorResults);
};

generatorBenchmark();
rangeBenchmark();
