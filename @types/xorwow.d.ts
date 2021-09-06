export default XORWow;
/**
 * XorWow is an improved version of XorShift and default generator of Nvidia CUDA. 32 bits of output.
 *
 * @example
 * const random = new XORWow(123456789, 362436069, 521288629, 88675123, 5783321, 6615241, 362437);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} y -> First state initial value.
 * @param {number | bigint} z -> Second state initial value.
 * @param {number | bigint} w -> Third state initial value.
 * @param {number | bigint} v -> Fourth state initial value.
 * @param {number | bigint} d -> Fifth state initial value.
 * @param {number | bigint} weyl -> Additive counter.
 */
declare class XORWow extends PRNG {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} y -> First state initial value.
     * @param {number | bigint} z -> Second state initial value.
     * @param {number | bigint} w -> Third state initial value.
     * @param {number | bigint} v -> Fourth state initial value.
     * @param {number | bigint} d -> Fifth state initial value.
     * @param {number | bigint} weyl -> Additive counter.
     */
    constructor(seed?: number | bigint, y?: number | bigint, z?: number | bigint, w?: number | bigint, v?: number | bigint, d?: number | bigint, weyl?: number | bigint);
    x: bigint;
    y: bigint;
    z: bigint;
    w: bigint;
    v: bigint;
    d: bigint;
    weyl: bigint;
    origParams: {
        y: bigint;
        z: bigint;
        w: bigint;
        v: bigint;
        d: bigint;
    };
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
}
import PRNG from "./PRNG.js";
