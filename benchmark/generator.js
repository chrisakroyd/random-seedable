import { performance } from 'perf_hooks';
import { MAX32 } from '../src/constants.js';

// Benchmark generator for relative comparisons.
export class MathRandomGen {
 int() {
   Math.floor(Math.random() * MAX32);
 }
}

export const generatorTest = (data, numGen) => {
  const results = [];

  for (let i = 0; i < data.length; i++) {
    const start = performance.now();

    for (let j = 0; j < numGen; j++) {
      data[i].gen.int();
    }

    const end = performance.now();
    const duration = end - start;

    results.push(Object.assign({}, data[i], {duration}));
  }

  return results;
}