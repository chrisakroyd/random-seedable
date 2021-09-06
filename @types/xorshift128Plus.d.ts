export default XORShift128Plus;
/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * 64 bits of output with 128 internal state.
 *
 * @example
 * const random = new XORShift128Plus(Date.now(), 362436069);
 *
 * @class
 * @extends {PRNG64}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} y -> Second seed.
 */
declare class XORShift128Plus extends PRNG64 {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} y -> Second seed.
     */
    constructor(seed?: number | bigint, y?: number | bigint);
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
    origParams: {
        y: bigint;
    };
    x: number | bigint;
}
import PRNG64 from "./PRNG64.js";
