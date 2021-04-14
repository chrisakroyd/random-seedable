// Fisher-yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle.
import PCG from './pcg.js';

export const shuffle = (array, seed = 0x4d595df4d0f33173n) => {
  const rng = new PCG(seed);

  for(let i = array.length - 1; i > 0; i--) {
    const j = rng.boundedInt(0, i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
