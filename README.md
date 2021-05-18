# random-seedable

Fully-fledged random number generator library with high quality implementations of Xorshift, Xorwow, Mersenne Twister, PCG and LCG.
Each implements a standard API producing number distributions that exactly match the original implementations.

## Highlights

- Avoids the state overflow problems that plague other javascript implemented random number generators.
- Matches the output of original authored c/c++ implementations for all algorithms.
- Simple, common API to all generators.
- Light footprint.
- Browser support.

## Install

```bash
npm install random-seedable --save
```

## Getting Started

```js

```

## Condensed Documentation

### PRNGs

Supported PRNGs and their default initialisations.

| Class   |   Default Initialisation |
| -----------| ------ |
| [LCG](#LCG)  |```new LCG(Date.now(), 1664525, 1013904223, 4294967296);``` |
| [PCG](#PCG)  |  ```new PCG(Date.now(), 6364136223846793005n, 1442695040888963407n);``` |
| [MersenneTwister](#MersenneTwister)  |  ```new MersenneTwister(Date.now(), 624, 397);``` |
| [XorShift](#XorShift)   | ```new XorShift(Date.now(), 13, 17, 5);``` |
| [XorWow](#XorWow)   | ```new XorWow(Date.now(), 362436069, 521288629, 88675123, 5783321, 6615241, 362437);``` |
| [random](#random)   | ```default PRNG, same as XorWow``` |

### PRNG methods.

Each PRNG has the following methods.

| Method      | Parameters | Return |
| ----------- | --------   | ------ |
| [bool()](#bool)   | `None`     | Boolean. |
| [int()](#int)  | `None`     | Number. |
| [bigInt()](#bigint)  | `None`     | BigInt. |
| [float()](#float)   | `None`     | Float. |
| [float53()](#float53) | `None`     | Float spread over full range. |
| [randRange(min, max)](#randrange) | `min:Number, max:Number`     | min <= Number <= max |
| [randBelow(max)](#randbelow) | `max:Number`     | Number <= Max |
| [choice(array)](#choice) | `array:[?]`     | Item from array of type ? |
| [shuffle(array, inPlace = true)](#shuffle) | `array:[?], inPlace:Boolean`     | Shuffled Array[?]  |
| [boolArray(size)]() | `size:Number`     |Array[Boolean] of length size.  |
| [intArray(size)]() | `size:Number`     | Array[Number] of length size.  |
| [bigIntArray(size)]() | `size:Number`     | Array[BigInt] of length size.  |
| [randRangeArray(size, min, max)]() | `size:Number, min:Number, max:Number`     | Array[Number] of length size filled w/ min <= num <= max.  |
| [floatArray(size)]() | `size:Number`     | Array[Number] between 0.0 - 1.0 of length size.  |
| [float53Array(size)]() | `size:Number`     | Array[Number] between 0.0 - 1.0 of length size.  |

## Full Documentation

### LCG

Linear Congruential Generator (LCG) is a simple generator originally devised in 1951, if you need 
something quick with minimal memory usage and not the best quality randomness, this is for you.

##### Parameters

- seed -> Initial seed.
- a -> Multiplier parameter.
- c -> Increment parameter.
- m -> Modulus parameter.

##### Example
```js
const random = new LCG(1234, 1664525, 1013904223, 4294967296);
```

---

### PCG

Permuted Congruential Generator (LCG) is again, a relatively simple generator that improves on the qualites
of LCG by improving its randomness quality by increasing its state size and using only the most significant bits
to produce the output.

##### Parameters

- seed -> Initial seed.
- mul -> Multiplier parameter.
- inc -> Increment parameter.

##### Example
```js
const random = new PCG(0x4d595df4d0f33173n, 6364136223846793005n, 1442695040888963407n);
```

---

### MersenneTwister

Mersenne Twister is a widely used PRNG, most well known for being the Python and Excel default with an extremely large
state.
##### Parameters

- seed -> Initial seed.
- n -> Degree of recurrence.
- m -> Middle word, offset used during recurrence.

##### Example
```js
const random = new MersenneTwister(5489, 624, 397);
```

---

### XorShift

XorShift generators are fast, efficient generators with good randomness quality. 

##### Parameters

- seed -> Initial seed.
- a -> First bit shift parameter.
- b -> Second bit shift parameter.
- c -> Third bit shift parameter.

##### Example
```js
const random = new XorShift(11234, 13, 17, 5);
```

---

### XorWow

XorWow is an improved version of XorShift and default generator of Nvidia CUDA.

##### Parameters

- seed -> Initial seed.
- y -> First state initial value.
- z -> Second state initial value.
- w -> Third state initial value.
- v -> Fourth state initial value.
- d -> Fifth state initial value.
- weyl -> Additive counter.

##### Example
```js
const random = new XorWow(123456789, 362436069, 521288629, 88675123, 5783321, 6615241, 362437);
```

---

### bool
`random.bool()` Generates a boolean with the formula random.float() >= 0.5


##### Parameters
None.

##### Returns
Boolean True/False.

##### Example

```js
random.bool(); // true
```

---

### int
`random.int()` Generates and returns the next number in the PRNGs sequence.


##### Parameters
None.

##### Returns
Number less than 2 ** 32 for 32 bit generators.

##### Example

```js
random.int(); // 85424123
```

---

### bigInt
`random.bigInt()` Generates and returns the next number in the PRNGs sequence and returns it as a Bigint.

##### Parameters
None.

##### Returns
Number less than 2 ** 32 for 32 bit generators represented as a BigInt class.
[Further reading on Big Integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

##### Example

```js
random.bigInt(); // 85424123n
```

---

### float
`random.float()` Generates a random floating point number.

##### Parameters
None.

##### Returns
Float between 0.0 - 1.0.

##### Example

```js
random.float(); // 0.234242
```

---

### float53
`random.float53()` Generates a random floating point number.

##### Parameters
None.

##### Returns
Float between 0.0 - 1.0.

##### Example

```js
random.float53(); // 0.2342422341231
```

---

### randRange
`random.randRange(min, max)` Generates a number within the given range.

##### Parameters
- min -> Lower bound of the numbers to generate (inclusive).
- max -> Upper bound of the numbers to generate (inclusive).

##### Returns
Number min <= Number <= max.

##### Example

```js
const lowerBound = 4;
const upperBound = 2432;
random.randRange(lowerBound, upperBound); // 36.
```

---

### randBelow
`random.randBelow(max)` Generates a number below the given maximum.

##### Parameters
- max -> Upper bound of the numbers to generate (inclusive).

##### Returns
Number <= max

##### Example

```js
const upperBound = 2432;
random.randBelow(upperBound);  // 285.
```

---

### choice
`random.choice(array)` Picks a random element from the array.

##### Parameters
- array -> Array of any type from which to pick random number.

##### Returns
A singular item from the array of type ?.

##### Example

```js
const arr = [1, 4, 2, 3];
random.choice(arr); // 4
```

---

### shuffle
`random.shuffle(array, inPlace = false)` Randomly shuffles the given array using the fisher-yates algorithm.

##### Parameters
- array -> Array of any type to be shuffled.
- inPlace -> Whether to shuffle the reference input array or return a new, shuffled array.

##### Returns

array input shuffled if inPlace ==== false, shuffled new array object if inPlace === true.

##### Examples

```js
const arr = [1, 4, 2, 3];
const shuffled = random.shuffle(arr, false);
console.log(arr); // [1, 4, 2, 3]
console.log(shuffled); // [4, 2, 3, 1]
```
```js
const arr = [1, 4, 2, 3];
const shuffled = random.shuffle(arr, true);
console.log(arr); // [4, 2, 3, 1]
console.log(shuffled); // [4, 2, 3, 1]
```
---

### boolArray
`random.boolArray(size)` Generates an n size array populated with booleans.

##### Parameters
- size -> Size of the array to generate.

##### Returns
Array[Boolean] of length size.

##### Example

```js
const size = 256;
random.boolArray(size);
```

---

### intArray
`random.intArray(size)` Generates an n size array populated with integers.

##### Parameters
- size -> Size of the array to generate.

##### Returns
Array[Number] of length size.

##### Example

```js
const size = 256;
random.intArray(size);
```

---

### bigIntArray
`random.bigIntArray(size)` Generates an n size array populated with BigInts.

##### Parameters
- size -> Size of the array to generate.

##### Returns
Array[BigInt] of length size.

##### Example

```js
const size = 256;
random.bigIntArray(size);
```

---

### rangeRangeArray
`random.randRangeArray(size, min, max)` Generates an n size array populated within the given range.

##### Parameters
- size -> Size of the array to generate.
- min -> Lower bound of the numbers to generate (inclusive).
- max -> Upper bound of the numbers to generate (inclusive).

##### Returns
Array[Number] of length size filled w/ min <= num <= max.

##### Example

```js
const size = 256;
const lowerBound = 4;
const upperBound = 2432;
random.randRangeArray(size, lowerBound, upperBound);
```

---

### floatArray
`random.floatArray(size)` Generates an n size array populated with floats.

##### Parameters
- size -> Size of the array to generate.

##### Returns
Array[Number] between 0.0 - 1.0 of length size.

##### Example

```js
const size = 256;
random.floatArray(size);
```
---

### float53Array
`random.float53Array(size)` Generates an n size array populated with floats.

##### Parameters
- size -> Size of the array to generate.

##### Returns
Array[Number] between 0.0 - 1.0 of length size.

##### Example

```js
const size = 256;
random.float53Array(size);
```

# License
See [LICENSE](https://github.com/ChristopherAkroyd/random-seedable/blob/master/LICENSE) file.

# Resources

* [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister)
* [Linear Congruential Generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)
* [Piecewise Congruential Generator](https://en.wikipedia.org/wiki/Permuted_congruential_generator)
* [XorShift/XorWow](https://en.wikipedia.org/wiki/Xorshift)
* [Javascript Big Integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
* [Ranged random number generation](https://www.pcg-random.org/posts/bounded-rands.html)
