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
        expect(randNum).to.be.greaterThanOrEqual(lowerBound);
        expect(randNum).to.be.lessThanOrEqual(upperBound);
      }
    });

    it(`Expect ${numDraws} calls of int() to produce ints less than maximum (${random.max})`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.int();
        expect(randNum).to.be.lessThanOrEqual(random.max);
      }
    });

    it(`Expect ${numDraws} calls of randBelow() stay below ${upperBound}`, () => {
      for (let i = 0; i < numDraws; i++) {
        const randNum = random.randBelow(upperBound);
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
