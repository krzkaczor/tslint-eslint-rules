"use strict";
var helper_1 = require('./helper');
var rule = 'no-extra-boolean-cast';
var scripts = {
    valid: [
        'if (!foo) {}',
        'const x = !foo;',
        'const foo = true;',
        'const foo = !!bar;',
        'function foo() { return !!bar }',
        'const foo = bar ? !!x : !!y;`'
    ],
    invalid: [
        'if (!!foo) {}',
        'const foo = !!!bar;',
        'const foo = !!bar ? baz : bat;',
        'const foo = Boolean(!!bar);',
        'const foo = new Boolean(!!bar);',
        'while (!!foo) {}',
        'do {} while (!!foo);',
        'for (; !!foo; ) {}`'
    ]
};
describe(rule, function test() {
    it('should pass when using valid boolean casts outside of a boolean context', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using redundant boolean casts in a boolean context', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
