[![Build Status](https://travis-ci.org/vamship/karma-requirejs-wrapper-preprocessor.svg)](https://travis-ci.org/vamship/karma-requirejs-wrapper-preprocessor)
# karma-requirejs-wrapper-preprocessor
A Karma preprocessor module that can be used to wrap the contents of files with a 'require() {}' call. While it can technically be used in a standalone manner with any data files, this module has been primarily developed to wrap the result of the ng-html2js processor module, for projects that primarily use RequireJS in conjuction with AngularJS.

# Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)

# Overview
This library was intended to be used in conjunction with karma-ng-html2js-preprocessor, in order to make the output of the preprocessor compatible with RequireJS. This library uses preprocessor chaining on Karma, and will only work with versions 0.9+ of Karma.

# Installation
This library can be installed by using the npm tool as follows:
```shell
npm install karma-requirejs-wrapper-preprocessor
```
> ** NOTE: ** 
> - Use the `--save` or `--save-dev` option to save the dependency in your project's `package.json` file

## Usage
The following is a code snippet from the karma configuration file:

```javascript
module.exports = function(config) {
  config.set({
    
    preprocessors: {
      // The processors are chained. The output of html2js goes to requirejs-wrapper.
      '**/*.html': [ 'ng-html2js', 'requirejs-wrapper' ]
    },

    // Configuration for ng-html2js
    ngHtml2JsPreprocessor: {
        ...
    },
    
    // Configuration for the requirejs wrapper
    requireJsWrapper: {
        dependencies: [ 'angular' ]
    }

```
### Options

The following options are supported:
 `dependencies`: An array of strings that will be used to generate the dependencies for the `require() {}` wrapper. The string values will be used as the names of the dependencies, with each value also used as argument names in the function call.
 
 > ** NOTE: **
 > Using whitespaces in the names of the dependencies will break your module!
