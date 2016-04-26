"use strict";
var helper_1 = require('./helper');
var rule = 'no-regex-spaces';
var scripts = {
    valid: [
        'var foo = /bar {3}baz/;',
        'var foo = /bar\t\t\tbaz/;'
    ],
    invalid: [
        'var foo = /bar    baz/;'
    ]
};
describe(rule, function test() {
    it('should pass when not using multiple spaces in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using multiple spaces in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
