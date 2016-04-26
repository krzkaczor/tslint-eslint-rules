"use strict";
var helper_1 = require('./helper');
var rule = 'no-invalid-regexp';
var scripts = {
    valid: [
        'RegExp(\'\')',
        'RegExp()',
        'RegExp(\'.\', \'g\')',
        'new RegExp(\'.\')',
        'new RegExp',
        'new RegExp(\'.\', \'im\')',
        'global.RegExp(\'\\\\\')'
    ],
    invalid: [
        'RegExp(\'[\');',
        'RegExp(\'.\', \'z\');',
        'new RegExp(\')\');',
        'RegExp(\'.\', \'y\');',
        'RegExp(\'.\', \'u\');',
        'RegExp(\'.\', \'yu\');'
    ]
};
describe(rule, function test() {
    it('should pass when using valid regular expressions', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using invalid regular expressions', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
