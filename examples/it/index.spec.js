import each from '../../src';

describe('it', () => {
  describe('.add', () => {
    const add = (a, b) => a + b;

    each([
      [1, 2, 3],
      [2, 1, 3],
      [1000, 1, 1001]
    ]).it('returns the result of adding %s to %s', (a, b, expected) => {
      expect(add(a, b)).toBe(expected);
    });
  });
});
