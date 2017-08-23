# hapi-route-logging

A simple plugin to print on screen the routes consulted, ideal during development.

<p align="center">
  <a href="https://travis-ci.org/box-maker/hapi-route-logging">
    <img src="https://img.shields.io/travis/box-maker/hapi-route-logging.svg" alt="Travis CI">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/box-maker/hapi-route-logging.svg" alt="Greenkeeper">
  </a>
  <a href="https://github.com/box-maker/hapi-route-logging">
    <img src="https://img.shields.io/coveralls/box-maker/hapi-route-logging.svg" alt="Coveralls">
  </a>
  <a href="https://www.npmjs.com/package/@box-maker/hapi-route-logging">
    <img src="https://img.shields.io/npm/v/@box-maker/hapi-route-logging.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/@box-maker/hapi-route-logging">
    <img src="https://img.shields.io/node/v/@box-maker/hapi-route-logging.svg" alt="Node Minimum version">
  </a>
  <a href="https://github.com/box-maker/hapi-route-logging">
    <img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="XO code style">
  </a>
</p>


## Introduction

Those who have tried other backend frameworks like Django or Flask will have noticed that when you run the development server, this shows information about each request made. This plugin tries to imitate this simple functionality, it does this by displaying a brief start at the beginning with basic information and then showing information is brief but useful on every request.

![Basic capture](images/screenshots/example_basic.jpg?raw=true)

## Install

### Requirements

This plugin has been tested to work with Node in version 4.8.0 and higher, there's no guarantee of performance or support on lower versions.

This plugin is tested with the latest version of Hapi.js

For installation use the Node Package Manager (npm) or Yarn

### With npm:

From npm directory:

```bash
$ npm install -D @box-maker/hapi-route-logging
```

From source

**WARNING**: May be unstable, but includes all changes made

```bash
$ npm install git+https://github.com/box-maker/hapi-route-logging.git
```

### With yarn:

From npm directory:

```bash
$ yarn add -D @box-maker/hapi-route-logging
```

From source

**WARNING**: May be unstable, but includes all changes made

```bash
$ yarn add https://github.com/box-maker/hapi-route-logging.git
```


## Usage

You can find complete examples inside the *examples* directory, both using **require** and **import**

### Import

Using *require*

```javascript
const hapiRouteLogging = require('@box-maker/hapi-route-logging');
```

Using *import* (Requires [Babel](https://babeljs.io/))

```javascript
import hapiRouteLogging from '@box-maker/hapi-route-logging';
```

### Registration

Without options

```javascript
server.register(hapiRouteLogging, err => {
  if (err) {
    throw err;
  }
});
```

With options

```javascript
server.register({
  register: hapiRouteLogging,
  options: {}
}, err => {
  if (err) {
    throw err;
  }
});
```

Loading multiple plugins

```javascript
server.register([
  {
    register: hapiRouteLogging,
    options: {}
  },
  {
    register: otherPlugin,
    options: {}
  }
], err => {
  if (err) {
    throw err;
  }
});
```

### Options

The following options are available:


## Development

Dependencies |
------------ |
[![David](https://img.shields.io/david/box-maker/hapi-route-logging.svg)](https://github.com/box-maker/hapi-route-logging) |
[![David](https://img.shields.io/david/dev/box-maker/hapi-route-logging.svg)](box-maker/hapi-route-logging) |


First you have to install all dependencies:

```bash
yarn install
```

or

```bash
npm install
```

To execute all unit tests once, use:

```bash
$ npm test
```

or to run tests based on file watcher, use:

```bash
$ npm start
```

To get information about the test coverage, use:

```bash
$ npm run coverage
```


## Contribution

Fork this repository and push in your ideas.

Do not forget to add corresponding tests to keep up 100% test coverage.


## [License](https://www.mozilla.org/en-US/MPL/2.0/)

This plugin is licensed under the Mozilla Public License Version 2.0, you can find a copy of this in the file **LICENSE**. Please respect the same.
