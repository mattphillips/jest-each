# jest-each

A parameterised testing library for [Jest](https://facebook.github.io/jest/) inspired by [mocha-each](https://github.com/ryym/mocha-each).

jest-each allows you to provide multiple arguments to your `test` which results in the test being run once per row of parameters.

## Features
 - Parameterised test data
 - Unique test titles with: [sprintf](https://github.com/alexei/sprintf.js)
 - Supports `test.skip` to skip the parameterised tests
 - Supports `test.only` to only run the parameterised tests
 - Supports asynchronous tests with `done`

## Installation

`npm i --save-dev jest-each`

`yarn add -D jest-each`

## API

`each([parameters]).test(title, testCallback)`

#### `each`:
  - parameters: `Array` the arguments that are passed into the `testCallback`

#### `.test`:
  - title: `String` the title of the `test`, use `%s` in the title string to positionally inject parameter values into the test title
  - testCallback: `Function` the test logic, this is the function that will receive the parameters as function arguments

## Usage

#### `.test`
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

#### `.test.only`
```js
each([ [1, 1, 2] ]).test.only('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### `.test.skip`
```js
each([ [1, 1, 2] ]).test.skip('returns the result of adding %s to %s', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

#### asynchronous `.test`
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
