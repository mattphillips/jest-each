import each from './';

const noop = () => {};
const expectFunction = expect.any(Function);

const get = (object, lensPath) => lensPath.reduce((acc, key) => acc[key], object);

describe('jest-each', () => {
  [['test'], ['test', 'only'], ['it'], ['fit'], ['describe'], ['fdescribe']].forEach((keyPath) => {
    describe(`.${keyPath.join('.')}`, () => {
      const getGlobalTestMocks = () => {
        const globals = {
          test: jest.fn(),
          it: jest.fn(),
          fit: jest.fn(),
          describe: jest.fn(),
          fdescribe: jest.fn()
        };
        globals.test.only = jest.fn();
        return globals;
      };

      test('calls global with given title', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([[]], globalTestMocks);
        get(testObject, keyPath)('expected string', noop);

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(1);
        expect(globalMock).toHaveBeenCalledWith('expected string', expectFunction);
      });

      test('calls global with given title when multiple tests cases exist', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([[], []], globalTestMocks);
        get(testObject, keyPath)('expected string', noop);

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(2);
        expect(globalMock).toHaveBeenCalledWith('expected string', expectFunction);
        expect(globalMock).toHaveBeenCalledWith('expected string', expectFunction);
      });

      test('calls global with title containing param values when using sprintf format', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([['hello', 1], ['world', 2]], globalTestMocks);
        get(testObject, keyPath)('expected string: %s %s', noop);

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(2);
        expect(globalMock).toHaveBeenCalledWith('expected string: hello 1', expectFunction);
        expect(globalMock).toHaveBeenCalledWith('expected string: world 2', expectFunction);
      });

      test('calls global with cb function', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([[]], globalTestMocks)
        get(testObject, keyPath)('expected string', noop);

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(1);
        expect(typeof globalMock.mock.calls[0][1] === 'function').toBe(true);
      });

      test('calls global with cb function containing all parameters of each test case', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testCallBack = jest.fn();
        const testObject = each([['hello', 'world'], ['joe', 'bloggs']], globalTestMocks)
        get(testObject, keyPath)('expected string', testCallBack);

        const globalMock = get(globalTestMocks, keyPath);

        globalMock.mock.calls[0][1]();
        expect(testCallBack).toHaveBeenCalledTimes(1);
        expect(testCallBack).toHaveBeenCalledWith('hello', 'world');

        globalMock.mock.calls[1][1]();
        expect(testCallBack).toHaveBeenCalledTimes(2);
        expect(testCallBack).toHaveBeenCalledWith('joe', 'bloggs');
      });

      test('calls global with async done when cb function has more args than params of given test row', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([['hello']], globalTestMocks)

        get(testObject, keyPath)('expected string', (hello, done) => {
          expect(hello).toBe('hello');
          expect(done).toBe('DONE');
        });
        get(globalTestMocks, keyPath).mock.calls[0][1]('DONE');
      });
    });
  });

  describe('.test.skip', () => {
    test('calls global test with given title', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {}, describe: {} };
      each([[]], globalTestSkipMock).test.skip('expected string', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(1);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {}, describe: {} };
      each([[], []], globalTestSkipMock).test.skip('expected string', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(2);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalTestSkipMock).test.skip('expected string: %s %s', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(2);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestSkipMock.test.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestSkipMock).test.skip('expected string', testCallBack);

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(1);
      expect(typeof globalTestSkipMock.test.skip.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.it.skip', () => {
    test('calls global it skip with given title', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {}, describe: {} };
      each([[]], globalItSkipMock).it.skip('expected string', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(1);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it skip with given title when multiple tests cases exist', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {}, describe: {} };
      each([[], []], globalItSkipMock).it.skip('expected string', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(2);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it skip with title containing param values when using sprintf format', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalItSkipMock).it.skip('expected string: %s %s', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(2);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalItSkipMock.it.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global it skip with cb function', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalItSkipMock).it.skip('expected string', testCallBack);

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(1);
      expect(typeof globalItSkipMock.it.skip.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.it.only', () => {
    test('calls global it only with given title', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      each([[]], globalItOnlyMock).it.only('expected string', () => {});

      expect(globalItOnlyMock.it.only.mock.calls.length).toBe(1);
      expect(globalItOnlyMock.it.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it only with given title when multiple tests cases exist', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      each([[], []], globalItOnlyMock).it.only('expected string', () => {});

      expect(globalItOnlyMock.it.only.mock.calls.length).toBe(2);
      expect(globalItOnlyMock.it.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it only with title containing param values when using sprintf format', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalItOnlyMock).it.only('expected string: %s %s', () => {});

      expect(globalItOnlyMock.it.only.mock.calls.length).toBe(2);
      expect(globalItOnlyMock.it.only.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalItOnlyMock.it.only.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global it only with cb function', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalItOnlyMock).it.only('expected string', testCallBack);

      expect(globalItOnlyMock.it.only.mock.calls.length).toBe(1);
      expect(typeof globalItOnlyMock.it.only.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global it only with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world'], ['joe', 'bloggs']], globalItOnlyMock).it.only('expected string', testCallBack);

      globalItOnlyMock.it.only.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalItOnlyMock.it.only.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global it only with async done when cb function has more args than params of given test row', () => {
      const globalItOnlyMock = { it: { only: jest.fn() }, test: {}, describe: {} };
      each([['hello']], globalItOnlyMock).it.only('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalItOnlyMock.it.only.mock.calls[0][1]('DONE');
    });
  });

  describe('.xtest', () => {
    test('calls global xtest with given title', () => {
      const globalXTestMock = { test: {}, it: {}, xtest: jest.fn(), describe: {} };
      each([[]], globalXTestMock).xtest('expected string', () => {});

      expect(globalXTestMock.xtest.mock.calls.length).toBe(1);
      expect(globalXTestMock.xtest.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xtest with given title when multiple tests cases exist', () => {
      const globalXTestMock = { test: {}, it: {}, xtest: jest.fn(), describe: {} };
      each([[], []], globalXTestMock).xtest('expected string', () => {});

      expect(globalXTestMock.xtest.mock.calls.length).toBe(2);
      expect(globalXTestMock.xtest.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xtest with title containing param values when using sprintf format', () => {
      const globalXTestMock = { test: {}, it: {}, xtest: jest.fn(), describe: {} };
      each([['hello', 1], ['world', 2]], globalXTestMock).xtest('expected string: %s %s', () => {});

      expect(globalXTestMock.xtest.mock.calls.length).toBe(2);
      expect(globalXTestMock.xtest.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalXTestMock.xtest.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global xtest with cb function', () => {
      const globalXTestMock = { test: {}, it: {}, xtest: jest.fn(), describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalXTestMock).xtest('expected string', testCallBack);

      expect(globalXTestMock.xtest.mock.calls.length).toBe(1);
      expect(typeof globalXTestMock.xtest.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.xit', () => {
    test('calls global xit with given title', () => {
      const globalXItMock = { test: {}, it: {}, xit: jest.fn(), describe: {} };
      each([[]], globalXItMock).xit('expected string', () => {});

      expect(globalXItMock.xit.mock.calls.length).toBe(1);
      expect(globalXItMock.xit.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xit with given title when multiple tests cases exist', () => {
      const globalXItMock = { test: {}, it: {}, xit: jest.fn(), describe: {} };
      each([[], []], globalXItMock).xit('expected string', () => {});

      expect(globalXItMock.xit.mock.calls.length).toBe(2);
      expect(globalXItMock.xit.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xit with title containing param values when using sprintf format', () => {
      const globalXItMock = { test: {}, it: {}, xit: jest.fn(), describe: {} };
      each([['hello', 1], ['world', 2]], globalXItMock).xit('expected string: %s %s', () => {});

      expect(globalXItMock.xit.mock.calls.length).toBe(2);
      expect(globalXItMock.xit.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalXItMock.xit.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global xit with cb function', () => {
      const globalXItMock = { test: {}, it: {}, xit: jest.fn(), describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalXItMock).xit('expected string', testCallBack);

      expect(globalXItMock.xit.mock.calls.length).toBe(1);
      expect(typeof globalXItMock.xit.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.xdescribe', () => {
    test('calls global xdescribe with given title', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      each([[]], globalMock).xdescribe('expected string', () => {});

      expect(globalMock.xdescribe.mock.calls.length).toBe(1);
      expect(globalMock.xdescribe.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xdescribe with given title when multiple tests cases exist', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      each([[], []], globalMock).xdescribe('expected string', () => {});

      expect(globalMock.xdescribe.mock.calls.length).toBe(2);
      expect(globalMock.xdescribe.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global xdescribe with title containing param values when using sprintf format', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      each([['hello', 1], ['world', 2]], globalMock).xdescribe('expected string: %s %s', () => {});

      expect(globalMock.xdescribe.mock.calls.length).toBe(2);
      expect(globalMock.xdescribe.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalMock.xdescribe.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global xdescribe with cb function', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([[]], globalMock).xdescribe('expected string', testCallBack);

      expect(globalMock.xdescribe.mock.calls.length).toBe(1);
      expect(typeof globalMock.xdescribe.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global xdescribe with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world'], ['joe', 'bloggs']], globalMock).xdescribe('expected string', testCallBack);

      globalMock.xdescribe.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalMock.xdescribe.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global xdescribe with async done when cb function has more args than params of given test row', () => {
      const globalMock = { xdescribe: jest.fn(), describe: {}, fit: {}, it: {}, test: {} };
      each([['hello']], globalMock).xdescribe('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalMock.xdescribe.mock.calls[0][1]('DONE');
    });
  });

  describe('.describe.skip', () => {
    test('calls global describe.skip with given title', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      each([[]], globalMock).describe.skip('expected string', () => {});

      expect(globalMock.describe.skip.mock.calls.length).toBe(1);
      expect(globalMock.describe.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe.skip with given title when multiple tests cases exist', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      each([[], []], globalMock).describe.skip('expected string', () => {});

      expect(globalMock.describe.skip.mock.calls.length).toBe(2);
      expect(globalMock.describe.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe.skip with title containing param values when using sprintf format', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      each([['hello', 1], ['world', 2]], globalMock).describe.skip('expected string: %s %s', () => {});

      expect(globalMock.describe.skip.mock.calls.length).toBe(2);
      expect(globalMock.describe.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalMock.describe.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global describe.skip with cb function', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([[]], globalMock).describe.skip('expected string', testCallBack);

      expect(globalMock.describe.skip.mock.calls.length).toBe(1);
      expect(typeof globalMock.describe.skip.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global describe.skip with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world'], ['joe', 'bloggs']], globalMock).describe.skip('expected string', testCallBack);

      globalMock.describe.skip.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalMock.describe.skip.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global describe.skip with async done when cb function has more args than params of given test row', () => {
      const globalMock = { fdescribe: {}, describe: { skip: jest.fn() }, fit: {}, it: {}, test: {} };
      each([['hello']], globalMock).describe.skip('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalMock.describe.skip.mock.calls[0][1]('DONE');
    });
  });

  describe('.describe.only', () => {
    test('calls global describe.only with given title', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      each([[]], globalMock).describe.only('expected string', () => {});

      expect(globalMock.describe.only.mock.calls.length).toBe(1);
      expect(globalMock.describe.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe.only with given title when multiple tests cases exist', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      each([[], []], globalMock).describe.only('expected string', () => {});

      expect(globalMock.describe.only.mock.calls.length).toBe(2);
      expect(globalMock.describe.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe.only with title containing param values when using sprintf format', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      each([['hello', 1], ['world', 2]], globalMock).describe.only('expected string: %s %s', () => {});

      expect(globalMock.describe.only.mock.calls.length).toBe(2);
      expect(globalMock.describe.only.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalMock.describe.only.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global describe.only with cb function', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([[]], globalMock).describe.only('expected string', testCallBack);

      expect(globalMock.describe.only.mock.calls.length).toBe(1);
      expect(typeof globalMock.describe.only.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global describe.only with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world'], ['joe', 'bloggs']], globalMock).describe.only('expected string', testCallBack);

      globalMock.describe.only.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalMock.describe.only.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global describe.only with async done when cb function has more args than params of given test row', () => {
      const globalMock = { fdescribe: {}, describe: { only: jest.fn(), skip: {} }, fit: {}, it: {}, test: {} };
      each([['hello']], globalMock).describe.only('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalMock.describe.only.mock.calls[0][1]('DONE');
    });
  });
});
