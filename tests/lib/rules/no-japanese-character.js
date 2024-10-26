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
    // No target language in code.
    'console.log("english");',
    {
      code: 'var str = `한국어`;',
      languageOptions: {
        ecmaVersion: 6,
      },
    },

    // Comments shouldn't be flagged.
    '// 単一行コメント',
    '/* マルチラインのコメント */',

    // Identifiers shouldn't be flagged.
    {
      code: `
        import 識別子0 from 'xyz';
        識別子1 = { 識別子2: 0 };
        var 識別子3 = function 識別子4() {};
        this.識別子5 = 0;
        a[識別子6] = 0;
        export default 識別子7;
      `,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'文字列\'); var tpl = <Hello>{dic(\'文字列\')}</Hello>;',
      options: [{
        excludeArgsForFunctions: ['a.b.c.d', 'dic'],
      }],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
    {
      code: 'var value1 = dic(`テンプレートリテラル`), value2 = i18n.t(`テンプレートリテラル`), value3 = x.y.z(`テンプレートリテラル`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      languageOptions: {
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

    // Special case: bypass module related checks
    {
      code: 'require(`${basePath}/コンポーネント.jsx`); require(basePath + "路径/component.jsx")',
      options: [{
        excludeArgsForFunctions: ['require'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `import 'モジュール'; import { doSomething } from 'モジュール/api';`,
      options: [{
        excludeModuleImports: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'import(`${basePath}/パス/module.js`); import(basePath + "/コンポーネント.jsx").then(cmp => {});',
      options: [{
        excludeModuleImports: true,
      }],
      languageOptions: {
        ecmaVersion: 11,
      },
    },
    {
      code: `
        async function demo() {
          await import(token ? './モジュール-a.js' : './モジュール-b.js');
        }
      `,
      options: [{
        excludeModuleImports: true,
      }],
      languageOptions: {
        ecmaVersion: 11,
      },
    },
  ],

  invalid: [
    // General
    {
      code: 'var tl = `テンプレート文字列`',
      languageOptions: {
        ecmaVersion: 6,
      },
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

    // JSX
    {
      code: 'var tpl = <Hello title=\'こんにちは\'>コンポーネント</Hello>',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Japanese characters: \'こんにちは\'', type: 'Literal',
      }, {
        message: 'Using Japanese characters: コンポーネント', type: 'JSXText',
      }],
    },

    // Special case: lint the comments as `includeComment` option enabled.
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

    // Special case: lint identifiers as `includeIdentifier` option enabled.
    {
      code: `
        import 識別子0 from 'xyz';
        識別子1 = { 識別子2: 0 };
        var 識別子3 = function 識別子4() {};
        this.識別子5 = 0;
        a[識別子6] = 0;
        export default 識別子7;
      `,
      options: [{
        includeIdentifier: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
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

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`テンプレート文字列`)',
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Japanese characters: テンプレート文字列',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'関数\'); var tpl = <Hello>{dic(\'関数\')}</Hello>;',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Japanese characters: \'関数\'', type: 'Literal',
      }, {
        message: 'Using Japanese characters: \'関数\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('エラー' + 'コード');
        var value2 = i18n.t(isValid ? "有効" : "無効");
        var value3 = i18n.t(key || "既定値");
      `,
      errors: [{
        message: 'Using Japanese characters: \'エラー\'', type: 'Literal',
      }, {
        message: 'Using Japanese characters: \'コード\'', type: 'Literal',
      }, {
        message: 'Using Japanese characters: "有効"', type: 'Literal',
      }, {
        message: 'Using Japanese characters: "無効"', type: 'Literal',
      }, {
        message: 'Using Japanese characters: "既定値"', type: 'Literal',
      }],
    },

    // Path or module names would be flagged by default.
    {
      code: 'require(`${basePath}/コンポーネント.jsx`); require(basePath + "路径/component.jsx");',
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Japanese characters: /コンポーネント.jsx',
      }, {
        message: 'Using Japanese characters: "路径/component.jsx"',
      }],
    },
    {
      code: `import "モジュール"; import { doSomething } from 'モジュール/api'`,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Japanese characters: "モジュール"',
      }, {
        message: 'Using Japanese characters: \'モジュール/api\'',
      }],
    },
    {
      code: 'import(`${basePath}/パス/module.js`); import(basePath + "/コンポーネント.jsx").then(cmp => {});',
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Japanese characters: /パス/module.js',
      }, {
        message: 'Using Japanese characters: "/コンポーネント.jsx"',
      }],
    },
    {
      code: `
        async function demo() {
          await import(token ? './モジュール-a.js' : './モジュール-b.js');
        }
      `,
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Japanese characters: \'./モジュール-a.js\'',
      }, {
        message: 'Using Japanese characters: \'./モジュール-b.js\'',
      }],
    },
  ],
});
