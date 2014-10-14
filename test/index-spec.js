var _index = require('../lib/index');
var expect = require('chai').expect;

describe('index', function() {
    it('should expose the methods/properties required by the interface', function() {
        expect(_index).to.have.property('preprocessor:requirejs-wrapper').and.to.be.an('Array');

        var ref = _index['preprocessor:requirejs-wrapper'];
        expect(ref[0]).to.equal('factory');
        expect(ref[1]).to.be.a('function');
    });
});
