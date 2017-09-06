import each from './';

describe('jest-each', () => {
  describe('.test', () => {
    test('calls global test with given title', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      each([[]], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(1);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      each([[], []], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(2);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string');
      expect(globalTestMock.test.mock.calls[1][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalTestMock).test('expected string: %s %s', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(2);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestMock.test.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestMock).test('expected string', testCallBack);

      expect(globalTestMock.test.mock.calls.length).toBe(1);
      expect(typeof globalTestMock.test.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing parameters of first row', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([['hello']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.test.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
    });

    test('calls global test with cb function containing all parameters of first row', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.test.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalTestMock).test('expected string', testCallBack);

      globalTestMock.test.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalTestMock.test.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global test with async done when cb function has more args than params of given test row', () => {
      const globalTestMock = { test: jest.fn(), it: {}, describe: {} };
      each([['hello']], globalTestMock).test('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestMock.test.mock.calls[0][1]('DONE');
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

  describe('.it', () => {
    test('calls global it with given title', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      each([[]], globalItMock).it('expected string', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(1);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it with given title when multiple it cases exist', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      each([[], []], globalItMock).it('expected string', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(2);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string');
      expect(globalItMock.it.mock.calls[1][0]).toBe('expected string');
    });

    test('calls global it with title containing param values when using sprintf format', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalItMock).it('expected string: %s %s', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(2);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalItMock.it.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global it with cb function', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalItMock).it('expected string', testCallBack);

      expect(globalItMock.it.mock.calls.length).toBe(1);
      expect(typeof globalItMock.it.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global it with cb function containing parameters of first row', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([['hello']], globalItMock).it('expected string', testCallBack);

      globalItMock.it.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
    });

    test('calls global it with cb function containing all parameters of first row', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world']], globalItMock).it('expected string', testCallBack);

      globalItMock.it.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');
    });

    test('calls global it with cb function containing all parameters of first row when multiple it cases exist', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalItMock).it('expected string', testCallBack);

      globalItMock.it.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalItMock.it.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global it with async done when cb function has more args than params of given it row', () => {
      const globalItMock = { it: jest.fn(), test: {}, describe: {} };
      each([['hello']], globalItMock).it('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalItMock.it.mock.calls[0][1]('DONE');
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

  describe('.fit', () => {
    test('calls global fit with given title', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      each([[]], globalFitMock).fit('expected string', () => {});

      expect(globalFitMock.fit.mock.calls.length).toBe(1);
      expect(globalFitMock.fit.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global fit with given title when multiple tests cases exist', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      each([[], []], globalFitMock).fit('expected string', () => {});

      expect(globalFitMock.fit.mock.calls.length).toBe(2);
      expect(globalFitMock.fit.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global fit with title containing param values when using sprintf format', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      each([['hello', 1], ['world', 2]], globalFitMock).fit('expected string: %s %s', () => {});

      expect(globalFitMock.fit.mock.calls.length).toBe(2);
      expect(globalFitMock.fit.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalFitMock.fit.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global fit with cb function', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([[]], globalFitMock).fit('expected string', testCallBack);

      expect(globalFitMock.fit.mock.calls.length).toBe(1);
      expect(typeof globalFitMock.fit.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global fit with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalFitMock).fit('expected string', testCallBack);

      globalFitMock.fit.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalFitMock.fit.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global fit with async done when cb function has more args than params of given test row', () => {
      const globalFitMock = { fit: jest.fn(), it: {}, test: {}, describe: {} };
      each([['hello']], globalFitMock).fit('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalFitMock.fit.mock.calls[0][1]('DONE');
    });
  });

  describe('.describe', () => {
    test('calls global describe with given title', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      each([[]], globalMock).describe('expected string', () => {});

      expect(globalMock.describe.mock.calls.length).toBe(1);
      expect(globalMock.describe.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe with given title when multiple tests cases exist', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      each([[], []], globalMock).describe('expected string', () => {});

      expect(globalMock.describe.mock.calls.length).toBe(2);
      expect(globalMock.describe.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global describe with title containing param values when using sprintf format', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      each([['hello', 1], ['world', 2]], globalMock).describe('expected string: %s %s', () => {});

      expect(globalMock.describe.mock.calls.length).toBe(2);
      expect(globalMock.describe.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalMock.describe.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global describe with cb function', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([[]], globalMock).describe('expected string', testCallBack);

      expect(globalMock.describe.mock.calls.length).toBe(1);
      expect(typeof globalMock.describe.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global describe with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalMock).describe('expected string', testCallBack);

      globalMock.describe.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalMock.describe.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global describe with async done when cb function has more args than params of given test row', () => {
      const globalMock = { describe: jest.fn(), fit: {}, it: {}, test: {} };
      each([['hello']], globalMock).describe('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalMock.describe.mock.calls[0][1]('DONE');
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
