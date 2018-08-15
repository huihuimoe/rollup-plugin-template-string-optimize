"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var acorn = require("acorn");
var escodegen = require("escodegen");
var isObject = function (item) {
    return Object.prototype.toString.call(item) === '[object Object]';
};
var acornOptions = {
    sourceType: 'module'
};
function traverse(input) {
    if (Array.isArray(input)) {
        input.forEach(traverse);
    }
    else if (isObject(input)) {
        for (var key in input) {
            if (typeof input[key] === 'string') {
                input[key] = input[key].replace(/(\n\s+)/g, '');
            }
            else {
                traverse(input[key]);
            }
        }
    }
}
function default_1(options) {
    return {
        name: 'template-string-optimize',
        transform: function (code) {
            var tree = acorn.parse(code, acornOptions);
            traverse(tree);
            return escodegen.generate(tree, {
                sourceMapWithCode: true
            });
        }
    };
}
exports.default = default_1;
