import each from './';

describe('jest-each', () => {
  describe('.test', () => {
    test('calls global test with given title', () => {
      const globalTestMock = jest.fn();
      each([[]], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.mock.calls.length).toBe(1);
      expect(globalTestMock.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestMock = jest.fn();
      each([[], []], globalTestMock).test('expected string', () => {});

      expect(globalTestMock.mock.calls.length).toBe(2);
      expect(globalTestMock.mock.calls[0][0]).toBe('expected string');
      expect(globalTestMock.mock.calls[1][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestMock = jest.fn();
      each([['hello', 1], ['world', 2]], globalTestMock).test('expected string: %s %s', () => {});

      expect(globalTestMock.mock.calls.length).toBe(2);
      expect(globalTestMock.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestMock.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestMock = jest.fn();
      const testCallBack = jest.fn();
      each([[]], globalTestMock).test('expected string', testCallBack);

      expect(globalTestMock.mock.calls.length).toBe(1);
      expect(typeof globalTestMock.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing parameters of first row', () => {
      const globalTestMock = jest.fn();
      const testCallBack = jest.fn();
      each([['hello']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
    });

    test('calls global test with cb function containing all parameters of first row', () => {
      const globalTestMock = jest.fn();
      const testCallBack = jest.fn();
      each([['hello', 'world']], globalTestMock).test('expected string', testCallBack);

      globalTestMock.mock.calls[0][1]();

      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestMock = jest.fn();
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalTestMock).test('expected string', testCallBack);

      globalTestMock.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalTestMock.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global test with async done when cb function has more args than params of given test row', () => {
      const globalTestMock = jest.fn();
      each([['hello']], globalTestMock).test('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestMock.mock.calls[0][1]('DONE');
    });
  });

  describe('.test.skip', () => {
    test('calls global test with given title', () => {
      const globalTestMock = { skip: jest.fn() };
      each([[]], globalTestMock).test.skip('expected string', () => {});

      expect(globalTestMock.skip.mock.calls.length).toBe(1);
      expect(globalTestMock.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestMock = { skip: jest.fn() };
      each([[], []], globalTestMock).test.skip('expected string', () => {});

      expect(globalTestMock.skip.mock.calls.length).toBe(2);
      expect(globalTestMock.skip.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestMock = { skip: jest.fn() };
      each([['hello', 1], ['world', 2]], globalTestMock).test.skip('expected string: %s %s', () => {});

      expect(globalTestMock.skip.mock.calls.length).toBe(2);
      expect(globalTestMock.skip.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestMock.skip.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestMock = { skip: jest.fn() };
      const testCallBack = jest.fn();
      each([[]], globalTestMock).test.skip('expected string', testCallBack);

      expect(globalTestMock.skip.mock.calls.length).toBe(1);
      expect(typeof globalTestMock.skip.mock.calls[0][1] === 'function').toBe(true);
    });
  });

  describe('.test.only', () => {
    test('calls global test with given title', () => {
      const globalTestMock = { only: jest.fn() };
      each([[]], globalTestMock).test.only('expected string', () => {});

      expect(globalTestMock.only.mock.calls.length).toBe(1);
      expect(globalTestMock.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with given title when multiple tests cases exist', () => {
      const globalTestMock = { only: jest.fn() };
      each([[], []], globalTestMock).test.only('expected string', () => {});

      expect(globalTestMock.only.mock.calls.length).toBe(2);
      expect(globalTestMock.only.mock.calls[0][0]).toBe('expected string');
    });

    test('calls global test with title containing param values when using sprintf format', () => {
      const globalTestMock = { only: jest.fn() };
      each([['hello', 1], ['world', 2]], globalTestMock).test.only('expected string: %s %s', () => {});

      expect(globalTestMock.only.mock.calls.length).toBe(2);
      expect(globalTestMock.only.mock.calls[0][0]).toBe('expected string: hello 1');
      expect(globalTestMock.only.mock.calls[1][0]).toBe('expected string: world 2');
    });

    test('calls global test with cb function', () => {
      const globalTestMock = { only: jest.fn() };
      const testCallBack = jest.fn();
      each([[]], globalTestMock).test.only('expected string', testCallBack);

      expect(globalTestMock.only.mock.calls.length).toBe(1);
      expect(typeof globalTestMock.only.mock.calls[0][1] === 'function').toBe(true);
    });

    test('calls global test with cb function containing all parameters of first row when multiple test cases exist', () => {
      const globalTestMock = { only: jest.fn() };
      const testCallBack = jest.fn();
      each([
        ['hello', 'world'],
        ['joe', 'bloggs'],
      ], globalTestMock).test.only('expected string', testCallBack);

      globalTestMock.only.mock.calls[0][1]();
      expect(testCallBack.mock.calls.length).toBe(1);
      expect(testCallBack.mock.calls[0][0]).toBe('hello');
      expect(testCallBack.mock.calls[0][1]).toBe('world');

      globalTestMock.only.mock.calls[1][1]();
      expect(testCallBack.mock.calls.length).toBe(2);
      expect(testCallBack.mock.calls[1][0]).toBe('joe');
      expect(testCallBack.mock.calls[1][1]).toBe('bloggs');
    });

    test('calls global test with async done when cb function has more args than params of given test row', () => {
      const globalTestMock = { only: jest.fn() };
      each([['hello']], globalTestMock).test.only('expected string', (hello, done) => {
        expect(hello).toBe('hello');
        expect(done).toBe('DONE');
      });

      globalTestMock.only.mock.calls[0][1]('DONE');
    });
  });
});
