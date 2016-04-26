"use strict";
var helper_1 = require('./helper');
var rule = 'no-sparse-arrays';
var scripts = {
    valid: [
        'const items = [];',
        'const colors = [ "red", "blue", ];',
        'const arr = new Array(23);'
    ],
    invalid: [
        'const items = [,,];',
        'const arr = [,];',
        'const colors = [ "red",, "blue" ];',
        'const foo = ["tire", 1, , "small ball"];'
    ]
};
describe(rule, function test() {
    it('should pass when using valid arrays or trailing comma', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using double comma in arrays', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
