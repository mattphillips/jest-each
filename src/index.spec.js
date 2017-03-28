import each from './';

describe('jest-each', () => {
  describe('.test', () => {
    test('calls global test with given title', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      each([[]], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(1);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      each([[], []], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(2);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string');
      expect(globalTestMock.test.mock.calls[1][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      each([['hello', 1], ['world', 2]], globalTestMock).test('expected string: %s %s', () => {});

      expect(globalTestMock.test.mock.calls.length).toBe(2);
      expect(globalTestMock.test.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestMock.test.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestMock).test('expected string', testCallBack);

      expect(globalTestMock.test.mock.calls.length).toBe(1);
      expect(typeof globalTestMock.test.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing parameters of first row', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      const testCallBack = jest.fn();
      each([['hello']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.test.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
    });

    test('calls global test with cb function containing all parameters of first row', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.test.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestMock = { test: jest.fn(), it: {} };
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
      const globalTestMock = { test: jest.fn(), it: {} };
      each([['hello']], globalTestMock).test('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestMock.test.mock.calls[0][1]('DONE');
    });
  });

  describe('.test.skip', () => {
    test('calls global test with given title', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {} };
      each([[]], globalTestSkipMock).test.skip('expected string', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(1);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {} };
      each([[], []], globalTestSkipMock).test.skip('expected string', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(2);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {} };
      each([['hello', 1], ['world', 2]], globalTestSkipMock).test.skip('expected string: %s %s', () => {});

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(2);
      expect(globalTestSkipMock.test.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestSkipMock.test.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestSkipMock = { test: { skip: jest.fn() }, it: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestSkipMock).test.skip('expected string', testCallBack);

      expect(globalTestSkipMock.test.skip.mock.calls.length).toBe(1);
      expect(typeof globalTestSkipMock.test.skip.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.test.only', () => {
    test('calls global test with given title', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
      each([[]], globalTestOnlyMock).test.only('expected string', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(1);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
      each([[], []], globalTestOnlyMock).test.only('expected string', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(2);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
      each([['hello', 1], ['world', 2]], globalTestOnlyMock).test.only('expected string: %s %s', () => {});

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(2);
      expect(globalTestOnlyMock.test.only.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestOnlyMock.test.only.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
      const testCallBack = jest.fn();
      each([[]], globalTestOnlyMock).test.only('expected string', testCallBack);

      expect(globalTestOnlyMock.test.only.mock.calls.length).toBe(1);
      expect(typeof globalTestOnlyMock.test.only.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
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
      const globalTestOnlyMock = { test: { only: jest.fn() }, it: {} };
      each([['hello']], globalTestOnlyMock).test.only('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestOnlyMock.test.only.mock.calls[0][1]('DONE');
    });
  });

  describe('.it', () => {
    test('calls global it with given title', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      each([[]], globalItMock).it('expected string', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(1);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it with given title when multiple it cases exist', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      each([[], []], globalItMock).it('expected string', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(2);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string');
      expect(globalItMock.it.mock.calls[1][0]).toBe('expected string');
    });

    test('calls global it with title containing param values when using sprintf format', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      each([['hello', 1], ['world', 2]], globalItMock).it('expected string: %s %s', () => {});

      expect(globalItMock.it.mock.calls.length).toBe(2);
      expect(globalItMock.it.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalItMock.it.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global it with cb function', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      const testCallBack = jest.fn();
      each([[]], globalItMock).it('expected string', testCallBack);

      expect(globalItMock.it.mock.calls.length).toBe(1);
      expect(typeof globalItMock.it.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global it with cb function containing parameters of first row', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      const testCallBack = jest.fn();
      each([['hello']], globalItMock).it('expected string', testCallBack);

      globalItMock.it.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
    });

    test('calls global it with cb function containing all parameters of first row', () => {
      const globalItMock = { it: jest.fn(), test: {} };
      const testCallBack = jest.fn();
      each([['hello', 'world']], globalItMock).it('expected string', testCallBack);

      globalItMock.it.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');
    });

    test('calls global it with cb function containing all parameters of first row when multiple it cases exist', () => {
      const globalItMock = { it: jest.fn(), test: {} };
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
      const globalItMock = { it: jest.fn(), test: {} };
      each([['hello']], globalItMock).it('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalItMock.it.mock.calls[0][1]('DONE');
    });
  });

  describe('.it.skip', () => {
    test('calls global it skip with given title', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {} };
      each([[]], globalItSkipMock).it.skip('expected string', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(1);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it skip with given title when multiple tests cases exist', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {} };
      each([[], []], globalItSkipMock).it.skip('expected string', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(2);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global it skip with title containing param values when using sprintf format', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {} };
      each([['hello', 1], ['world', 2]], globalItSkipMock).it.skip('expected string: %s %s', () => {});

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(2);
      expect(globalItSkipMock.it.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalItSkipMock.it.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global it skip with cb function', () => {
      const globalItSkipMock = { it: { skip: jest.fn() }, test: {} };
      const testCallBack = jest.fn();
      each([[]], globalItSkipMock).it.skip('expected string', testCallBack);

      expect(globalItSkipMock.it.skip.mock.calls.length).toBe(1);
      expect(typeof globalItSkipMock.it.skip.mock.calls[0][1] === 'function').toBe(true);
    });
  });
});
