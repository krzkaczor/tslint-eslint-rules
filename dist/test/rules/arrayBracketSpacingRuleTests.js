"use strict";
var helper_1 = require('./helper');
var rule = 'array-bracket-spacing';
var scripts = {
    always: {
        valid: [
            "var arr = [ 'foo', bar' ];",
            "var [ x, y ] = z;",
            "var arr = [];",
            "var arr = [ ];",
            "var arr = [ 'foo', 'bar', 'baz' ];",
            "var arr = [ [ 'foo' ], 'bar', 'baz' ];",
            "var arr = [ 'foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar' ];",
            "var arr = [\n        'foo',\n        'bar',\n        'baz'\n      ];",
            "var [ x, y ] = z;",
            "var [ x,y ] = z;",
            "var [ x, ...y ] = z;",
            "var [ ,,x, ] = z;"
        ],
        invalid: [
            "var arr = ['foo', 'bar'];",
            "var arr = ['foo', 'bar' ];",
            "var arr = [ ['foo'], 'bar' ];",
            "var arr = ['foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar'];",
            "var [x, y] = z;",
            "var [x,y] = z;",
            "var [x, ...y] = z;",
            "var [,,x,] = z;"
        ]
    },
    never: {
        valid: [
            "var arr = [];",
            "var arr = ['foo', 'bar', 'baz'];",
            "var arr = [['foo'], 'bar', 'baz'];",
            "var arr = [\n        'foo',\n        'bar',\n        'baz'\n      ];",
            "var arr = ['foo',\n        'bar'\n      ];",
            "var arr = [\n        'foo',\n        'bar'];",
            "var [x, y] = z;",
            "var [x,y] = z;",
            "var [x, ...y] = z;",
            "var [,,x,] = z;"
        ],
        invalid: [
            "var arr = [ 'foo', 'bar' ];",
            "var arr = ['foo', 'bar' ];",
            "var arr = [ ['foo'], 'bar'];",
            "var arr = [[ 'foo' ], 'bar'];",
            "var arr = [ 'foo',\n        'bar'\n      ];",
            "var [ x, y ] = z;",
            "var [ x,y ] = z;",
            "var [ x, ...y ] = z;",
            "var [ ,,x, ] = z;",
            "var arr = [ ];"
        ]
    },
    exceptions: {
        always: {
            singleValue: {
                valid: [
                    "var foo = ['foo'];",
                    "var foo = [1];",
                    "var foo = [[ 1, 1 ]];",
                    "var foo = [{ 'foo': 'bar' }];"
                ],
                invalid: [
                    "var foo = [ 'foo' ];",
                    "var foo = [ 'foo'];",
                    "var foo = ['foo' ];",
                    "var foo = [ 1 ];",
                    "var foo = [ 1];",
                    "var foo = [1 ];",
                    "var foo = [ [ 1, 2 ] ];'",
                    "var foo = [ { 'foo': 'bar' } ];"
                ]
            },
            objectsInArrays: {
                valid: [
                    "var arr = [{ 'foo': 'bar' }];",
                    "var arr = [{\n            'foo': 'bar'\n          }];"
                ],
                invalid: [
                    "var arr = [ { 'foo': 'bar' } ];",
                    "var arr = [ {\n            'foo': 'bar'\n          } ]"
                ]
            },
            arraysInArrays: {
                valid: [
                    "var arr = [[ 1, 2 ], 2, 3, 4 ];",
                    "var arr = [[ 1, 2 ], 2, [ 3, 4 ]];"
                ],
                invalid: [
                    "var arr = [ [ 1, 2 ], 2, 3, 4 ];",
                    "var arr = [ [ 1, 2 ], 2, [ 3, 4 ] ];"
                ]
            }
        }
    }
};
describe(rule, function test() {
    var alwaysConfig = { rules: { 'array-bracket-spacing': [true, 'always'] } };
    var neverConfig = { rules: { 'array-bracket-spacing': [true, 'never'] } };
    it('should pass when "always"', function testVariables() {
        helper_1.makeTest(rule, scripts.always.valid, true, alwaysConfig);
    });
    it('should fail when "always"', function testVariables() {
        helper_1.makeTest(rule, scripts.always.invalid, false, alwaysConfig);
    });
    it('should pass when "never"', function testVariables() {
        helper_1.makeTest(rule, scripts.never.valid, true, neverConfig);
    });
    it('should fail when "never"', function testVariables() {
        helper_1.makeTest(rule, scripts.never.invalid, false, neverConfig);
    });
    var singleValueExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { singleValue: false }
            ]
        }
    };
    it('should pass when "always" with the singleValue exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.singleValue.valid, true, singleValueExceptionConfig);
    });
    it('should fail when "always" with the singleValue exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.singleValue.invalid, false, singleValueExceptionConfig);
    });
    var objectsInArraysExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { objectsInArrays: false }
            ]
        }
    };
    it('should pass when "always" with the objectsInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.objectsInArrays.valid, true, objectsInArraysExceptionConfig);
    });
    it('should fail when "always" with the objectsInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.objectsInArrays.invalid, false, objectsInArraysExceptionConfig);
    });
    var arraysInArraysExceptionConfig = {
        rules: {
            'array-bracket-spacing': [
                true,
                'always',
                { arraysInArrays: false }
            ]
        }
    };
    it('should pass when "always" with the arraysInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.arraysInArrays.valid, true, arraysInArraysExceptionConfig);
    });
    it('should fail when "always" with the arraysInArrays exception', function testVariables() {
        helper_1.makeTest(rule, scripts.exceptions.always.arraysInArrays.invalid, false, arraysInArraysExceptionConfig);
    });
});
