import acorn = require('acorn')
import escodegen = require('escodegen')

const isObject = (item: any): boolean =>
  Object.prototype.toString.call(item) === '[object Object]'

const acornOptions = {
  sourceType: 'module'
} as acorn.Options

function traverse(input: any): void {
  if (Array.isArray(input)) {
    input.forEach(traverse)
  } else if (isObject(input)) {
    for (let key in input) {
      if (typeof input[key] === 'string') {
        input[key] = input[key].replace(/(\n\s+)/g, '')
      } else {
        traverse(input[key])
      }
    }
  }
}

export default function(options: never) {
  return {
    name: 'template-string-optimize',
    transform(code: string) {
      const tree = acorn.parse(code, acornOptions)
      traverse(tree)
      return escodegen.generate(tree)
    }
  }
}
