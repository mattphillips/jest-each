export default ([headings], ...data) => {
  const keys = headings.replace(/\s/g, '').split('|');

  // TODO: should this throw a warning? when not enough args are supplied
  // console.log(data.length % keys.length === 0)

  const keysLength = keys.length;

  const parameterRows = Array
    .from({ length: data.length / keysLength })
    .map((_, index) => data.slice((index * keysLength), (index * keysLength) + keysLength))
    .map(row => row.reduce((acc, value, index) => ({ ...acc, [keys[index]]: value }), {}));

  const tests = parameterisedTests(parameterRows);

  const globalTest = global.test;
  const test = tests(globalTest);
  test.skip = tests(globalTest.skip);
  test.only = tests(globalTest.only);

  const globalIt = global.it;
  const it = tests(globalIt);
  it.skip = tests(globalIt.skip);
  it.only = tests(globalIt.only);

  const xtest = tests(global.xtest);
  const xit = tests(global.xit);
  const fit = tests(global.fit);

  const globalDescribe = global.describe;
  const describe = tests(globalDescribe);
  describe.skip = tests(globalDescribe.skip);
  describe.only = tests(globalDescribe.only);
  const fdescribe = tests(global.fdescribe);
  const xdescribe = tests(global.xdescribe);

  return { test, xtest, it, xit, fit, describe, fdescribe, xdescribe };
};

const interpolate = (title, data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key) => acc.replace('$' + key, data[key]), title);
};

const parameterisedTests = parameterRows => globalCb => (title, test) => {
  parameterRows.forEach(params => globalCb(interpolate(title, params), applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (test.length > 1) return done => test(params, done);

  return () => test(params);
};
