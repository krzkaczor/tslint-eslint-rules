"use strict";
var helper_1 = require('./helper');
var rule = 'block-spacing';
var scripts = {
    always: {
        valid: [
            "function foo() { return true; }",
            "if (foo) { bar = 0; }",
            "switch (myVar) { case 1: return true; }",
            "function foo() {}",
            "function foo() { }"
        ],
        invalid: [
            "function foo() {return true;}",
            "if (foo) { bar = 0;}",
            "switch (myVar) { case 1: return true;}",
            "switch (myVar) {case 1: return true; }",
            "switch (myVar) {case 1: return true;}"
        ]
    },
    never: {
        valid: [
            "function foo() {return true;}",
            "if (foo) {bar = 0;}",
            "switch (myVar) {case 1: return true;}",
            "function foo() {}",
            "function foo() { }"
        ],
        invalid: [
            "function foo() { return true; }",
            "if (foo) { bar = 0;}",
            "switch (myVar) { case 1: return true;}",
            "switch (myVar) {case 1: return true; }",
            "switch (myVar) { case 1: return true; }"
        ]
    }
};
describe(rule, function test() {
    var alwaysConfig = { rules: { 'block-spacing': [true, 'always'] } };
    var neverConfig = { rules: { 'block-spacing': [true, 'never'] } };
    it('should pass when "always" and there are spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.always.valid, true, alwaysConfig);
    });
    it('should fail when "always" and there are not spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.always.invalid, false, alwaysConfig);
    });
    it('should pass when "never" and there are not spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.never.valid, true, neverConfig);
    });
    it('should fail when "never" and there are spaces inside brackets', function testVariables() {
        helper_1.makeTest(rule, scripts.never.invalid, false, neverConfig);
    });
});
