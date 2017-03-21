import { vsprintf } from 'sprintf-js';

export default (paramRows, globalTest = global.test) => {
  const test = tests(paramRows, globalTest);
  test.skip = tests(paramRows, globalTest.skip);
  test.only = tests(paramRows, globalTest.only);

  return { test };
};

const tests = (rows, globalCb) => (title, test) => {
  rows.forEach(params => globalCb(vsprintf(title, params), applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (params.length < test.length)
    return (done) => test(...params, done);

  return () => test(...params);
};
