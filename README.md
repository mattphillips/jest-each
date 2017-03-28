# jest-each

[![Build Status](https://travis-ci.org/mattphillips/jest-each.svg?branch=master)](https://travis-ci.org/mattphillips/jest-each)
[![Coverage Status](https://coveralls.io/repos/github/mattphillips/jest-each/badge.svg?branch=master)](https://coveralls.io/github/mattphillips/jest-each?branch=master)

A parameterised testing library for [Jest](https://facebook.github.io/jest/) inspired by [mocha-each](https://github.com/ryym/mocha-each).

jest-each allows you to provide multiple arguments to your `test` which results in the test being run once per row of parameters.

## Features
 - `.test` to runs multiple tests with parameterised data
   * Also under the alias: `.it`
 - `.test.skip` to skip the parameterised tests
    * Also under the alias: `.it.skip`
 - `.test.only` to only run the parameterised tests
    * Also under the alias: `.it.only`
 - Asynchronous tests with `done`
 - Unique test titles with: [sprintf](https://github.com/alexei/sprintf.js)

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

### `each([parameters]).test(name, fn)`

#### `each`:
  - parameters: `Array` the arguments that are passed into the `fn`

#### `.test`:
  - name: `String` the title of the `test`, use `%s` in the name string to positionally inject parameter values into the test title
  - fn: `Function` the test logic, this is the function that will receive the parameters as function arguments

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
Alias: `.it.only(name, fn)`

```js
each([ [1, 1, 2] ]).test.only('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### `.test.skip(name, fn)`
Alias: `.it.skip(name, fn)`

```js
each([ [1, 1, 2] ]).test.skip('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### Asynchronous `.test(name, fn(done))`
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

## License

MIT
