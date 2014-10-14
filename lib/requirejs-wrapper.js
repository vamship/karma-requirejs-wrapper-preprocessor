/* jshint node:true */
'use strict';

function _createPreprocessor(logger, config) {
    var log = logger.create('preprocessor.requireJsWrapper');
    config = config || {};

    if( !(config.dependencies instanceof Array) ||
            config.dependencies.length <= 0) { 
        log.warn('No dependencies specified for requirejs wrapper');
    }
    var dependencies = config.dependencies || [];

    return function(content, file, done) {
        var dependencyArgs = dependencies.join(', ');
        var quoteChar = (dependencies.length <= 0) ? '': '\'';
        log.debug('Generating require js wrapper. Dependencies: %s',
                                                        dependencyArgs);
        content = 'require([' + quoteChar +
                  dependencies.join('\', \'') +
                  quoteChar + '],\nfunction(' +
                  dependencyArgs +
                  ') {\n' + content + '\n})';
        done(content);
    };
}

_createPreprocessor.$inject = ['logger', 'config.requireJsWrapper'];

module.exports = _createPreprocessor;
