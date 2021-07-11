# Changelog
All notable changes to this project will be documented in this file.

## [1.0.6] - coin flip function. (11/07/2021)

### Added
- .coin(pTrue); method on each generator that generates a true flip with the given
  probability of occurring.

### Changed
- Added new documentation for .coin(pTrue) method.
- Fixed bad links for array generation methods.

## [1.0.3] - Additional Generators, bug fixes, 53/64 bit output. (02/06/2021)

### Added
- Added XorShift64 generator.
- Added XorShift128 generator.
- Added XorShift128+ generator.
- Added PRNG64 class for common 64 bit output code.
- Additional testing for 64 bit output.

### Changed
- Fixed randRange() maximum number output.
- Changed default generator to use XORShift64.
- More in-depth testing.

## [1.0.2] - ESLint, smaller package size (21/05/2021)

### Changed
- Fixed linting.
- Fixed lcov output reporting.
- Fixed coveralls.

## [1.0.1] - Fixed coverage command (21/05/2021)

### Changed
- Fixed coverage command as istanbul/nyc doesn't work with es modules by default.

## [1.0.0] - Initial release (20/05/2021) 

### Added
- 32 bit Mersenne Twister.
- 32 bit PCG.
- 32 bit LCG.
- 32 bit XorShift.
- 32 bit XorWow.
- Boolean, int, bigInt, float, float53 and respective Array generation.
- Rand Range function.
- Benchmarking.
- Shuffle and choice functions.

[1.0.3]: https://github.com/chrisakroyd/random-seedable
[1.0.2]: https://github.com/chrisakroyd/random-seedable/tree/32cc08ab0632073e756fe60a324a857ce5be3141
[1.0.1]: https://github.com/chrisakroyd/random-seedable/tree/4929ed3306d2c07913e255cf8020d1408834ce41
[1.0.0]: https://github.com/chrisakroyd/random-seedable/tree/3ba050fef7021e8996e0ccfd6645fbb45cf83343