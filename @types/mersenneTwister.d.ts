export default MersenneTwister;
/**
 * Mersenne Twister is a widely used PRNG, most well known for being the Python and Excel
 * default with an extremely large state. 32 bits of output.
 *
 * @example
 * const random = new MersenneTwister(5489, 624, 397);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} n -> Degree of recurrence.
 * @param {number | bigint} m -> Middle word, offset used during recurrence.
 */
declare class MersenneTwister extends PRNG {
    /**
     * @constructor
     * @param {number | bigint} seed -> Initial seed.
     * @param {number | bigint} n -> Degree of recurrence.
     * @param {number | bigint} m -> Middle word, offset used during recurrence.
     */
    constructor(seed?: number | bigint, n?: number | bigint, m?: number | bigint);
    state: (number | bigint)[];
    N: number | bigint;
    M: number | bigint;
    initf: number;
    stateIndex: number;
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
     * @param {bigint} u
     * @param {bigint} v
     * @returns {bigint}
     */
    private mixBits;
    /**
     * Computes the twist function.
     * @private
     * @param {bigint} u
     * @param {bigint} v
     * @returns {bigint}
     */
    private twist;
    /**
     * Computes the next state of the generator.
     * @private
     */
    private nextState;
}
import PRNG from "./PRNG.js";
