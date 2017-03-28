import { vsprintf } from 'sprintf-js';

export default (parameterRows, defaultGlobal = global) => {
  const globalTest = defaultGlobal.test;
  const globalIt = defaultGlobal.it;
  
  const test = parameterisedTests(parameterRows, globalTest);
  test.skip = parameterisedTests(parameterRows, globalTest.skip);
  test.only = parameterisedTests(parameterRows, globalTest.only);

  const it = parameterisedTests(parameterRows, globalIt);
  it.skip = parameterisedTests(parameterRows, globalIt.skip);
  it.only = parameterisedTests(parameterRows, globalIt.only);

  return { test, it };
};

const parameterisedTests = (parameterRows, globalCb) => (title, test) => {
  parameterRows.forEach(params => globalCb(vsprintf(title, params), applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (params.length < test.length)
    return (done) => test(...params, done);

  return () => test(...params);
};
