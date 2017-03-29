import { vsprintf } from 'sprintf-js';

export default (parameterRows, defaultGlobal = global) => {
  const globalTest = defaultGlobal.test;
  const test = parameterisedTests(parameterRows, globalTest);
  test.skip = parameterisedTests(parameterRows, globalTest.skip);
  test.only = parameterisedTests(parameterRows, globalTest.only);

  const globalIt = defaultGlobal.it;
  const it = parameterisedTests(parameterRows, globalIt);
  it.skip = parameterisedTests(parameterRows, globalIt.skip);
  it.only = parameterisedTests(parameterRows, globalIt.only);

  const xtest = parameterisedTests(parameterRows, defaultGlobal.xtest);
  const xit = parameterisedTests(parameterRows, defaultGlobal.xit);
  const fit = parameterisedTests(parameterRows, defaultGlobal.fit);

  return { test, xtest, it, xit, fit };
};

const parameterisedTests = (parameterRows, globalCb) => (title, test) => {
  parameterRows.forEach(params => globalCb(vsprintf(title, params), applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (params.length < test.length)
    return (done) => test(...params, done);

  return () => test(...params);
};
