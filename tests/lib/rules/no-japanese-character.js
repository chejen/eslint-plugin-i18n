/**
 * @fileoverview Rule to flag use of Japanese character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-japanese-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-japanese-character', rule, {
  valid: [
    'console.log("english");',
    {
      code: 'var str = `한국어`;',
      env: { es6: true },
    },
    '// 単一行コメント',
    '/* マルチラインのコメント */',
    {
      code: `
        import 識別子0 from 'xyz';
        識別子1 = { 識別子2: 0 };
        var 識別子3 = function 識別子4() {};
        this.識別子5 = 0;
        a[識別子6] = 0;
        export default 識別子7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'var value = a.b.c.d(\'文字列\'); var tpl = <Hello>{dic(\'文字列\')}</Hello>;',
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
      code: 'var value1 = dic(`テンプレートリテラル`), value2 = i18n.t(`テンプレートリテラル`), value3 = x.y.z(`テンプレートリテラル`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("エラー" + "コード");
        var value2 = i18n.t(isValid ? "有効" : "無効");
        var value3 = i18n.t(key || "既定値");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },
  ],
  invalid: [
    {
      code: 'var tpl = <Hello title=\'こんにちは\'>コンポーネント</Hello>',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Japanese characters: \'こんにちは\'', type: 'Literal',
      }, {
        message: 'Using Japanese characters: コンポーネント', type: 'JSXText',
      }],
    },
    {
      code: 'var func = function(v){return v;}; var tpl = <Hello>{func(\'関数\')}</Hello>;',
      options: [{
        excludeArgsForFunctions: ['dic'],
      }],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Japanese characters: \'関数\'', type: 'Literal',
      }],
    },
    {
      code: 'var tl = `テンプレート文字列`',
      env: { es6: true },
      errors: [{
        message: 'Using Japanese characters: テンプレート文字列',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var tl = func(`テンプレート文字列`)',
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['dic'],
      }],
      errors: [{
        message: 'Using Japanese characters: テンプレート文字列',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'console.log(\'english\' + \'日本語\');',
      errors: [{ message: 'Using Japanese characters: \'日本語\'', type: 'Literal' }],
    },
    {
      code: 'var str = \'ストリング\'.substr(0, 1);',
      errors: [{ message: 'Using Japanese characters: \'ストリング\'', type: 'Literal' }],
    },
    {
      code: 'var obj = { \'key\': \'オブジェクト\' };',
      errors: [{ message: 'Using Japanese characters: \'オブジェクト\'', type: 'Literal' }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'関数\');',
      errors: [{ message: 'Using Japanese characters: \'関数\'', type: 'Literal' }],
    },
    {
      code: 'var ary = ["配列"];',
      errors: [{ message: 'Using Japanese characters: "配列"', type: 'Literal' }],
    },
    {
      code: `
        import 識別子0 from 'xyz';
        識別子1 = { 識別子2: 0 };
        var 識別子3 = function 識別子4() {};
        this.識別子5 = 0;
        a[識別子6] = 0;
        export default 識別子7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
      errors: [{
        message: 'Using Japanese characters: 識別子0',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子1',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子2',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子3',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子4',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子5',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子6',
        type: 'Identifier',
      }, {
        message: 'Using Japanese characters: 識別子7',
        type: 'Identifier',
      }],
    },
    {
      code: `
        // 単一行コメント
        /* マルチラインのコメント */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Japanese characters: 単一行コメント',
        type: 'Line',
      }, {
        message: 'Using Japanese characters: マルチラインのコメント',
        type: 'Block',
      }],
    },
  ],
});
