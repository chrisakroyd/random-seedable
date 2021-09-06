export default XORShift;
/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This generator has 32 bit output with 32 bits of internal state.
 *
 * @example
 * const random = new XORShift(11234, 13, 17, 5);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} a -> First bit shift parameter.
 * @param {number | bigint} b -> Second bit shift parameter.
 * @param {number | bigint} c -> Third bit shift parameter.
 */
declare class XORShift extends PRNG {
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
import PRNG from "./PRNG.js";
