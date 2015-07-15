import sliceAt from '../views/react/shared/utils/slice-at';
import { expect } from 'chai';

describe('sliceAt', () => {
  it('sliceAt("@someone") === "someone"', () => {
    expect(sliceAt('@someone')).to.equal('someone');
  });
  it('sliceAt("someone") === "someone"', () => {
    expect(sliceAt('someone')).to.equal('someone');
  });
});
