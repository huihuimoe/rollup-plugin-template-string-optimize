import acorn from 'acorn';
import escodegen from 'escodegen';
const isObject = (item) => Object.prototype.toString.call(item) === '[object Object]';
const acornOptions = {
    sourceType: 'module'
};
function traverse(input) {
    if (Array.isArray(input)) {
        input.forEach(traverse);
    }
    else if (isObject(input)) {
        for (let key in input) {
            if (typeof input[key] === 'string') {
                input[key] = input[key].replace(/(\n\s+)/g, '');
            }
            else {
                traverse(input[key]);
            }
        }
    }
}
export default function (options) {
    return {
        name: 'template-string-optimize',
        transform(code) {
            const tree = acorn.parse(code, acornOptions);
            traverse(tree);
            return escodegen.generate(tree);
        }
    };
}
