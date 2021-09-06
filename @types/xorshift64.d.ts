export default XORShift64;
/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This implementation has 64 bit output with 64 bits of internal state.
 *
 * @example
 * const random = new XORShift64(11234, 13, 7, 17);
 *
 * @class
 * @extends {PRNG64}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} a -> First bit shift parameter.
 * @param {number | bigint} b -> Second bit shift parameter.
 * @param {number | bigint} c -> Third bit shift parameter.
 */
declare class XORShift64 extends PRNG64 {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} a -> First bit shift parameter.
     * @param {number | bigint} b -> Second bit shift parameter.
     * @param {number | bigint} c -> Third bit shift parameter.
     */
    constructor(seed?: number | bigint, a?: number | bigint, b?: number | bigint, c?: number | bigint);
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
    /**
     * @private
     * @type {BigInt}
     */
    private a;
    /**
     * @private
     * @type {BigInt}
     */
    private b;
    /**
     * @private
     * @type {BigInt}
     */
    private c;
    x: any;
}
import PRNG64 from "./PRNG64.js";
