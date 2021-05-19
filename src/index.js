import XorWow from './xorwow.js';

export { default as LCG } from './lcg.js';
export { default as PCG } from './pcg.js';
export { default as MersenneTwister } from './mersenneTwister.js';
export { default as XORShift } from './xorshift.js';
export { default as XORWow } from './xorwow.js';

export const random = new XorWow(Date.now());
export default new XorWow(Date.now());
