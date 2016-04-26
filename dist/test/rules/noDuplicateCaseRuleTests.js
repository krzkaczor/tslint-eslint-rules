"use strict";
var helper_1 = require('./helper');
var rule = 'no-duplicate-case';
var scripts = {
    duplicateNumbers: [
        "switch (a) {\n       case 1:\n         break;\n       case 2:\n         break;\n       case 1:\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateStrings: [
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }"
    ],
    duplicateVariables: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case foo:\n         break;\n       default:\n         break;\n     }"
    ],
    noDupes: [
        "switch (a) {\n       case foo:\n         break;\n       case bar:\n         break;\n       case baz:\n         break;\n       case qux:\n         break;\n       case 'bar':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 'foo':\n         break;\n       case 'bar':\n         break;\n       case 'baz':\n         break;\n       case 'qux':\n         break;\n       default:\n         break;\n     }",
        "switch (a) {\n       case 0:\n         break;\n       case 1:\n         break;\n       case 2:\n         break;\n       case 3:\n         break;\n       default:\n         break;\n     }"
    ]
};
describe(rule, function test() {
    it('should pass when there is no duplicate cases', function testNoDupes() {
        helper_1.makeTest(rule, scripts.noDupes, true);
    });
    it('should fail when there is duplicate numbers', function testDupNumbers() {
        helper_1.makeTest(rule, scripts.duplicateNumbers, false);
    });
    it('should fail when there is duplicate strings', function testDupStrings() {
        helper_1.makeTest(rule, scripts.duplicateStrings, false);
    });
    it('should fail when there is duplicate variables', function testDupVariables() {
        helper_1.makeTest(rule, scripts.duplicateVariables, false);
    });
});
