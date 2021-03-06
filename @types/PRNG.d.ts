export default PRNG;
/**
 * Superclass for all implemented generators.
 */
declare class PRNG {
    /**
     * @constructor
     * @param {number | bigint} max -> Max number that can be generated by this generator.
     * @param {number | bigint} seed -> Initial seed.
     */
    constructor(max: number | bigint, seed: number | bigint);
    /**
     * @protected
     * @readonly
     * @type {number | bigint}
     */
    protected readonly max: number | bigint;
    /**
     * @protected
     * @type {number | bigint}
     */
    protected _seed: number | bigint;
    /**
     * Casts the given BigInt number to an unsigned big int with the given
     * number of bits.
     *
     * @protected
     * @param {bigint} number -> A string param.
     * @param {number} bits -> An optional param (Closure syntax)
     * @return {bigint} This is the result
     */
    protected cast(number: bigint, bits: number): bigint;
    /**
     * Checks that a given number is within the range.
     *
     * @protected
     * @param {number} number -> A string param.
     * @throws Error -> Number greater than max.
     */
    protected checkNum(number: number): void;
    /**
     * Resets the PRNG.
     * To be implemented by sub-classes.
     *
     * @public
     * @throws Error -> Method not implemented.
     */
    public reset(): void;
    /**
     * Private method for integer generation.
     * To be implemented by sub-classes.
     *
     * @protected
     * @return {bigint} Random integer.
     */
    protected _int(): bigint;
    /**
     * Generates a boolean with the formula random.float() >= 0.5
     *
     * @example
     * random.bool();
     *
     * @example
     * random.bool(); // true
     *
     * @public
     * @returns {boolean} True/False.
     */
    public bool(): boolean;
    /**
     * Generates a random boolean with probability of it being true denoted by the pTrue parameter.
     * For example, when pTrue=0.8, 80% of the numbers generated with this method will be true.
     *
     * @example
     * random.coin(pTrue);
     *
     * @example
     * random.coin(0.8); // true
     *
     * @public
     * @param {number} pTrue -> Probability of generating a true value.
     * @returns {boolean} True/False.
     */
    public coin(pTrue?: number): boolean;
    /**
     * Generates and returns the next number in the PRNGs sequence.
     *
     * @example
     * random.int();
     *
     * @example
     * random.int(); // 85424123
     *
     * @public
     * @returns {number} Number less than 2 ** 32 for 32 bit generators.
     */
    public int(): number;
    /**
     * Generates and returns the next number in the PRNGs sequence and returns it as a Bigint.
     *
     * @example
     * random.bigInt();
     *
     * @example
     * random.bigInt(); // 85424123n
     *
     * @public
     * @returns {bigint} Number less than 2 ** 32 for 32 bit generators represented as a BigInt class.
     */
    public bigInt(): bigint;
    /**
     * Generates a random floating point number.
     *
     * @example
     * random.float();
     *
     * @example
     * random.float(); // 0.234242
     *
     * @public
     * @returns {number} Float between 0.0 - 1.0.
     */
    public float(): number;
    /**
     * Generates a random floating point number.
     *
     * @example
     * random.float53();
     *
     * @example
     * random.float53(); // 0.2342422341231
     *
     * @public
     * @returns {number} Float between 0.0 - 1.0.
     */
    public float53(): number;
    /**
     * Generates a number within the given range.
     *
     * @example
     * random.randRange(min, max);
     *
     * @example
     * const lowerBound = 4;
     * const upperBound = 2432;
     * random.randRange(lowerBound, upperBound); // 36.
     *
     * @public
     * @param {number} min -> Lower bound of the numbers to generate (inclusive).
     * @param {number} max -> Upper bound of the numbers to generate (inclusive).
     * @returns {number} Number min <= Number <= max.
     */
    public randRange(min: number, max: number): number;
    /**
     * Generates a number below the given maximum.
     *
     * @example
     * random.randBelow(max);
     *
     * @example
     * const upperBound = 2432;
     * random.randBelow(upperBound);  // 285.
     *
     * @public
     * @param {number} max -> Upper bound of the numbers to generate (inclusive).
     * @returns {number} Number <= max
     */
    public randBelow(max: number): number;
    /**
     * Picks a random element from the array.
     *
     * @example
     * random.choice(array)
     *
     * @example
     * const arr = [1, 4, 2, 3];
     * random.choice(arr); // 4
     *
     * @public
     * @param {any[]} array -> Array of any type from which we randomly select one item.
     * @returns {any} A single item from the array of type ?.
     */
    public choice(array: any[]): any;
    /**
     * Randomly shuffles the given array using the fisher-yates algorithm.
     *
     * @example
     * random.shuffle(array, inPlace = false)
     *
     * @example
     * const arr = [1, 4, 2, 3];
     * const shuffled = random.shuffle(arr, false);
     * console.log(arr); // [1, 4, 2, 3]
     * console.log(shuffled); // [4, 2, 3, 1]
     *
     * @example
     * const arr = [1, 4, 2, 3];
     * const shuffled = random.shuffle(arr, true);
     * console.log(arr); // [4, 2, 3, 1]
     * console.log(shuffled); // [4, 2, 3, 1]
     *
     * @public
     * @param {any[]} array -> Array of any type to be shuffled.
     * @param {boolean} inPlace -> Shuffle the array (true) or shuffle a copy of array (false).
     * @returns {any[]} Array shuffled (inPlace === false), shuffled copy of array (inPlace === true).
     */
    public shuffle(array: any[], inPlace?: boolean): any[];
    /**
     * Creates an array of the given size populated with the result of the mapFn.
     *
     * @protected
     * @param {number} size -> Length of the array to create.
     * @param {function(): boolean | number | bigint} mapFn -> Function which we use to fill array.
     * @returns {boolean[] | number[] | bigint[]} Array created by repeated calls to the mapFn.
     */
    protected initArray(size: number, mapFn: () => boolean | number | bigint): boolean[] | number[] | bigint[];
    /**
     * Generates an n size array populated with booleans.
     *
     * @example
     * random.boolArray(size);
     *
     * @example
     * const size = 256;
     * random.boolArray(size);
     *
     * @public
     * @param {number} size -> Size of the array to generate.
     * @returns {boolean[]} Array[Boolean] of length size.
     */
    public boolArray(size: number): boolean[];
    /**
     * Generates an n size array of random booleans with probability of it being true
     * denoted by the pTrue parameter. For example, when pTrue=0.8, 80% of the numbers
     * in the generated array will be true.
     *
     * @example
     * random.coinArray(size, pTrue);
     *
     * @example
     * const size = 256;
     * const pTrue = 0.8;
     * random.coinArray(size, pTrue);
     *
     * @public
     * @param {number} size -> Size of the array to generate.
     * @param {number} pTrue -> Probability of generating a true value.
     * @returns {boolean[]} Array[Boolean] of length size.
     */
    public coinArray(size: number, pTrue?: number): boolean[];
    /**
     * Generates an n size array populated with integers.
     *
     * @example
     * random.intArray(size);
     *
     * @example
     * const size = 256;
     * random.intArray(size);
     *
     * @public
     * @param size -> Size of the array to generate.
     * @returns {number[]} Array[Number] of length size.
     */
    public intArray(size: any): number[];
    /**
     * Generates an n size array populated with Big Integers.
     *
     * @example
     * random.bigIntArray(size);
     *
     * @example
     * const size = 256;
     * random.bigIntArray(size);
     *
     * @public
     * @param size -> Size of the array to generate.
     * @returns {bigint[]} Array[BigInt] of length size.
     */
    public bigIntArray(size: any): bigint[];
    /**
     * Generates an n size array populated within the given range.
     *
     * @example
     * random.randRangeArray(size, min, max);
     *
     * @example
     * const size = 256;
     * const lowerBound = 4;
     * const upperBound = 2432;
     * random.randRangeArray(size, lowerBound, upperBound);
     *
     * @public
     * @param {number} size -> Size of the array to generate.
     * @param {number} min -> Lower bound of the numbers to generate (inclusive).
     * @param {number} max -> Upper bound of the numbers to generate (inclusive).
     * @returns {number[]} Array[Number] of length size filled w/ min <= num <= max.
     */
    public randRangeArray(size: number, min: number, max: number): number[];
    /**
     * Generates an n size array populated with floats.
     *
     * @example
     * random.floatArray(size);
     *
     * @example
     * const size = 256;
     * random.floatArray(size);
     *
     * @public
     * @param size -> Size of the array to generate.
     * @returns {number[]} Array[Number] between 0.0 - 1.0 of length size.
     */
    public floatArray(size: any): number[];
    /**
     * Generates an n size array populated with floats.
     *
     * @example
     * random.float53Array(size);
     *
     * @example
     * const size = 256;
     * random.float53Array(size);
     *
     * @public
     * @param size -> Size of the array to generate.
     * @returns {number[]} Array[Number] between 0.0 - 1.0 of length size.
     */
    public float53Array(size: any): number[];
}
