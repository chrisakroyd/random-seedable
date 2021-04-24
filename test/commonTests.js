import chai from 'chai';

const expect = chai.expect;

export const exactSeqTestFn = (random, data, seedVal) => {
  describe(`Generator seeded with ${seedVal} produces exact number sequence.`, () => {
    data.forEach((expectedNumber, index) => {
      it(`Expect number ${index} to equal ${expectedNumber}`, () => {
        expect(random.int()).to.equal(expectedNumber);
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
    const floatArray = random.floatArray(numDraws);
    const float53Array = random.float53Array(numDraws);

    it('Should generate a near-unique int array', () => {
      const intSet = new Set(intArray);
      expect(intSet.size).to.be.greaterThanOrEqual(intArray.length - tolerance);
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

export const shuffleTestFn = (random) => {
  describe('shuffleTestFn', () => {

  });
};
