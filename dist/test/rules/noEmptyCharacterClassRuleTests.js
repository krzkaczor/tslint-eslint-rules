"use strict";
var helper_1 = require('./helper');
var rule = 'no-empty-character-class';
var scripts = {
    valid: [
        'var foo = /^abc[a-zA-Z]/;',
        'var regExp = new RegExp(\'^abc[]\');',
        'var foo = /^abc/;',
        'var foo = /[\\[]/;',
        'var foo = /[\\]]/;',
        'var foo = /[a-zA-Z\\[]/;',
        'var foo = /[[]/;',
        'var foo = /[\\[a-z[]]/;',
        'var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;',
        'var foo = /\\s*:\\s*/gim;'
    ],
    invalid: [
        'var foo = /^abc[]/;',
        'var foo = /foo[]bar/;',
        'if (foo.match(/^abc[]/)) {}',
        'if (/^abc[]/.test(foo)) {}',
        'var foo = /[]]/;',
        'var foo = /\\[[]/;',
        'var foo = /\\[\\[\\]a-z[]/;'
    ]
};
describe(rule, function test() {
    it('should pass when not using empty character classes in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using empty character classes in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
