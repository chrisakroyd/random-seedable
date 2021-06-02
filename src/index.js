import XORShift64 from './xorshift64.js';

export { default as LCG } from './lcg.js';
export { default as PCG } from './pcg.js';
export { default as MersenneTwister } from './mersenneTwister.js';
export { default as XORShift } from './xorshift.js';
export { default as XORShift64 } from './xorshift64.js';
export { default as XORShift128 } from './xorshift128.js';
export { default as XORShift128Plus } from './xorshift128Plus.js';
export { default as XORWow } from './xorwow.js';

export const random = new XORShift64(Date.now());
export default new XORShift64(Date.now());
