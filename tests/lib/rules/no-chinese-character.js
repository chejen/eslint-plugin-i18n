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
    // No target language in code.
    'console.log("english");',
    {
      code: 'var str = `한국어`;',
      env: { es6: true },
    },

    // Comments shouldn't be flagged.
    '// 注解',
    '/* 注释 */',

    // Identifiers shouldn't be flagged.
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

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'字串\'); var tpl = <Hello>{dic(\'函式\')}</Hello>;',
      options: [{
        excludeArgsForFunctions: ['a.b.c.d', 'dic'],
      }],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: 'var value1 = dic(`樣板字串`); var value2 = i18n.t("字符串"); var value3 = w.x.y.z("字符串")',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'w.x.y.z'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("模板" + "字符串");
        var value2 = i18n.t(isValid ? "模板" : "字符串");
        var value3 = i18n.t(key || "默认值");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },
  ],
  invalid: [
    // General
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
      errors: [{ message: 'Using Chinese characters: \'繁體/*字*/\'', type: 'Literal' }],
    },
    {
      code: 'console.log("english" && "//简体字");',
      errors: [{ message: 'Using Chinese characters: "//简体字"', type: 'Literal' }],
    },
    {
      code: 'var str = \'變數\'.substr(0, 1);',
      errors: [{ message: 'Using Chinese characters: \'變數\'', type: 'Literal' }],
    },
    {
      code: 'var str = "变量";',
      errors: [{ message: 'Using Chinese characters: "变量"', type: 'Literal' }],
    },
    {
      code: 'var obj = { \'key\': \'物件\' };',
      errors: [{ message: 'Using Chinese characters: \'物件\'', type: 'Literal' }],
    },
    {
      code: 'var obj = { "对象": "value" };',
      errors: [{ message: 'Using Chinese characters: "对象"', type: 'Literal' }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'函式\');',
      errors: [{ message: 'Using Chinese characters: \'函式\'', type: 'Literal' }],
    },
    {
      code: 'function f(v){return "返回值";}',
      errors: [{ message: 'Using Chinese characters: "返回值"', type: 'Literal' }],
    },
    {
      code: 'var ary = ["数组"];',
      errors: [{ message: 'Using Chinese characters: "数组"', type: 'Literal' }],
    },

    // JSX
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

    // Special case: lint the comments as `includeComment` option enabled.
    {
      code: `
        // 注解0
        /* 注释1 */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Chinese characters: 注解0',
        type: 'Line',
      }, {
        message: 'Using Chinese characters: 注释1',
        type: 'Block',
      }],
    },

    // Special case: lint identifiers as `includeIdentifier` option enabled.
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

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`樣板字串`)',
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      errors: [{
        message: 'Using Chinese characters: 樣板字串',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'字串\'); var tpl = <Hello>{x.y.z(\'函式\')}</Hello>;',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Chinese characters: \'字串\'', type: 'Literal',
      }, {
        message: 'Using Chinese characters: \'函式\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('模板' + '字符串');
        var value2 = i18n.t(isValid ? "模板" : "字符串");
        var value3 = i18n.t(key || "默认值");
      `,
      errors: [{
        message: 'Using Chinese characters: \'模板\'', type: 'Literal',
      }, {
        message: 'Using Chinese characters: \'字符串\'', type: 'Literal',
      }, {
        message: 'Using Chinese characters: "模板"', type: 'Literal',
      }, {
        message: 'Using Chinese characters: "字符串"', type: 'Literal',
      }, {
        message: 'Using Chinese characters: "默认值"', type: 'Literal',
      }],
    },
  ],
});
