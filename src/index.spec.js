import each from './';

const noop = () => {};
const expectFunction = expect.any(Function);

const get = (object, lensPath) => lensPath.reduce((acc, key) => acc[key], object);

describe('jest-each', () => {
  [
    ['test'],
    ['test', 'only'],
    ['it'],
    ['fit'],
    ['it', 'only'],
    ['describe'],
    ['fdescribe'],
    ['describe', 'only']
  ].forEach(keyPath => {
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
        globals.it.only = jest.fn();
        globals.describe.only = jest.fn();
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

  [
    ['xtest'],
    ['test', 'skip']
  ].forEach(keyPath => {
    describe(`.${keyPath.join('.')}`, () => {
      const getGlobalTestMocks = () => {
        const globals = {
          test: {
            skip: jest.fn()
          },
          it: {},
          describe: {},
          xtest: jest.fn()
        };
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
      });

      test('calls global with title containing param values when using sprintf format', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testObject = each([['hello', 1], ['world', 2]], globalTestMocks)
        get(testObject, keyPath)('expected string: %s %s', () => {});

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(2);
        expect(globalMock).toHaveBeenCalledWith('expected string: hello 1', expectFunction);
        expect(globalMock).toHaveBeenCalledWith('expected string: world 2', expectFunction);
      });

      test('calls global with cb function', () => {
        const globalTestMocks = getGlobalTestMocks();
        const testCallBack = jest.fn();
        const testObject = each([[]], globalTestMocks)
        get(testObject, keyPath)('expected string', testCallBack);

        const globalMock = get(globalTestMocks, keyPath);
        expect(globalMock).toHaveBeenCalledTimes(1);
        expect(typeof globalMock.mock.calls[0][1] === 'function').toBe(true);
      });
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

});
