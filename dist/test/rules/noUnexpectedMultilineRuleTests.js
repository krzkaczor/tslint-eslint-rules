"use strict";
var helper_1 = require('./helper');
var rule = 'no-unexpected-multiline';
var scripts = {
    valid: [
        '(x || y).aFunction()',
        '[a, b, c].forEach(doSomething)',
        "\n      var a = b;\n      (x || y).doSomething()\n    ",
        "\n      var a = b\n      ;(x || y).doSomething()\n    ",
        "\n      var a = b\n      void (x || y).doSomething()\n    ",
        "\n      var a = b;\n      [1, 2, 3].forEach(console.log)\n    ",
        "\n      var a = b\n      void [1, 2, 3].forEach(console.log)\n    ",
        "\n      'abc      (123)      '\n    ",
        "\n      var a = (\n      (123)\n      )\n    ",
        "\n      var x = {\n        foo: 1,\n        bar: 2,\n        baz: 3\n      };\n    ",
        "\n      function a() {\n\n      }\n    ",
        "\n      if (a === 1\n        && (b === 2 || c === 3)) { }\n    ",
        "\n      myArray\n        .map();\n    ",
        "\n      tag `hello world`\n    ",
        "\n      tag `hello ${expression} world`\n    "
    ],
    invalid: [
        "\n      var a = b\n      (x || y).doSomething()\n    ",
        "\n      var a = (a || b)\n      (x || y).doSomething()\n    ",
        "\n      var a = (a || b)\n      (x).doSomething()\n    ",
        "\n      var a = b\n      [a, b, c].forEach(doSomething)\n    ",
        "\n      var a = b\n          (x || y).doSomething()\n    ",
        "\n      var a = b\n        [a, b, c].forEach(doSomething)\n    ",
        "\n      tag\n        `hello world`\n    ",
        "\n      tag\n        `hello ${expression} world`\n    "
    ]
};
describe(rule, function test() {
    it('should pass when using expected parenthesis, brackets, or templates', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when using unexpected parenthesis, brackets, or templates', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
