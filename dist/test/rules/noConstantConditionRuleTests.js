"use strict";
var helper_1 = require('./helper');
var rule = 'no-constant-condition';
var scripts = {
    variables: [
        'if (foo === true) {}',
        'if (!foo === true) {}',
        'if (bar === false) {}',
        'if (!bar === false) {}',
        'if (baz) {}',
        'if (!baz) {}',
        'if (qux == true) {}',
        'if (!(qux == true)) {}',
        'if (true == x) {}',
        'if (!(true == x)) {}',
        'if (false === y) {}',
        'if (!(false === y)) {}',
        'if (y === x) {}',
        'if (!(y === x)) {}',
        'if (x > 0) {}',
        'if (!(x > 0)) {}',
        'if (100 > x) {}',
        'if (!(100 > x)) {}',
        'if (x === -y) {}',
        'if (!(x === -y)) {}'
    ],
    booleans: [
        'if (true) {}',
        'if (!true) {}',
        'if (false) {}',
        'if (!false) {}'
    ],
    numbers: [
        'if (0) {}',
        'if (!0) {}',
        'if (1) {}',
        'if (!1) {}',
        'if (100) {}',
        'if (!100) {}',
        'if (30.33) {}',
        'if (!30.33) {}',
        'if (-1) {}',
        'if (!-1) {}',
        'if (x = 1) {}',
        'if (!(x = 1)) {}'
    ],
    objects: [
        'if ({}) {}',
        'if (!{}) {}',
        'if ({ foo: "bar" }) {}',
        'if (!{ foo: "bar" }) {}'
    ],
    arrays: [
        'if ([]) {}',
        'if (![]) {}',
        'if ([1, 2, 3]) {}',
        'if (![1, 2, 3]) {}'
    ],
    binary: [
        'if (true === true) {}',
        'if (!(true === true)) {}',
        'if (100 > -5) {}',
        'if (!(100 > -5)) {}',
        'if (false != true) {}',
        'if (!(false != true)) {}',
        'if (false !== true && true === true) {}',
        'if (!(false !== true && true === true)) {}',
        'if (!(false !== true) && true === true) {}',
        'if (false !== true && !(true === true)) {}',
        'if (!(false !== true) && !(true === true)) {}'
    ],
    ternary: [
        'let foo = true ? 1 : 0;',
        'let foo = !true ? 1 : 0;',
        'let bar = false ? "a" : "b";',
        'let bar = !false ? "a" : "b";',
        'let baz = 100 ? "x" : "z";',
        'let baz = !100 ? "x" : "z";',
        'let qux = true === true ? "p": "w";',
        'let qux = !(true === true) ? "p": "w";'
    ],
    whileVars: [
        'while (y === x) {}',
        'while (!(y === x)) {}',
        'while (x > -5) {}',
        'while (!(x > -5)) {}',
        'while (100 > x) {}',
        'while (!(100 > x)) {}',
        'while (foo) {}',
        'while (!foo) {}'
    ],
    whileLiterals: [
        'while (true) {}',
        'while (!true) {}',
        'while (false) {}',
        'while (!false) {}',
        'while (-5) {}',
        'while (!-5) {}',
        'while (1) {}',
        'while (!1) {}',
        'while ({}) {}',
        'while (!{}) {}',
        'while ([]) {}',
        'while (![]) {}'
    ],
    doWhileVars: [
        'do {} while (y === x);',
        'do {} while (!(y === x);',
        'do {} while (x > -5);',
        'do {} while (!(x > -5));',
        'do {} while (100 > x);',
        'do {} while (!(100 > x));',
        'do {} while (foo);',
        'do {} while (!foo);'
    ],
    doWhileLiterals: [
        'do {} while (true);',
        'do {} while (!true);',
        'do {} while (false);',
        'do {} while (!false);',
        'do {} while (-5);',
        'do {} while (!-5);',
        'do {} while (1);',
        'do {} while (!1);',
        'do {} while ({});',
        'do {} while (!{});',
        'do {} while ([]);',
        'do {} while (![]);'
    ],
    forVars: [
        'for (;y === x;) {}',
        'for (;(!y === x);) {}',
        'for (;x > -5;) {}',
        'for (;!(x > -5);) {}',
        'for (;100 > x;) {}',
        'for (;!(100 > x);) {}',
        'for (;foo;) {}',
        'for (;!foo;) {}'
    ],
    forLiterals: [
        'for (;true;) {}',
        'for (;!true;) {}',
        'for (;false;) {}',
        'for (;!false;) {}',
        'for (;-5;) {}',
        'for (;!-5;) {}',
        'for (;1;) {}',
        'for (;!1;) {}',
        'for (;{};) {}',
        'for (;!{};) {}',
        'for (;[];) {}',
        'for (;![];) {}'
    ]
};
describe(rule, function test() {
    it('should pass when using variables', function testVariables() {
        helper_1.makeTest(rule, scripts.variables, true);
    });
    it('should fail with literal booleans', function testBooleans() {
        helper_1.makeTest(rule, scripts.booleans, false);
    });
    it('should fail with literal numbers', function testNumbers() {
        helper_1.makeTest(rule, scripts.numbers, false);
    });
    it('should fail with literal objects', function testObjects() {
        helper_1.makeTest(rule, scripts.objects, false);
    });
    it('should fail with literal arrays', function testArrays() {
        helper_1.makeTest(rule, scripts.arrays, false);
    });
    it('should fail with literal on both sides of a binary expression', function testBinary() {
        helper_1.makeTest(rule, scripts.binary, false);
    });
    it('should fail on ternary literals (booleans / numbers)', function testTernary() {
        helper_1.makeTest(rule, scripts.ternary, false);
    });
    it('should pass on while variables', function testWhileVariables() {
        helper_1.makeTest(rule, scripts.whileVars, true);
    });
    it('should fail on while literals', function testWhileLiterals() {
        helper_1.makeTest(rule, scripts.whileLiterals, false);
    });
    it('should pass on do-while variables', function testDoWhileVariables() {
        helper_1.makeTest(rule, scripts.doWhileVars, true);
    });
    it('should fail on do-while literals', function testDoWhileLiterals() {
        helper_1.makeTest(rule, scripts.doWhileLiterals, false);
    });
    it('should pass on for variables', function testForVariables() {
        helper_1.makeTest(rule, scripts.forVars, true);
    });
    it('should fail on for literals', function testForLiterals() {
        helper_1.makeTest(rule, scripts.forLiterals, false);
    });
});
