export default defaultGlobal => ([headings], ...data) => {
  const keys = getHeadingKeys(headings);

  const keysLength = keys.length;

  const parameterRows = Array
    .from({ length: data.length / keysLength })
    .map((_, index) => data.slice((index * keysLength), (index * keysLength) + keysLength))
    .map(row => row.reduce((acc, value, index) => ({ ...acc, [keys[index]]: value }), {}));

  const tests = parameterisedTests(parameterRows);

  const globalTest = defaultGlobal.test;
  const test = tests(globalTest);
  test.only = tests(globalTest.only);

  const globalIt = defaultGlobal.it;
  const it = tests(globalIt);
  it.only = tests(globalIt.only);

  const fit = tests(defaultGlobal.fit);

  const globalDescribe = defaultGlobal.describe;
  const describe = tests(globalDescribe);
  describe.only = tests(globalDescribe.only);
  const fdescribe = tests(defaultGlobal.fdescribe);

  return { test, it, fit, describe, fdescribe };
};

const getHeadingKeys = headings => headings.replace(/\s/g, '').split('|');

const parameterisedTests = parameterRows => globalCb => (title, test) => {
  parameterRows.forEach(params => globalCb(interpolate(title, params), applyTestParams(params, test)));
};

const interpolate = (title, data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => acc.replace('$' + key, data[key]), title);
};

const applyTestParams = (params, test) => {
  if (test.length > 1) return done => test(params, done);

  return () => test(params);
};
