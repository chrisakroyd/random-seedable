export default PCG;
/**
 * Permuted Congruential Generator (PCG) is again, a relatively simple generator that improves on the qualites
 * of LCG by improving its randomness quality by increasing its state size and using only the most significant bits
 * to produce the output. 32 bits of output.
 *
 * @example
 * const random = new PCG(Date.now(), 6364136223846793005n, 1442695040888963407n);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} mul -> Multiplier parameter.
 * @param {number | bigint} inc -> Increment parameter.
 */
declare class PCG extends PRNG {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} mul -> Multiplier parameter.
     * @param {number | bigint} inc -> Increment parameter.
     */
    constructor(seed?: number | bigint, mul?: number | bigint, inc?: number | bigint);
    /**
     * Converts seed into BigInt + sets.
     *
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
     * @type {bigint}
     */
    private mul;
    /**
     * @private
     * @type {bigint}
     */
    private inc;
    x: any;
    /**
     * 32 bit rotation op.
     * @param {bigint} x -> x parameter of PCG algorithm.
     * @param {bigint} r -> r parameter of PCG algorithm.
     * @returns {bigint} Returns 32 bit result of rotation operation.
     */
    rotr32(x: bigint, r: bigint): bigint;
}
import PRNG from "./PRNG.js";
