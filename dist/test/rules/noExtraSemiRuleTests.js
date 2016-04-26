"use strict";
var helper_1 = require('./helper');
var rule = 'no-extra-semi';
var scripts = {
    valid: [
        'const x = 5;',
        'function foo() { }',
        'for(;;);',
        'while(0);',
        'do;while(0);',
        'for(a in b);',
        'for(a of b);',
        'class A { }',
        'const A = class { };',
        "\n      class A {\n        foo = 'bar';\n        a() {\n          this;\n        }\n      }\n    ",
        "\n      const A = class {\n        a() {\n          this;\n          this.foo = 'bar';\n        }\n      };\n    ",
        'class A { } a;'
    ],
    invalid: [
        'const x = 5;;',
        'let y = "foo";;',
        'const z = {};;',
        'function foo() {};',
        'for(;;);;',
        'while(0);;',
        'do;while(0);;',
        'for(a in b);;',
        'for(a of b);;',
        'class A { ; }',
        'class A { /*a*/; }',
        "\n      class A {\n        ; a() {\n\n        }\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n        b() {\n\n        }\n      }\n    ",
        "\n      class A {\n        ; a() {\n\n        };\n        b() {\n\n        };\n      }\n    ",
        "\n      class A {\n        a() {\n\n        };\n        get b() {\n\n        }\n      }\n    "
    ]
};
describe(rule, function test() {
    it('should pass when no extra-semi colons exist', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when there are extra semi-colons', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
