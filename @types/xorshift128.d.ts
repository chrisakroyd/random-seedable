export default XORShift128;
/**
 * XorShift generators are fast, efficient generators with good randomness quality. This implementation
 * has 32 bit output with 128 bits of internal state.
 *
 * @example
 * const random = new XORShift128(Date.now(), 362436069, 521288629, 88675123);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} y -> First bit shift parameter.
 * @param {number | bigint} z -> Second bit shift parameter.
 * @param {number | bigint} w -> Third bit shift parameter.
 */
declare class XORShift128 extends PRNG {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} y -> First bit shift parameter.
     * @param {number | bigint} z -> Second bit shift parameter.
     * @param {number | bigint} w -> Third bit shift parameter.
     */
    constructor(seed?: number | bigint, y?: number | bigint, z?: number | bigint, w?: number | bigint);
    /**
     * Converts seed into BigInt + takes steps to reset generator.
     *
     * @public
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
    y: bigint;
    z: bigint;
    w: bigint;
    origParams: {
        y: bigint;
        z: bigint;
        w: bigint;
    };
    x: number | bigint;
}
import PRNG from "./PRNG.js";
