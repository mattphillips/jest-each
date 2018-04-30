import each from './';

const noop = () => {};
const expectFunction = expect.any(Function);

describe('jest-each', () => {

  [['test'], ['it'], ['fit'], ['describe'], ['fdescribe']].forEach(([property]) => {
    describe(`.${property}`, () => {
      test('calls global with given title', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        each([[]], globalTestMock)[property]('expected string', noop);

        expect(globalTestMock[property]).toHaveBeenCalledTimes(1);
        expect(globalTestMock[property]).toHaveBeenCalledWith(
          'expected string',
          expectFunction,
        );
      });

      test('calls global with given title when multiple tests cases exist', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        each([[], []], globalTestMock)[property]('expected string', () => {});

        expect(globalTestMock[property]).toHaveBeenCalledTimes(2);
        expect(globalTestMock[property]).toHaveBeenCalledWith(
          'expected string',
          expectFunction,
        );
        expect(globalTestMock[property]).toHaveBeenCalledWith(
          'expected string',
          expectFunction,
        );
      });

      test('calls global with title containing param values when using sprintf format', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        each([['hello', 1], ['world', 2]], globalTestMock)[property](
          'expected string: %s %s',
          () => {},
        );

        expect(globalTestMock[property]).toHaveBeenCalledTimes(2);
        expect(globalTestMock[property]).toHaveBeenCalledWith(
          'expected string: hello 1',
          expectFunction,
        );
        expect(globalTestMock[property]).toHaveBeenCalledWith(
          'expected string: world 2',
          expectFunction,
        );
      });

      test('calls global with cb function', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        each([[]], globalTestMock)[property]('expected string', () => {});

        expect(globalTestMock[property]).toHaveBeenCalledTimes(1);
        expect(
          typeof globalTestMock[property].mock.calls[0][1] === 'function',
        ).toBe(true);
      });

      test('calls global with cb function containing all parameters of each test case', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        const testCallBack = jest.fn();
        each([['hello', 'world'], ['joe', 'bloggs']], globalTestMock)[property](
          'expected string',
          testCallBack,
        );

        globalTestMock[property].mock.calls[0][1]();
        expect(testCallBack).toHaveBeenCalledTimes(1);
        expect(testCallBack).toHaveBeenCalledWith('hello', 'world');

        globalTestMock[property].mock.calls[1][1]();
        expect(testCallBack).toHaveBeenCalledTimes(2);
        expect(testCallBack).toHaveBeenCalledWith('joe', 'bloggs');
      });

      test('calls global with async done when cb function has more args than params of given test row', () => {
        const globalTestMock = { test: jest.fn(), it: jest.fn(), describe: jest.fn(), fit: jest.fn(), fdescribe: jest.fn() };
        each([['hello']], globalTestMock)[property](
          'expected string',
          (hello, done) => {
            expect(hello).toBe('hello');
            expect(done).toBe('DONE');
          },
        );

        globalTestMock[property].mock.calls[0][1]('DONE');
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

  describe('.test.only', () => {
    test('calls global test with given title', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      each([[]], globalTestOnlyMock).test.only('expected string', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(1);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      each([[], []], globalTestOnlyMock).test.only('expected string', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(2);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalTestOnlyMock).test.only('expected string: %s %s', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(2);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestOnlyMock.test.only.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestOnlyMock).test.only('expected string', testCallBack);

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(1);
      expect(typeof globalTestOnlyMock.test.only.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalTestOnlyMock).test.only('expected string', testCallBack);

      globalTestOnlyMock.test.only.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalTestOnlyMock.test.only.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global test with async done when cb function has more args than params of given test row', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {}, describe: {} };
      each([['hello']], globalTestOnlyMock).test.only('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestOnlyMock.test.only.mock.calls[0][1]('DONE');
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
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalItOnlyMock).it.only('expected string', testCallBack);

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
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalMock).xdescribe('expected string', testCallBack);

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
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalMock).describe.skip('expected string', testCallBack);

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
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalMock).describe.only('expected string', testCallBack);

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
