# random-seedable
[![Coverage Status](https://coveralls.io/repos/github/chrisakroyd/random-seedable/badge.svg?branch=main)](https://coveralls.io/github/chrisakroyd/random-seedable?branch=main)
[![npm version](https://badge.fury.io/js/random-seedable.svg)](https://badge.fury.io/js/random-seedable)
![npm](https://img.shields.io/npm/dm/random-seedable)
![minzip](https://badgen.net/bundlephobia/minzip/random-seedable)

Fully-fledged random number generator library offering both 32 bit and 64 bit high quality implementations of Xorshift, Xorwow, Mersenne Twister, PCG, and LCG.
Each implements a standard API producing number distributions that exactly match the original implementations. Typescript compatible.

## Highlights

- Avoids the state overflow problems that plague other javascript implemented random number generators.
- Matches the output of original authored C/C++ implementations for all algorithms.
- 32 bit and 64 bit generators.
- Simple, common API to all generators.
- Light footprint.
- Browser support.
- ES Style module.

## Install

```bash
npm install random-seedable --save
```

## Getting Started
Just want to use a random generator with no hassle? All you've got to do is import random, and use it
as you would a generator you initialised yourself.


Simply import random and call whatever method you please, 
```js
import random from 'random-seedable';

random.bool(); // false
random.int(); // 2346
random.float(); // 0.34527
random.shuffle([1, 2, 3, 1, 4]); // [2, 4, 3, 1, 1]
random.choice([1, 2, 3, 1, 4]); // 2
```

Want a random generator with a seed you can set? Just import the generator you wish and initialise it yourself.

```js
import { XORShift } from 'random-seedable';

const random = new XORShift(123456789);
random.int(); // 123312
random.bool(); // true
random.shuffle([1, 2, 3, 1, 4]); // [2, 4, 3, 1, 1]
random.choice([1, 2, 3, 1, 4]); // 2
```

Once the generator is initialised, the seed can be changed using the seed setter function.

```js
import { XORShift } from 'random-seedable';

const random = new XORShift(123456789);

console.log(random.seed); // 123456789

random.seed = 987654321;

console.log(random.seed); // 987654321
```

## Condensed Documentation

### PRNGs

Supported PRNGs and their default initialisations.

| Class   |   Default Initialisation |   Integer output |
| -----------| ------ | ------ |
| [LCG](#LCG)  |```new LCG(Date.now(), 1664525, 1013904223, 4294967296);``` | 32 bit |
| [PCG](#PCG)  |  ```new PCG(Date.now(), 6364136223846793005n, 1442695040888963407n);``` | 32 bit |
| [MersenneTwister](#MersenneTwister)  |  ```new MersenneTwister(Date.now(), 624, 397);``` | 32 bit |
| [XORShift](#XORShift)   | ```new XORShift(Date.now(), 13, 17, 5);``` | 32 bit |
| [XORShift64](#XORShift64)   | ```new XORShift64(Date.now(), 13, 7, 17);``` | 64 bit |
| [XORShift128](#XORShift128)   | ```new XORShift128(Date.now(), 362436069, 521288629, 88675123);``` | 32 bit |
| [XORShift128Plus](#XORShift128Plus)   | ```new XORShift128Plus(Date.now(), 362436069);``` | 64 bit |
| [XORWow](#XORWow)   | ```new XORWow(Date.now(), 362436069, 521288629, 88675123, 5783321, 6615241, 362437);``` | 32 bit |
| [random](#XORShift64)   | ```default PRNG, same as XORShift64``` | 64 bit |

### PRNG methods.

Each PRNG has the following methods.

| Method      | Parameters | Return |
| ----------- | --------   | ------ |
| [.bool()](#bool)   | `None`     | Boolean. |
| [.coin(pTrue)](#coin)   | `pTrue:Number`     | Boolean. |
| [.int()](#int)  | `None`     | Number. |
| [.bigInt()](#bigint)  | `None`     | BigInt. |
| [.float()](#float)   | `None`     | Float. |
| [.float53()](#float53) | `None`     | Float spread over full range. |
| [.randRange(min, max)](#randrange) | `min:Number, max:Number`     | min <= Number <= max |
| [.randBelow(max)](#randbelow) | `max:Number`     | Number <= Max |
| [.choice(array)](#choice) | `array:[?]`     | Item from array of type ? |
| [.shuffle(array, inPlace = true)](#shuffle) | `array:[?], inPlace:Boolean`     | Shuffled Array[?]  |
| [.boolArray(size)](#boolarray) | `size:Number`     |Array[Boolean] of length size.  |
| [.coinArray(size, pTrue)](#coinarray) | `size:Number, pTrue:Number`     |Array[Boolean] of length size.  |
| [.intArray(size)](#intarray) | `size:Number`     | Array[Number] of length size.  |
| [.bigIntArray(size)](#bigintarray) | `size:Number`     | Array[BigInt] of length size.  |
| [.randRangeArray(size, min, max)](#rangerangearray) | `size:Number, min:Number, max:Number`     | Array[Number] of length size filled w/ min <= num <= max.  |
| [.floatArray(size)](#floatarray) | `size:Number`     | Array[Number] between 0.0 - 1.0 of length size.  |
| [.float53Array(size)](#float53array) | `size:Number`     | Array[Number] between 0.0 - 1.0 of length size.  |

## Full Documentation

### LCG

Linear Congruential Generator (LCG) is a simple generator originally devised in 1951, if you need 
something quick with minimal memory usage and not the best quality randomness, this is for you. 32 bits of output.

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

Permuted Congruential Generator (PCG) is again, a relatively simple generator that improves on the qualites
of LCG by improving its randomness quality by increasing its state size and using only the most significant bits
to produce the output. 32 bits of output.

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
state. 32 bits of output.
##### Parameters

- seed -> Initial seed.
- n -> Degree of recurrence.
- m -> Middle word, offset used during recurrence.

##### Example
```js
const random = new MersenneTwister(5489, 624, 397);
```

---

### XORShift

XorShift generators are fast, efficient generators with good randomness quality. This generator has 32 bit
output with 32 bits of internal state.

##### Parameters

- seed -> Initial seed.
- a -> First bit shift parameter.
- b -> Second bit shift parameter.
- c -> Third bit shift parameter.

##### Example
```js
const random = new XORShift(11234, 13, 17, 5);
```

---

### XORShift64

XorShift generators are fast, efficient generators with good randomness quality. This implementation
has 64 bit output with 64 bits of internal state.

##### Parameters

- seed -> Initial seed.
- a -> First bit shift parameter.
- b -> Second bit shift parameter.
- c -> Third bit shift parameter.

##### Example
```js
const random = new XORShift64(11234, 13, 7, 17);
```

---

### XORShift128

XorShift generators are fast, efficient generators with good randomness quality. This implementation
has 32 bit output with 128 bits of internal state.

##### Parameters

- seed -> Initial seed.
- y -> First bit shift parameter.
- z -> Second bit shift parameter.
- w -> Third bit shift parameter.

##### Example
```js
const random = new XORShift128(Date.now(), 362436069, 521288629, 88675123);
```

---

### XORShift128Plus

XorShift generators are fast, efficient generators with good randomness quality. 64 bits of output with 128 internal state.

##### Parameters

- seed -> Initial seed.
- y -> Second seed.

##### Example
```js
const random = new XORShift128Plus(Date.now(), 362436069);
```

---

### XORWow

XorWow is an improved version of XorShift and default generator of Nvidia CUDA. 32 bits of output.

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
const random = new XORWow(123456789, 362436069, 521288629, 88675123, 5783321, 6615241, 362437);
```

---

### bool
`random.bool()`

Generates a boolean with the formula random.float() >= 0.5


##### Parameters
None.

##### Returns
Boolean True/False.

##### Example

```js
random.bool(); // true
```

---

### coin
`random.coin(pTrue)`

Generates a random boolean with probability of it being true denoted by the pTrue parameter. For
example, when pTrue=0.8, 80% of the numbers generated with this method will be true.


##### Parameters
- pTrue -> Probability of generating a true value.

##### Returns
Boolean True/False.

##### Example

```js
random.coin(0.8); // true
```


---

### int
`random.int()`

Generates and returns the next number in the PRNGs sequence.


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
`random.bigInt()`

Generates and returns the next number in the PRNGs sequence and returns it as a Bigint.

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
`random.float()`

Generates a random floating point number.

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
`random.float53()`

Generates a random floating point number.

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
`random.randRange(min, max)`

Generates a number within the given range.

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
`random.randBelow(max)`

Generates a number below the given maximum.

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
`random.choice(array)`

Picks a random element from the array.

##### Parameters
- array -> Array of any type from which we randomly select one item.

##### Returns
A singular item from the array of type ?.

##### Example

```js
const arr = [1, 4, 2, 3];
random.choice(arr); // 4
```

---

### shuffle
`random.shuffle(array, inPlace = false)`

Randomly shuffles the given array using the fisher-yates algorithm.

##### Parameters
- array -> Array of any type to be shuffled.
- inPlace -> Whether to shuffle the reference input array or return a new, shuffled array.

##### Returns

Array shuffled (inPlace === false), shuffled copy of array (inPlace === true).

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
`random.boolArray(size)`

Generates an n size array populated with booleans.

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

### coinArray
`random.coinArray(size, pTrue)`

Generates an n size array of random booleans with probability of it being true denoted by the pTrue parameter. For
example, when pTrue=0.8, 80% of the numbers in the generated array will be true.


##### Parameters
- size -> Size of the array to generate.
- pTrue -> Probability of generating a true value.

##### Returns
Array[Boolean] of length size.

##### Example

```js
const size = 256;
const pTrue = 0.8;
random.coinArray(size, pTrue);
```

---

### intArray
`random.intArray(size)`

Generates an n size array populated with integers.

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
`random.bigIntArray(size)`

Generates an n size array populated with Big Integers.

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
`random.randRangeArray(size, min, max)`

Generates an n size array populated within the given range.

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
`random.floatArray(size)`

Generates an n size array populated with floats.

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
`random.float53Array(size)`

Generates an n size array populated with floats.

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
See [LICENSE](https://github.com/ChrisAkroyd/random-seedable/blob/master/LICENSE) file.

# Resources

* [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister)
* [Linear Congruential Generator](https://en.wikipedia.org/wiki/Linear_congruential_generator)
* [Piecewise Congruential Generator](https://en.wikipedia.org/wiki/Permuted_congruential_generator)
* [XorShift/XorWow](https://en.wikipedia.org/wiki/Xorshift)
* [Javascript Big Integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
* [Ranged random number generation](https://www.pcg-random.org/posts/bounded-rands.html)
