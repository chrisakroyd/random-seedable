import { expect } from 'chai';

export const initialSeedTestFn = (generator, seeds) => {
  describe('Generator should be correctly seeded.', () => {
    seeds.forEach((seed) => {
      const random = generator(seed);
      it(`Expect seed (${seed}) to be set correctly.`, () => {
        expect(random.seed).to.be.oneOf([seed, BigInt(seed)]);
      });
    });
  });
};

export const seedSetTestFn = (random, seed) => {
  describe('Generator seed can be updated.', () => {
    it('Should successfully update the seed.', () => {
      expect(random.seed).to.not.be.oneOf([seed, BigInt(seed)]);
      random.seed = seed;
      expect(random.seed).to.be.oneOf([seed, BigInt(seed)]);
    });
  });
};

export const exactSeqTestFn = (random, data) => {
  describe(`Generator seeded with ${random.seed} produces exact number sequence.`, () => {
    data.forEach((expectedNumber, index) => {
      it(`Expect number ${index} to equal ${expectedNumber}`, () => {
        expect(random.int()).to.equal(expectedNumber);
      });
    });
  });
};

export const bigIntExactSeqFn = (random, data) => {
  describe(`Generator seeded with ${random.seed} produces exact BigInt number sequence.`, () => {
    data.forEach((expectedNumber, index) => {
      it(`Expect number ${index} to equal ${expectedNumber}`, () => {
        expect(random.bigInt()).to.equal(expectedNumber);
      });
    });
  });
};

export const resetTestFn = (random, data) => {
  describe('Generator to produce exact number sequence pre and post reset.', () => {
    const preReset = data.map(() => random.int());
    random.reset();
    const postReset = data.map(() => random.int());

    it('Expect post-reset sequence to equal pre-reset sequence.', () => {
      preReset.forEach((expectedNumber, index) => {
        it(`Expect index: ${index} to equal ${expectedNumber}`, () => {
          expect(random.int()).to.equal(postReset[index]);
        });
      });
    });
  });
};

export const withinRangeTestFn = (random, lowerBound, upperBound, numDraws) => {
  describe('Generator produces ints within bounds', () => {
    it(`Expect ${numDraws} calls of randRange() stay within the range ${lowerBound} - ${upperBound}`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.randRange(lowerBound, upperBound);
        expect(randNum).to.not.equal(undefined);
        expect(randNum).to.be.greaterThanOrEqual(lowerBound);
        expect(randNum).to.be.lessThanOrEqual(upperBound);
      }
    });

    it(`Expect ${numDraws} calls of int() to produce ints less than maximum (${random.max})`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.int();
        expect(randNum).to.not.equal(undefined);
        expect(randNum).to.be.lessThanOrEqual(random.max);
      }
    });

    it(`Expect ${numDraws} calls of randBelow() stay below ${upperBound}`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.randBelow(upperBound);
        expect(randNum).to.not.equal(undefined);
        expect(randNum).to.be.lessThanOrEqual(upperBound);
      }
    });
  });
};

export const floatGenTestFn = (random, numDraws) => {
  describe('Generator produces floats.', () => {
    it(`Expect ${numDraws} calls of float() to produce floats within the range 0.0 - 1.0`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.float();
        expect(randNum).to.not.equal(undefined);
        expect(randNum).to.be.greaterThanOrEqual(0.0);
        expect(randNum).to.be.lessThanOrEqual(1.0);
      }
    });
  });
};

export const boolGenTestFn = (random, numDraws, tolerance = 50) => {
  describe('Generator produces booleans.', () => {
    it('Expect generator to produce a boolean', () => {
      expect(random.bool()).to.satisfy((bool) => typeof bool === 'boolean');
    });

    it(`Expect ${numDraws} of bool() to produce an array that is roughly half true and half false`, () => {
      const trues = random.boolArray(numDraws).reduce((accumulator, currentValue) => accumulator + currentValue);
      expect(trues).to.be.greaterThanOrEqual((numDraws / 2) - tolerance);
      expect(trues).to.be.lessThanOrEqual((numDraws / 2) + tolerance);
    });
  });
};

export const seedChangeTestFn = (random, seed, data1, data2) => {
  describe('Generator should generate two different but exact sequences after seed change.', () => {
    it('Should produce exact number sequences after reseeding.', () => {
      const result1 = data1.map(() => random.int());
      random.seed = seed;
      const result2 = data2.map(() => random.int());

      expect(result1).to.have.members(data1);
      expect(result2).to.have.members(data2);
      expect(result1).to.not.have.members(result2);
    });
  });
};

export const choiceTestFn = (random, data) => {
  describe('Generator should be able to randomly choose an element from an array.', () => {
    it('Should successfully pick elements at random.', () => {
      data.forEach(() => expect(data).to.contain(random.choice(data)));
    });
  });
};

export const arrayInitTestFn = (random, numDraws, lowerBound, upperBound) => {
  const randSamples = 50;

  describe('Successfully initialise arrays of varying types.', () => {
    it('Should generate an int array.', () => {
      const testArray = random.intArray(numDraws);

      const testSamples = new Array(randSamples).map(() => random.choice(testArray));
      expect(testArray.length).to.equal(numDraws);
      expect(testArray[0]).to.not.be.undefined;

      testSamples.forEach((item) => {
        expect(item).to.not.be.undefined;
        expect(item).to.be.greaterThanOrEqual(0);
        expect(item).to.be.lessThanOrEqual(random.max);
      });
    });

    it(`Should generate a rand int array between within the range ${lowerBound} - ${upperBound}.`, () => {
      const testArray = random.randRangeArray(numDraws, lowerBound, upperBound);
      const testSamples = new Array(randSamples).map(() => random.choice(testArray));
      expect(testArray.length).to.equal(numDraws);
      expect(testArray[0]).to.not.be.undefined;

      testSamples.forEach((item) => {
        expect(item).to.not.be.undefined;
        expect(item).to.be.greaterThanOrEqual(lowerBound);
        expect(item).to.be.lessThanOrEqual(upperBound);
      });
    });

    it('Should generate an float array.', () => {
      const testArray = random.floatArray(numDraws);
      const testSamples = new Array(randSamples).map(() => random.choice(testArray));
      expect(testArray.length).to.equal(numDraws);
      expect(testArray[0]).to.not.be.undefined;

      testSamples.forEach((item) => {
        expect(item).to.not.be.undefined;
        expect(item).to.be.greaterThanOrEqual(0.0);
        expect(item).to.be.lessThanOrEqual(1.0);
      });
    });

    it('Should generate an float53 array.', () => {
      const testArray = random.float53Array(numDraws);
      const testSamples = new Array(randSamples).map(() => random.choice(testArray));
      expect(testArray.length).to.equal(numDraws);
      expect(testArray[0]).to.not.be.undefined;

      testSamples.forEach((item) => {
        expect(item).to.not.be.undefined;
        expect(item).to.be.greaterThanOrEqual(0.0);
        expect(item).to.be.lessThanOrEqual(1.0);
      });
    });
  });
};

export const uniqueItemTestFn = (random, numDraws = 5000, tolerance = 2) => {
  describe('Generator generates a unique list of random numbers.', () => {
    const intArray = random.intArray(numDraws);
    const bigIntArray = random.bigIntArray(numDraws);
    const floatArray = random.floatArray(numDraws);
    const float53Array = random.float53Array(numDraws);

    it('Should generate a near-unique int array', () => {
      const intSet = new Set(intArray);
      expect(intSet.size).to.be.greaterThanOrEqual(intArray.length - tolerance);
    });

    it('Should generate a near-unique BigInt array', () => {
      const intSet = new Set(bigIntArray);
      expect(intSet.size).to.be.greaterThanOrEqual(bigIntArray.length - tolerance);
    });

    it('Should generate a near-unique float array', () => {
      const floatSet = new Set(floatArray);
      expect(floatSet.size).to.be.greaterThanOrEqual(floatArray.length - tolerance);
    });

    it('Should generate a near-unique float53 array', () => {
      const float53Set = new Set(float53Array);
      expect(float53Set.size).to.be.greaterThanOrEqual(float53Array.length - tolerance);
    });
  });
};

export const shuffleTestFn = (random, tolerance = 2, numDraws = 10, arraySize = 5000) => {
  const samePosition = (array1, array2) => {
    let count = 0;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === array2[i]) {
        count += 1;
      }
    }

    return count;
  };

  describe('Generator should shuffle the list into numerous unique permutations with little overlap.', () => {
    it(`Expect fewer than ${tolerance} numbers to be in the same place for ${numDraws} runs.`, () => {
      for (let i = 0; i < numDraws; i++) {
        const intArray = random.intArray(arraySize);
        const shuffledArray = random.shuffle(intArray, false); // Shuffle a cloned array as shuffle is in place
        const sameCount = samePosition(intArray, shuffledArray);
        expect(sameCount).to.be.lessThanOrEqual(tolerance);
      }
    });
  });
};

export const testRunner = ({
  generator, seeds, data, numDraws, lowerBound, upperBound, bit64 = false,
}) => {
  if (!seeds.length === data.length) {
    throw new Error('Mismatch in testing data lengths between seed and data.');
  }

  // Tests for seed initial setting + updating.
  initialSeedTestFn(generator, seeds);
  seedSetTestFn(generator(seeds[0]), seeds[1]);


  // TODO: Cleanup the 64bit tests.
  if (bit64) {
    seeds.forEach((seed, index) => {
      bigIntExactSeqFn(generator(seed), data[index]);
    });
    const shifted1 = data[0].map((elem) => Number(elem >> 11n));
    const shifted2 = data[1].map((elem) => Number(elem >> 11n));

    exactSeqTestFn(generator(seeds[0]), shifted1);
    exactSeqTestFn(generator(seeds[1]), shifted2);

    // Tests for successful reset of the generator.
    resetTestFn(generator(seeds[0]), shifted1);

    // Test that generator generates two different, exact sequences after being reseeded.
    seedChangeTestFn(generator(seeds[0]), seeds[1], shifted1, shifted2);
  } else {
    // Tests for the production of an exact sequence of numbers from the seed.
    seeds.forEach((seed, index) => {
      exactSeqTestFn(generator(seed), data[index]);
    });

    // Tests for successful reset of the generator.
    resetTestFn(generator(seeds[0]), data[0]);

    // Test that generator generates two different, exact sequences after being reseeded.
    seedChangeTestFn(generator(seeds[0]), seeds[1], data[0], data[1]);
  }

  // Test that the generator stays within the given bounds.
  withinRangeTestFn(generator(seeds[0]), lowerBound, upperBound, numDraws);

  // Test that generator actually produces bools.
  boolGenTestFn(generator(seeds[0]), numDraws);

  // Test that generator actually produces floats.
  floatGenTestFn(generator(seeds[0]), numDraws);

  // Choice
  seeds.forEach((seed, index) => {
    choiceTestFn(generator(seed), data[index]);
  });

  // Array initialisation.
  arrayInitTestFn(generator(seeds[0]), numDraws, lowerBound, upperBound);
  uniqueItemTestFn(generator(seeds[0]));

  // Array shuffling.
  seeds.forEach((seed) => {
    shuffleTestFn(generator(seed));
  });
};
