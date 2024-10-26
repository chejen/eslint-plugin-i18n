/**
 * @fileoverview Rule to flag use of Korean character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-korean-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-korean-character', rule, {
  valid: [
    // No target language in code.
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      languageOptions: {
        ecmaVersion: 6,
      },
    },

    // Comments shouldn't be flagged.
    '// 한 줄 댓글',
    '/* 멀티 라인 댓글 */',

    // Identifiers shouldn't be flagged.
    {
      code: `
        import 식별자0 from 'xyz';
        식별자1 = { 식별자2: 0 };
        var 식별자3 = function 식별자4() {};
        this.식별자5 = 0;
        a[식별자6] = 0;
        export default 식별자7;
      `,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'문자열\'); var tpl = <Hello>{dic(\'문자열\')}</Hello>;',
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
      code: 'var value1 = dic(`템플릿 리터럴`), value2 = i18n.t(`템플릿 리터럴`), value3 = x.y.z(`템플릿 리터럴`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("오류" + "코드");
        var value2 = i18n.t(isValid ? "유효한" : "유효하지 않은");
        var value3 = i18n.t(key || "기본값");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },

    // Special case: bypass module related checks
    {
      code: 'require(`${basePath}/컴포넌트.jsx`); require(basePath + "패스/component.jsx")',
      options: [{
        excludeArgsForFunctions: ['require'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `import '모듈'; import { doSomething } from '모듈/api';`,
      options: [{
        excludeModuleImports: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'import(`${basePath}/패스/module.js`); import(basePath + "/컴포넌트.jsx").then(cmp => {});',
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
          await import(token ? './모듈a.js' : './모듈b.js');
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
      code: 'var tl = `템플릿 문자열`',
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{ message: 'Using Korean characters: 템플릿 문자열', type: 'TemplateElement' }],
    },
    {
      code: 'console.log(\'english\' + \'한국어\');',
      errors: [{ message: 'Using Korean characters: \'한국어\'', type: 'Literal' }],
    },
    {
      code: 'var str = \'문자열\'.substr(0, 1);',
      errors: [{ message: 'Using Korean characters: \'문자열\'', type: 'Literal' }],
    },
    {
      code: 'var obj = { \'key\': \'사물\' };',
      errors: [{ message: 'Using Korean characters: \'사물\'', type: 'Literal' }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'함수\');',
      errors: [{ message: 'Using Korean characters: \'함수\'', type: 'Literal' }],
    },
    {
      code: 'var ary = ["배열"];',
      errors: [{ message: 'Using Korean characters: "배열"', type: 'Literal' }],
    },

    // JSX
    {
      code: 'var tpl = <Hello title=\'안녕하세요\'>컴포넌트</Hello>',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Korean characters: \'안녕하세요\'', type: 'Literal',
      }, {
        message: 'Using Korean characters: 컴포넌트', type: 'JSXText',
      }],
    },

    // Special case: lint the comments as `includeComment` option enabled.
    {
      code: `
        // 한 줄 댓글
        /* 멀티 라인 댓글 */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Korean characters: 한 줄 댓글',
        type: 'Line',
      }, {
        message: 'Using Korean characters: 멀티 라인 댓글',
        type: 'Block',
      }],
    },

    // Special case: lint identifiers as `includeIdentifier` option enabled.
    {
      code: `
        import 식별자0 from 'xyz';
        식별자1 = { 식별자2: 0 };
        var 식별자3 = function 식별자4() {};
        this.식별자5 = 0;
        a[식별자6] = 0;
        export default 식별자7;
      `,
      options: [{
        includeIdentifier: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Korean characters: 식별자0',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자1',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자2',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자3',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자4',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자5',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자6',
        type: 'Identifier',
      }, {
        message: 'Using Korean characters: 식별자7',
        type: 'Identifier',
      }],
    },

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`템플릿 문자열`)',
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Korean characters: 템플릿 문자열',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'문자열\'); var tpl = <Hello>{dic(\'문자열\')}</Hello>;',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Korean characters: \'문자열\'', type: 'Literal',
      }, {
        message: 'Using Korean characters: \'문자열\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('오류' + '코드');
        var value2 = i18n.t(isValid ? "유효한" : "유효하지 않은");
        var value3 = i18n.t(key || "기본값");
      `,
      errors: [{
        message: 'Using Korean characters: \'오류\'', type: 'Literal',
      }, {
        message: 'Using Korean characters: \'코드\'', type: 'Literal',
      }, {
        message: 'Using Korean characters: "유효한"', type: 'Literal',
      }, {
        message: 'Using Korean characters: "유효하지 않은"', type: 'Literal',
      }, {
        message: 'Using Korean characters: "기본값"', type: 'Literal',
      }],
    },

    // Path or module names would be flagged by default.
    {
      code: 'require(`${basePath}/컴포넌트.jsx`); require(basePath + "패스/component.jsx");',
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Korean characters: /컴포넌트.jsx',
      }, {
        message: 'Using Korean characters: "패스/component.jsx"',
      }],
    },
    {
      code: `import "모듈"; import { doSomething } from '모듈/api'`,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Korean characters: "모듈"',
      }, {
        message: 'Using Korean characters: \'모듈/api\'',
      }],
    },
    {
      code: 'import(`${basePath}/패스/module.js`); import(basePath + "/컴포넌트.jsx").then(cmp => {});',
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Korean characters: /패스/module.js',
      }, {
        message: 'Using Korean characters: "/컴포넌트.jsx"',
      }],
    },
    {
      code: `
        async function demo() {
          await import(token ? './모듈a.js' : './모듈b.js');
        }
      `,
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Korean characters: \'./모듈a.js\'',
      }, {
        message: 'Using Korean characters: \'./모듈b.js\'',
      }],
    },
  ],
});
