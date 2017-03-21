export default (paramRows, globalTest = global.test) => {
  const test = tests(paramRows, globalTest);
  return { test };
};

const tests = (rows, globalCb) => (title, test) => {
  rows.forEach(params => globalCb(title, applyTestParams(params, test)));
};

const applyTestParams = (params, test) => {
  if (params.length < test.length)
    return (done) => test(...params, done);

  return () => test(...params);
};
