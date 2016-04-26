"use strict";
var helper_1 = require('./helper');
var rule = 'use-isnan';
var scripts = {
    valid: [
        'if (isNaN(foo)) {}',
        'if (isNaN(NaN)) {}'
    ],
    invalid: [
        'if (foo == NaN) {}',
        'if (foo === NaN) {}',
        'if (foo != NaN) {}',
        'if (foo !== NaN) {}',
        'if (NaN == foo) {}',
        'if (NaN === foo) {}',
        'if (NaN != foo) {}',
        'if (NaN !== foo) {}',
        'if (NaN == NaN) {}',
        'if (NaN === NaN) {}',
        'if (NaN != NaN) {}',
        'if (NaN !== NaN) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using isNaN', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when comparing to NaN', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
