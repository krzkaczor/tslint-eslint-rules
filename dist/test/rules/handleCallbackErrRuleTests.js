"use strict";
var helper_1 = require('./helper');
var rule = 'handle-callback-err';
var scripts = {
    standardConfig: {
        valid: [
            'function(stream) {}',
            "function loadData (err, data) {\n        if (err) {\n            console.log(err.stack);\n        }\n        doSomething();\n    }",
            "function loadData (Err, data) {\n        if (Err) {\n            console.log(Err.stack);\n        }\n        doSomething();\n    }"
        ],
        invalid: [
            "function(err, stream) { stream.on('done', function(){exit(0)} }",
            "function loadData (err, data) { doSomething(); }",
            "function loadData (err, data) {\n        if (error) {\n            console.log(error.stack);\n        }\n        doSomething();\n    }"
        ]
    },
    customErrorNameConfig: {
        valid: [
            "function(errorMsg, stream) { console.error(errorMsg) }",
            "function(err, stream) { }"
        ],
        invalid: [
            "function(errorMsg, stream) { }"
        ]
    },
    customErrorRegexConfig: {
        valid: [
            "function(errorMsg, stream) { console.error(errorMsg) }"
        ],
        invalid: [
            "function(err, stream) { }",
            "function(error, stream) { }",
            "function(errorMsg, stream) { }"
        ]
    }
};
describe(rule, function test() {
    var standardConfig = { rules: { 'handle-callback-err': [true] } };
    var customErrorNameConfig = { rules: { 'handle-callback-err': [true, 'errorMsg'] } };
    var customErrorRegexConfig = { rules: { 'handle-callback-err': [true, '^(err|error|errorMsg)$'] } };
    it('should pass with standard config', function testVariables() {
        helper_1.makeTest(rule, scripts.standardConfig.valid, true, standardConfig);
    });
    it('should fail with standard config', function testVariables() {
        helper_1.makeTest(rule, scripts.standardConfig.invalid, false, standardConfig);
    });
    it('should pass with custom error name', function testVariables() {
        helper_1.makeTest(rule, scripts.customErrorNameConfig.valid, true, customErrorNameConfig);
    });
    it('should fail with custom error name', function testVariables() {
        helper_1.makeTest(rule, scripts.customErrorNameConfig.invalid, false, customErrorNameConfig);
    });
    it('should pass with custom error regex', function testVariables() {
        helper_1.makeTest(rule, scripts.customErrorRegexConfig.valid, true, customErrorRegexConfig);
    });
    it('should fail with custom error regex', function testVariables() {
        helper_1.makeTest(rule, scripts.customErrorRegexConfig.invalid, false, customErrorRegexConfig);
    });
});
