import templateStringOptimize from 'rollup-plugin-template-string-optimize'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: './test/src/test.js',
    output: {
      file: './test/dist/test.js',
      format: 'iife'
    },
    plugins: [
      babel({
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  },
  {
    input: './test/src/test.js',
    output: {
      file: './test/dist/test.min.js',
      format: 'iife'
    },
    plugins: [
      templateStringOptimize(),
      babel({
        presets: [['@babel/env', { modules: false }]]
      })
    ]
  }
]
