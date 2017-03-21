export default (paramRows, globalTest = global.test) => {
  const test = tests(paramRows, globalTest);
  return { test };
};

const tests = (rows, globalCb) => (title, test) => {
  rows.forEach(params => globalCb(title, () => test(...params)));
};
