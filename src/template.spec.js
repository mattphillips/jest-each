import each from './template';

describe('.add', () => {
  each`
    a    | b    | expected
    ${0} | ${0} | ${0}
    ${0} | ${1} | ${1}
    ${1} | ${1} | ${2}
  `.test('returns $expected when given $a and $b', ({ a, b, expected }) => {
    expect(a + b).toBe(expected);
  });
});

describe('.join', () => {
  each`
    array        | delimiter | expected
    ${[0, 1, 2]} | ${'*'}    | ${'0*1*2'}
  `.test('returns $expected when given $array is joined with $delimiter', ({ array, delimiter, expected }) => {
    expect(array.join(delimiter)).toBe(expected);
  });
});
