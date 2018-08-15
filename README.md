# rollup-plugin-template-string-optimize
template string optimize plugin for rollup

## Installation

    npm i rollup-plugin-template-string-optimize -D
    
## Usage

``` javascript
// rollup.config.js
import templateStringOptimize from 'rollup-plugin-template-string-optimize'

export default {
  input: 'main.js',
  plugins: [
    templateStringOptimize(),
    babel({
      presets: [['@babel/env', { modules: false }]]
    })
  ]
}
``` 

## Example

``` html
// ES6 template string HTML
const template = data => `
    <!-- section start -->
    <section>
        <h3>${data.title}</h3>
        <div>${data.date}</div>
        <dl>
            <dt>Coffee</dt>
            <dt>Black hot drink</dt>
            <dt>Milk</dt>
            <dd>
                <ul>
                    ${data.list.map((item) => `
                        <li>${item}</li>
                    `).join('')}
                </ul>
            </dd>
        </dl>
    </section>
    <!-- section end -->
`;
```

``` javascript
// source => babel
var template = function template(data) {
    return '\n    <!-- section start -->\n    <section>\n        <h3>' + data.title + '</h3>\n        <div>' + data.date + '</div>\n        <dl>\n            <dt>Coffee</dt>\n            <dt>Black hot drink</dt>\n            <dt>Milk</dt>\n            <dd>\n                <ul>\n                    ' + data.list.map(function (item) {
        return '\n                        <li>' + item + '</li>\n                    ';
    }).join('') + '\n                </ul>\n            </dd>\n        </dl>\n    </section>\n    <!-- section end -->\n';
};
```

``` javascript
// source => babel => template-string-optimize
var template = function template(data) {
    return '<section><h3>' + data.title + '</h3><div>' + data.date + '</div><dl><dt>Coffee</dt><dt>Black hot drink</dt><dt>Milk</dt><dd><ul>' + data.list.map(function (item) {
        return '<li>' + item + '</li>';
    }).join('') + '</ul></dd></dl></section>';
};
``` 

