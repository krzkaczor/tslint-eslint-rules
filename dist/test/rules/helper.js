"use strict";
var chai_1 = require('chai');
var Lint = require('tslint/lib/lint');
function testScript(rule, scriptText, config) {
    var options = {
        configuration: config,
        formatter: 'json',
        formattersDirectory: 'dist/formatters/',
        rulesDirectory: 'dist/rules/'
    };
    var linter = new Lint.Linter(rule + ".ts", scriptText, options);
    var result = linter.lint();
    var failures = JSON.parse(result.output);
    return failures.length === 0;
}
exports.testScript = testScript;
function makeTest(rule, scripts, expected, config) {
    if (!config) {
        config = {
            rules: {}
        };
        config.rules[rule] = true;
    }
    scripts.forEach(function (code) {
        var res = testScript(rule, code, config);
        chai_1.expect(res).to.equal(expected, code);
    });
}
exports.makeTest = makeTest;
