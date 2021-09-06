export default LCG;
/**
 * Linear Congruential Generator (LCG) is a simple generator originally devised in 1951,
 * if you need something quick with minimal memory usage and not the best quality randomness,
 * this is for you. 32 bits of output.
 *
 * @example
 * const random = new LCG(1234, 1664525, 1013904223, 4294967296);
 *
 * @class
 * @extends {PRNG}
 * @param {number} seed ->  Initial seed.
 * @param {number} a -> Multiplier parameter.
 * @param {number} c -> Increment parameter.
 * @param {number} m -> Modulus parameter.
 */
declare class LCG extends PRNG {
    /**
     * @constructor
     * @param {number} seed ->  Initial seed.
     * @param {number} a -> Multiplier parameter.
     * @param {number} c -> Increment parameter.
     * @param {number} m -> Modulus parameter.
     */
    constructor(seed?: number, a?: number, c?: number, m?: number);
    /**
     * Converts seed into BigInt + takes steps to reset generator.
     * @param {number | bigint} seed -> New seed to set.
     */
    public set seed(arg: number | bigint);
    /**
     * Seed getter.
     *
     * @public
     * @returns {number | bigint} Retrieves seed.
     */
    public get seed(): number | bigint;
    x: any;
}
import PRNG from "./PRNG.js";
