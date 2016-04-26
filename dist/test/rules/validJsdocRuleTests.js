"use strict";
var helper_1 = require('./helper');
var rule = 'valid-jsdoc';
var scripts = {
    validDefault: [
        "/**\n      * Description\n       * @param {Object[]} screenings Array of screenings.\n       * @param {Number} screenings[].timestamp its a time stamp\n       @return {void} */\n      function foo(){}",
        "/**\n      * Description\n       */\n      var x = new Foo(function foo(){})",
        "/**\n      * Description\n      * @returns {void} */\n      function foo(){}",
        "/**\n      * Description\n      * @returns {undefined} */\n      function foo(){}",
        "/**\n      * Description\n      * @alias Test#test\n      * @returns {void} */\n      function foo(){}",
        "/**\n      * Description\n      *@extends MyClass\n      * @returns {void} */\n      function foo(){}",
        "/**\n      * Description\n      * @constructor */\n      function Foo(){}",
        "/**\n      * Description\n      * @class */\n      function Foo(){}",
        "/**\n      * Description\n      * @param {string} p bar\n      * @returns {string} desc */\n      function foo(p){}",
        "/**\n      * Description\n      * @arg {string} p bar\n      * @returns {string} desc */\n      function foo(p){}",
        "/**\n      * Description\n      * @argument {string} p bar\n      * @returns {string} desc */\n      function foo(p){}",
        "/**\n      * Description\n      * @param {string} [p] bar\n      * @returns {string} desc */\n      function foo(p){}",
        "/**\n      * Description\n      * @param {Object} p bar\n      * @param {string} p.name bar\n      * @returns {string} desc */\n      Foo.bar = function(p){};",
        "(function(){\n      /**\n      * Description\n      * @param {string} p bar\n      * @returns {string} desc */\n      function foo(p){}\n      }())",
        "var o = {\n      /**\n      * Description\n      * @param {string} p bar\n      * @returns {string} desc */\n      foo: function(p){}\n      };",
        "/**\n      * Description\n      * @param {Object} p bar\n      * @param {string[]} p.files qux\n      * @param {Function} cb baz\n      * @returns {void} */\n      function foo(p, cb){}",
        "/**\n      * Description\n      * @override */\n      function foo(arg1, arg2){ return ''; }",
        "/**\n      * Description\n      * @inheritdoc */\n      function foo(arg1, arg2){ return ''; }",
        "/**\n      * Description\n      * @return {void} */\n      function foo(){}",
        "/**\n       * Description for A.\n       */\n      class A {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           * @returns {void}\n           */\n          constructor(xs) {\n              this.a = xs;    }\n      }",
        "/**\n       * Description for A.\n       */\n      class A {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           * @returns {void}\n           */\n          constructor(xs) {\n              this.a = xs;    }\n          /**\n           * Description for method.\n           * @param {object[]} xs - xs\n           * @returns {void}\n           */\n          print(xs) {\n              this.a = xs;    }\n      }"
    ],
    validNoRequireReturn: [
        "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = (p) => {};",
        "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = function({p}){};",
        "/**\n      * Description\n      * @param {string} p bar\n      */\n      Foo.bar = function(p){};",
        "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){return p;}};",
        "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){function func(){return p;}};",
        "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = false; if(t){ return; }};",
        "/**\n      * Description\n      * @param {string} p mytest\n      * @returns {void} */\n      Foo.bar = function(p){var t = false; if(t){ return; }};",
        "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){function name(){return p;}}};",
        "/**\n      * Description\n      * @param {string} p mytest\n      */\n      Foo.bar = function(p){var t = function(){function name(){}; return name;}};",
        "var obj = {\n       /**\n       * Getter\n       * @type {string}\n       */\n       get location() {\n       return this._location;\n       }\n       }",
        "/**\n       * Description for A.\n       */\n       class A {\n       /**\n       * Description for constructor.\n       * @param {object[]} xs - xs\n       */\n       constructor(xs) {\n       /**\n       * Description for this.xs;\n       * @type {object[]}\n       */\n       this.xs = xs.filter(x => x != null);\n       }\n      }",
        "/** @returns {object} foo */ var foo = () => bar();",
        "/** @returns {object} foo */ var foo = () => { return bar(); };",
        "/** foo */ var foo = () => { bar(); };",
        "/**\n       * Description for A.\n       */\n      class A {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           */\n          constructor(xs) {\n              this.a = xs;    }\n      }"
    ],
    validNoRequireParamDescription: [
        "/**\n      * Description\n      * @param {string} p\n      * @returns {void}*/\n      Foo.bar = function(p){var t = function(){function name(){}; return name;}};"
    ],
    validNoRequireReturnDescription: [
        "/**\n      * Description\n      * @param {string} p mytest\n      * @returns {Object}*/\n      Foo.bar = function(p){return name;};"
    ],
    validMatchDescription: [
        "/**\n      * Start with caps and end with period.\n      * @return {void} */\n      function foo(){}"
    ],
    validPrefer: [
        "/** Foo\n      @return {void} Foo\n       */\n      function foo(){}"
    ],
    invalidDefault: [
        "/** @@foo */\n      function foo(){}",
        "/** @@returns {void} Foo */\n      function foo(){}",
        "/** Foo\n      @returns {void Foo\n       */\n      function foo(){}",
        "/** Foo\n      @param {void Foo\n       */\n      function foo(){}",
        "/** Foo\n      @param {} p Bar\n       */\n      function foo(){}",
        "/** Foo\n      @param {void Foo */\n      function foo(){}",
        "/** Foo\n      * @param p Desc\n      */\n      function foo(){}",
        "/**\n      * Foo\n      * @param {string} p\n      */\n      function foo(){}",
        "/**\n      * Foo\n      * @returns {string}\n      */\n      function foo(){}",
        "/**\n      * Foo\n      * @returns {string} something\n      */\n      function foo(p){}",
        "/**\n      * Foo\n      * @param {string} p desc\n      * @param {string} p desc\n      */\n      function foo(){}",
        "/**\n      * Foo\n      * @param {string} a desc\n      @returns {void}*/\n      function foo(b){}",
        "/**\n      * Foo\n      * @override\n      * @param {string} a desc\n       */\n      function foo(b){}",
        "/**\n      * Foo\n      * @inheritdoc\n      * @param {string} a desc\n       */\n      function foo(b){}",
        "/**\n      * @param fields [Array]\n       */\n       function foo(){}",
        "/**\n       * Description for A.\n       */\n      class A {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           * @returns {void}\n           */\n          constructor(xs) {\n              this.a = xs;    }\n          /**\n           * Description for method.\n           */\n          print(xs) {\n              this.a = xs;    }\n      }"
    ],
    invalidPreferReturnReturns: [
        "/** Foo\n      @return {void} Foo\n       */\n      function foo(){}",
        "/** Foo\n      @return {void} Foo\n       */\n      foo.bar = () => {}",
        "/**\n       * Does something.\n      * @param {string} a - this is a\n      * @return {Array<number>} The result of doing it\n      */\n       export function doSomething(a) { }",
        "/**\n       * Does something.\n      * @param {string} a - this is a\n      * @return {Array<number>} The result of doing it\n      */\n       export default function doSomething(a) { }"
    ],
    invalidPreferArgumentArg: [
        "/** Foo\n      @argument {int} bar baz\n       */\n      function foo(bar){}"
    ],
    invalidPreferReturnsReturn: [
        "/** Foo\n       */\n      function foo(){}"
    ],
    invalidNoRequireReturn: [
        "/**\n      * Foo\n      * @param {string} a desc\n      */\n      function foo(a){var t = false; if(t) {return t;}}",
        "/**\n      * Foo\n      * @param {string} a desc\n      */\n      function foo(a){var t = false; if(t) {return null;}}",
        "/**\n      * Foo\n      * @param {string} a desc\n      @returns {MyClass}*/\n      function foo(a){var t = false; if(t) {process(t);}}",
        "/** foo */ var foo = () => bar();",
        "/** foo */ var foo = () => { return bar(); };",
        "/** @returns {object} foo */ var foo = () => { bar(); };"
    ],
    invalidMatchDescription: [
        "/**\n      * Start with caps and end with period\n      * @return {void} */\n      function foo(){}"
    ],
    invalidNoRequireReturnAndMatchDescription: [
        "/**\n       * Description for A\n       */\n      class A {\n          /**\n           * Description for constructor\n           * @param {object[]} xs - xs\n           */\n          constructor(xs) {\n              this.a = xs;    }\n      }",
        "/**\n       * Description for a\n       */\n      var A = class {\n          /**\n           * Description for constructor.\n           * @param {object[]} xs - xs\n           */\n          constructor(xs) {\n              this.a = xs;    }\n      };"
    ]
};
var MATCH_DESCRIPTION_TEST = '^[A-Z][A-Za-z0-9\\s]*[.]$';
describe(rule, function test() {
    it('should pass when using valid JSDoc comments (default options)', function testValidDefault() {
        helper_1.makeTest(rule, scripts.validDefault, true);
    });
    it('should pass when using valid JSDoc comments (requireReturn: false)', function testValidNoRequireReturn() {
        helper_1.makeTest(rule, scripts.validNoRequireReturn, true, {
            rules: (_a = {},
                _a[rule] = [true, {
                        requireReturn: false
                    }],
                _a
            )
        });
        var _a;
    });
    it('should pass when using valid JSDoc comments (requireReturnDescription: false)', function testValidNoRequireReturnDescription() {
        helper_1.makeTest(rule, scripts.validNoRequireReturnDescription, true, {
            rules: (_a = {},
                _a[rule] = [true, {
                        requireReturnDescription: false
                    }],
                _a
            )
        });
        var _a;
    });
    it('should pass when using valid JSDoc comments (requireParamDescription: false)', function testValidNoRequireParamDescription() {
        helper_1.makeTest(rule, scripts.validNoRequireParamDescription, true, {
            rules: (_a = {},
                _a[rule] = [true, {
                        requireParamDescription: false
                    }],
                _a
            )
        });
        var _a;
    });
    it('should pass when using valid JSDoc comments (matchDescription: "regex")', function testValidMatchDescription() {
        helper_1.makeTest(rule, scripts.validMatchDescription, true, {
            rules: (_a = {},
                _a[rule] = [true, {
                        matchDescription: MATCH_DESCRIPTION_TEST
                    }],
                _a
            )
        });
        var _a;
    });
    it('should pass when using valid JSDoc comments (prefer: { return: "return" })', function testValidPrefer() {
        helper_1.makeTest(rule, scripts.validPrefer, true, {
            rules: (_a = {},
                _a[rule] = [true, {
                        prefer: {
                            'return': 'return'
                        }
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (default)', function testInvalidDefault() {
        helper_1.makeTest(rule, scripts.invalidDefault, false);
    });
    it('should fail when using invalid JSDoc comments (prefer: { return: "returns" })', function testInvalidPreferReturnReturns() {
        helper_1.makeTest(rule, scripts.invalidPreferReturnReturns, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        prefer: {
                            'return': 'returns'
                        }
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (prefer: { returns: "return" })', function testInvalidPreferReturnsReturn() {
        helper_1.makeTest(rule, scripts.invalidPreferReturnsReturn, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        prefer: {
                            'returns': 'return'
                        }
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (prefer: { argument: "arg" })', function testInvalidPreferArgumentArg() {
        helper_1.makeTest(rule, scripts.invalidPreferArgumentArg, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        prefer: {
                            'argument': 'arg'
                        }
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (requireReturn: false)', function testInvalidNoRequireReturn() {
        helper_1.makeTest(rule, scripts.invalidNoRequireReturn, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        requireReturn: false
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (matchDescription: "regex")', function testInvalidMatchDescription() {
        helper_1.makeTest(rule, scripts.invalidMatchDescription, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        matchDescription: MATCH_DESCRIPTION_TEST
                    }],
                _a
            )
        });
        var _a;
    });
    it('should fail when using invalid JSDoc comments (matchDescription: "regex", requireReturn: false)', function testInvalidNoRequireReturnAndMatchDescription() {
        helper_1.makeTest(rule, scripts.invalidNoRequireReturnAndMatchDescription, false, {
            rules: (_a = {},
                _a[rule] = [true, {
                        requireReturn: false,
                        matchDescription: MATCH_DESCRIPTION_TEST
                    }],
                _a
            )
        });
        var _a;
    });
});
