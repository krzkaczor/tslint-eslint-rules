"use strict";
var helper_1 = require('./helper');
var rule = 'valid-typeof';
var scripts = {
    valid: [
        'if (typeof foo === "string") {}',
        'if (typeof bar == \'undefined\') {}',
        'if (typeof foo === baz) {}',
        'if (typeof bar === typeof qux) {}'
    ],
    invalid: [
        'if (typeof foo === "strnig") {}',
        'if (typeof foo == "undefimed") {}',
        'if (typeof bar != \'nunber\') {}',
        'if (typeof bar !== "fucntion") {}'
    ]
};
describe(rule, function test() {
    it('should pass when using valid strings or variables', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using invalid strings', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
