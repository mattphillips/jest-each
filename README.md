# jest-each

[![npm version](https://badge.fury.io/js/jest-each.svg)](https://badge.fury.io/js/jest-each)
[![Build Status](https://travis-ci.org/mattphillips/jest-each.svg?branch=master)](https://travis-ci.org/mattphillips/jest-each)
[![Coverage Status](https://coveralls.io/repos/github/mattphillips/jest-each/badge.svg?branch=master)](https://coveralls.io/github/mattphillips/jest-each?branch=master)

A parameterised testing library for [Jest](https://facebook.github.io/jest/) inspired by [mocha-each](https://github.com/ryym/mocha-each).

jest-each allows you to provide multiple arguments to your `test`/`describe` which results in the test/suite being run once per row of parameters.

## Features
 - `.test` to runs multiple tests with parameterised data
   * Also under the alias: `.it`
 - `.test.only` to only run the parameterised tests
   * Also under the aliases: `.it.only` or `.fit`
 - `.test.skip` to skip the parameterised tests
   * Also under the aliases: `.it.skip` or `.xit` or `.xtest`
 - `.describe` to runs test suites with parameterised data
 - `.describe.only` to only run the parameterised suite of tests
   * Also under the aliases: `.fdescribe`
 - `.describe.skip` to skip the parameterised suite of tests
   * Also under the aliases: `.xdescribe`
 - Asynchronous tests with `done`
 - Unique test titles with: [sprintf](https://github.com/alexei/sprintf.js)


## Demo

#### Tests without jest-each

![Current jest tests](assets/default-demo.gif)

#### Tests can be re-written with jest-each to:

**`.test`**

![Current jest tests](assets/test-demo.gif)

**`.describe`**

![Current jest tests](assets/describe-demo.gif)

## Installation

`npm i --save-dev jest-each`

`yarn add -D jest-each`

## Importing

jest-each is a default export so it can be imported with whatever name you like.

```js
// es6
import each from 'jest-each';

// es5
const each = require('jest-each');
```

## API

### `each([parameters]).test(name, testFn)`

#### `each`:
  - parameters: `Array` of Arrays with the arguments that are passed into the `testFn` for each row

#### `.test`:
  - name: `String` the title of the `test`, use `%s` in the name string to positionally inject parameter values into the test title
  - testFn: `Function` the test logic, this is the function that will receive the parameters of each row as function arguments

### `each([parameters]).describe(name, suiteFn)`

#### `each`:
  - parameters: `Array` of Arrays with the arguments that are passed into the `suiteFn` for each row

#### `.describe`:
  - name: `String` the title of the `describe`, use `%s` in the name string to positionally inject parameter values into the suite title
  - suiteFn: `Function` the suite of `test`/`it`s to be ran, this is the function that will receive the parameters in each row as function arguments

## Usage

#### `.test(name, fn)`
Alias: `.it(name, fn)`

```js
import each from 'jest-each';
import add from './add';

each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
]).test('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### `.test.only(name, fn)`
Aliases: `.it.only(name, fn)` or `.fit(name, fn)`

```js
each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
]).test.only('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### `.test.skip(name, fn)`
Aliases: `.it.skip(name, fn)` or `.xit(name, fn)` or `.xtest(name, fn)`

```js
each([
  [1, 1, 2]
  [1, 2, 3],
  [2, 1, 3],
]).test.skip('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### Asynchronous `.test(name, fn(done))`
Alias: `.it(name, fn(done))`

```js
each([
  ['hello'],
  ['mr'],
  ['spy'],
]).test('gives 007 secret message ', (str, done) => {
  const asynchronousSpy = (message) => {
    expect(message).toBe(str);
    done();
  };
  callSomeAsynchronousFunction(asynchronousSpy)(str);
});
```

#### `.describe(name, fn)`

```js
import each from 'jest-each';
import add from './add';

each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
]).describe('.add(%s, %s)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });

  test('does not mutate first arg', () => {
    add(a, b);
    expect(a).toBe(a);
  });

  test('does not mutate second arg', () => {
    add(a, b);
    expect(b).toBe(b);
  });
});
```

#### `.describe.only(name, fn)`
Aliases: `.fdescribe(name, fn)`

```js
each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
]).describe.only('.add(%s, %s)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

#### `.describe.skip(name, fn)`
Aliases: `.xdescribe(name, fn)`

```js
each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
]).describe.skip('.add(%s, %s)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

## License

MIT
