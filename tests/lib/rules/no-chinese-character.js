/**
 * @fileoverview Rule to flag use of Chinese character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-chinese-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-chinese-character', rule, {
  valid: [
    'console.log("english");',
    {
      code: 'var str = `한국어`;',
      env: { es6: true },
    },
    '// 注解',
    '/* 注释 */',
    {
      code: `
        import 标识符0 from 'xyz';
        标识符1 = { 标识符2: 0 };
        var 标识符3 = function 标识符4() {};
        this.标识符5 = 0;
        a[标识符6] = 0;
        export default 标识符7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
  ],
  invalid: [
    {
      code: 'var tpl = <Hello title=\'你好\'>组件</Hello>',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Chinese characters: \'你好\'', type: 'Literal',
      }, {
        message: 'Using Chinese characters: 组件', type: 'JSXText',
      }],
    },
    {
      code: 'var str = `樣板字串`; console.log(`${str}、模板字符串`);',
      env: { es6: true },
      errors: [{
        message: 'Using Chinese characters: 樣板字串', type: 'TemplateElement',
      }, {
        message: 'Using Chinese characters: 、模板字符串', type: 'TemplateElement',
      }],
    },
    {
      code: 'console.log(\'english\' + \'繁體/*字*/\');',
      errors: [{ message: 'Using Chinese characters: \'繁體/*字*/\'', type: 'Literal' }]
    },
    {
      code: 'console.log("english" && "//简体字");',
      errors: [{ message: 'Using Chinese characters: "//简体字"', type: 'Literal' }]
    },
    {
      code: 'var str = \'變數\'.substr(0, 1);',
      errors: [{ message: 'Using Chinese characters: \'變數\'', type: 'Literal' }]
    },
    {
      code: 'var str = "变量";',
      errors: [{ message: 'Using Chinese characters: "变量"', type: 'Literal' }]
    },
    {
      code: 'var obj = { \'key\': \'物件\' };',
      errors: [{ message: 'Using Chinese characters: \'物件\'', type: 'Literal' }]
    },
    {
      code: 'var obj = { "对象": "value" };',
      errors: [{ message: 'Using Chinese characters: "对象"', type: 'Literal' }]
    },
    {
      code: 'var func = function(v){return v;}; func(\'函式\');',
      errors: [{ message: 'Using Chinese characters: \'函式\'', type: 'Literal' }]
    },
    {
      code: 'function f(v){return "返回值";}',
      errors: [{ message: 'Using Chinese characters: "返回值"', type: 'Literal' }]
    },
    {
      code: 'var ary = ["数组"];',
      errors: [{ message: 'Using Chinese characters: "数组"', type: 'Literal' }]
    },
    {
      code: `
        import 標識符0 from 'xyz';
        標識符1 = { 標識符2: 0 };
        var 標識符3 = function 標識符4() {};
        this.標識符5 = 0;
        a[標識符6] = 0;
        export default 標識符7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
      errors: [{
        message: 'Using Chinese characters: 標識符0',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符1',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符2',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符3',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符4',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符5',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符6',
        type: 'Identifier',
      }, {
        message: 'Using Chinese characters: 標識符7',
        type: 'Identifier',
      }],
    },
  ],
});
