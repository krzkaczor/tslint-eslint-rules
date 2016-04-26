"use strict";
var helper_1 = require('./helper');
var rule = 'no-control-regex';
var scripts = {
    'valid': [
        'var regex = /x1f/',
        'var regex = new RegExp("x1f")',
        'var regex = RegExp("x1f")',
        'new RegExp("[")',
        'RegExp("[")',
        'new (function foo(){})("\\x1f")'
    ],
    'invalid': [
        'var regex = /\\\u001f/',
        'var regex = new RegExp("\\x1f")',
        'var regex = RegExp("\\x1f")'
    ]
};
describe(rule, function test() {
    it('should pass when there are no control characters in regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when there are control characters in regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
