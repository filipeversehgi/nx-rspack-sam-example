import { randomName } from './random-name';

describe('randomName', () => {
  it('should work', () => {
    expect(randomName()).toEqual('random-name');
  });
});
