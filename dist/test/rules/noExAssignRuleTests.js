"use strict";
var helper_1 = require('./helper');
var rule = 'no-ex-assign';
var scripts = {
    valid: [
        'try { } catch (e) { three = 2 + 1; }',
        'try { } catch ({e}) { this.something = 2; }", ecmaFeatures: { destructuring: true } }',
        'function foo() { try { } catch (e) { return false; } }',
        "\n      export function bootstrapComponents(): void {\n        \"use strict\";\n\n        bootstrap((aurelia: Aurelia) => {\n          aurelia.use\n            .defaultBindingLanguage()\n            .defaultResources()\n            .developmentLogging();\n\n          aurelia.start().then(()  => aurelia.enhance({}, document.body));\n        });\n      }\n    "
    ],
    invalid: [
        'try { } catch (e) { e = 10; }',
        'try { } catch (ex) { ex = 10; }',
        'try { } catch (ex) { [ex] = []; }',
        'try { } catch (ex) { ({x: ex = 0}) = {}; }',
        'try { } catch ({message}) { message = 10; }'
    ]
};
describe(rule, function test() {
    it('should pass when not assigning a value to exception', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when assigning a value to exception', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});
