"use strict";
var helper_1 = require('./helper');
var rule = 'brace-style';
var scripts = {
    onetbs: {
        valid: [
            "function foo() {\n        return true;\n      }",
            "if (foo) {\n        bar();\n      }",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }",
            "try {\n        somethingRisky();\n      } catch(e) {\n        handleError();\n      }",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }",
            "if (foo) {\n        bar(); \n      } else { baz(); }"
        ]
    },
    stroustrup: {
        valid: [
            "function foo() {\n        return true;\n      }",
            "if (foo) {\n        bar();\n      }",
            "if (foo) {\n        bar();\n      }\n      else {\n        baz();\n      }",
            "try {\n        somethingRisky();\n      }\n      catch(e) {\n        handleError();\n      }",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }"
        ]
    },
    allman: {
        valid: [
            "function foo()\n      {\n        return true;\n      }",
            "if (foo)\n      {\n        bar();\n      }",
            "if (foo)\n      {\n        bar();\n      }\n      else\n      {\n        baz();\n      }",
            "try\n      {\n        somethingRisky();\n      }\n      catch(e)\n      {\n        handleError();\n      }",
            "if (foo) bar();\n      else if (baz) boom();"
        ],
        invalid: [
            "function foo() {\n        return true;\n      }",
            "if (foo)\n      {\n        bar(); }",
            "try\n      {\n        somethingRisky();\n      } catch(e)\n      {\n        handleError();\n      }",
            "if (foo) {\n        bar();\n      } else {\n        baz();\n      }"
        ]
    },
    allowSingleLine: {
        onetbs: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); } else { baz(); }",
                "try { somethingRisky(); } catch(e) { handleError(); }",
                "if (foo) { \n          bar();    \n        } else { baz(); }",
                "try { \n          foo();\n        } catch(e) { bar(); }"
            ]
        },
        stroustrup: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); }\n        else { baz(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); }",
                "if (foo) { \n          bar();\n        } \n        else { baz(); }",
                "try { \n          foo();\n        } \n        catch(e) { bar(); }"
            ]
        },
        allman: {
            valid: [
                "function nop() { return; }",
                "if (foo) { bar(); }",
                "if (foo) { bar(); }\n        else { baz(); }",
                "try { somethingRisky(); }\n        catch(e) { handleError(); }",
                "if (foo) \n        { \n          bar();\n        } else { baz(); }",
                "try  \n        { \n          foo();\n        } \n        catch(e) { bar(); }"
            ]
        }
    }
};
describe(rule, function test() {
    var onetbsConfig = { rules: { 'brace-style': [true, '1tbs'] } };
    var stroustrupConfig = { rules: { 'brace-style': [true, 'stroustrup'] } };
    var allmanConfig = { rules: { 'brace-style': [true, 'allman'] } };
    var onetbsConfigWithException = { rules: { 'brace-style': [true, 'stroustrup', { allowSingleLine: true }] } };
    var stroustrupConfigWithException = { rules: { 'brace-style': [true, '1tbs', { allowSingleLine: true }] } };
    var allmanConfigWithException = { rules: { 'brace-style': [true, 'allman', { allowSingleLine: true }] } };
    it('should pass when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.onetbs.valid, true, onetbsConfig);
    });
    it('should fail when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.onetbs.invalid, false, onetbsConfig);
    });
    it('should pass when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.stroustrup.valid, true, stroustrupConfig);
    });
    it('should fail when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.stroustrup.invalid, false, stroustrupConfig);
    });
    it('should pass when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allman.valid, true, allmanConfig);
    });
    it('should fail when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allman.invalid, false, allmanConfig);
    });
    it('should pass when "1tbs" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.onetbs.valid, true, onetbsConfigWithException);
    });
    it('should pass when "stroustrup" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.stroustrup.valid, true, stroustrupConfigWithException);
    });
    it('should pass when "allman" and "allowSingleLine" is true', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.allman.valid, true, allmanConfigWithException);
    });
    it('should fail when "1tbs"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.onetbs.valid, false, onetbsConfig);
    });
    it('should fail when "stroustrup"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.stroustrup.valid, false, stroustrupConfig);
    });
    it('should fail when "allman"', function testVariables() {
        helper_1.makeTest(rule, scripts.allowSingleLine.allman.valid, false, allmanConfig);
    });
});
