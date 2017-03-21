import { vsprintf } from 'sprintf-js';

export default (parameterRows, globalTest = global.test) => {
  const test = parameterisedTests(parameterRows, globalTest);
  test.skip = parameterisedTests(parameterRows, globalTest.skip);
  test.only = parameterisedTests(parameterRows, globalTest.only);

  return { test };
};

const parameterisedTests = (parameterRows, globalCb) => (title, test) => {
  parameterRows.forEach(params => globalCb(vsprintf(title, params), applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (params.length < test.length)
    return (done) => test(...params, done);

  return () => test(...params);
};
