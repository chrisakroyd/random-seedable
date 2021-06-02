import { testRunner } from './common.js';
import XORShift128Plus from '../src/xorshift128Plus.js';

const testData = [485892858n, 1035630585790222n, 3707035798309740n, 17527141897735428608n,
  1683502627637756146n, 9382191708620632344n, 782982527655837513n, 13069191919789080888n,
  12119554561140367371n, 6336430233806534982n, 14083762661207782696n, 865209337493842019n,
  433953334025233383n, 11704765566402541206n, 12840005605323998280n, 2727671244786733159n,
  18109011591406263449n, 10781220650592401153n, 11292360084130263505n, 9327143921837372445n,
];

const testData2 = [2941547384n, 21635217134019772n, 40906210196367705n, 10301987626836957556n,
  8293457751043867542n, 3475432783674187189n, 12881959107971293573n, 9791433283143578074n,
  2324179846714652220n, 8614727097314917534n, 18243195709163001836n, 3519703444039807586n,
  6829129657309879192n, 15485961824100165135n, 1572400284366514017n, 6258940070464739537n,
  1681515456404538844n, 5233721865415844502n, 16518448050373913660n, 12875745440218743812n,
];

const generator = (genSeed) => new XORShift128Plus(genSeed);
const seeds = [123456789, 2579111315];
const data = [testData, testData2];
const numDraws = 2500;
const upperBound = 25;
const lowerBound = 10;

describe('XORShift128+ generator 64 bit.', () => {
  testRunner({
    generator, seeds, data, numDraws, lowerBound, upperBound, bit64: true,
  });
});
