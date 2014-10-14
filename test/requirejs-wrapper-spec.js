var _wrapper = require('../lib/requirejs-wrapper');
var expect = require('chai').expect;

describe('requirejs-wrapper', function() {
    var _mockLogger = {
        create: function() {
            return {
                debug: function() {},
                warn: function() {}
            };
        }
    };

    it('should return a function when invoked with no options', function() {
        var processor = _wrapper(_mockLogger);
        expect(_wrapper).to.be.a('function');
    });

    it('should return a function when invoked with empty options', function() {
        var processor = _wrapper(_mockLogger, {});
        expect(_wrapper).to.be.a('function');
    });

    it('should return a function when invoked with valid, non empty options', function() {
        var processor = _wrapper(_mockLogger, {
            dependencies: ['angular', 'jquery']
        });
        expect(_wrapper).to.be.a('function');
    });

    describe('processor', function() {
        var DEFAULT_FILE = 'foo';
        var WRAPPER_TEMPLATE_EMPTY = 'require([${DEPS}],\nfunction(${ARGS}) {\n${CONTENTS}\n})';
        var WRAPPER_TEMPLATE = 'require([\'${DEPS}\'],\nfunction(${ARGS}) {\n${CONTENTS}\n})';
        var DEFAULT_CONTENTS = '(function(foo, bar) { foo.add(bar, "<div><b>This is a test</b></div>"); }';

        it('should wrap the input content with a "require() {}" construct when invoked (no options)', function(done) {
            var processor = _wrapper(_mockLogger);
            var expectedValue = WRAPPER_TEMPLATE_EMPTY.replace('${DEPS}', '')
                                                        .replace('${ARGS}', '')
                                                        .replace('${CONTENTS}', DEFAULT_CONTENTS);
            processor(DEFAULT_CONTENTS, DEFAULT_FILE, function(contents) {
                expect(contents).to.equal(expectedValue);
                done();
            });
        });

        it('should wrap the input content with a "require() {}" construct when invoked (empty options)', function(done) {
            var processor = _wrapper(_mockLogger, {});
            var expectedValue = WRAPPER_TEMPLATE_EMPTY.replace('${DEPS}', '')
                                                        .replace('${ARGS}', '')
                                                        .replace('${CONTENTS}', DEFAULT_CONTENTS);
            processor(DEFAULT_CONTENTS, DEFAULT_FILE, function(contents) {
                expect(contents).to.equal(expectedValue);
                done();
            });
        });

        it('should wrap the input content with a "require() {}" construct when invoked (non empty dependencies)', function(done) {
            var dependencies = [ 'angular', 'jquery' ];
            var processor = _wrapper(_mockLogger, {
                dependencies: dependencies
            });
            var expectedValue = WRAPPER_TEMPLATE.replace('${DEPS}', dependencies.join('\', \''))
                                                .replace('${ARGS}', dependencies.join(', '))
                                                .replace('${CONTENTS}', DEFAULT_CONTENTS);
            processor(DEFAULT_CONTENTS, DEFAULT_FILE, function(contents) {
                expect(contents).to.equal(expectedValue);
                done();
            });
        });
    });

});
