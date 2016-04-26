"use strict";
var helper_1 = require('./helper');
var rule = 'no-inner-declarations';
var scripts = {
    validFunctions: [
        'function doSomething() { }',
        'function doSomething() { function somethingElse() { } }',
        '(function() { function doSomething() { } }());',
        'if (test) { var fn = function() { }; }',
        'if (test) { var fn = function expr() { }; }',
        'function decl() { var fn = function expr() { }; }',
        'function decl(arg) { var fn; if (arg) { fn = function() { }; } }',
        'var x = {doSomething() {function doSomethingElse() {}}}',
        'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
        'function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }',
        'if (test) { var foo; }',
        'function doSomething() { while (test) { var foo; } }',
        'foo(() => { function bar() { } });'
    ],
    validBoth: [
        'if (test) { let x = 1; }',
        'if (test) { const x = 1; }',
        'var foo;',
        'var foo = 42;',
        'function doSomething() { var foo; }',
        '(function() { var foo; }());',
        'var fn = () => {var foo;}',
        'var x = {doSomething() {var foo;}}'
    ],
    invalidFunctions: [
        'function doSomething() { do { function somethingElse() { } } while (test); }',
        '(function() { if (test) { function doSomething() { } } }());'
    ],
    invalidBoth: [
        'if (test) { function doSomething() { } }',
        'while (test) { var foo; }',
        'function doSomething() { if (test) { var foo = 42; } }',
        '(function() { if (test) { var foo; } }());'
    ]
};
describe(rule, function test() {
    it('should pass when not using inner declaration functions', function testValidFunctions() {
        helper_1.makeTest(rule, scripts.validFunctions, true, {
            rules: (_a = {},
                _a[rule] = [true, 'functions'],
                _a
            )
        });
        var _a;
    });
    it('should pass when not using inner declaration functions and variables', function testValidFunctionsAndVariables() {
        helper_1.makeTest(rule, scripts.validBoth, true, {
            rules: (_a = {},
                _a[rule] = [true, 'both'],
                _a
            )
        });
        var _a;
    });
    it('should fail when using inner declaration functions', function testInvalidFunctions() {
        helper_1.makeTest(rule, scripts.invalidFunctions, false, {
            rules: (_a = {},
                _a[rule] = [true, 'functions'],
                _a
            )
        });
        var _a;
    });
    it('should fail when using inner declaration functions or variables', function testInvalidFunctionsAndVariables() {
        helper_1.makeTest(rule, scripts.invalidBoth, false, {
            rules: (_a = {},
                _a[rule] = [true, 'both'],
                _a
            )
        });
        var _a;
    });
});
