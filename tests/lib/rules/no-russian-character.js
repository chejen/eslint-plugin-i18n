/**
 * @fileoverview Rule to flag use of Russian character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-russian-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-russian-character', rule, {
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
    '// Комментарий, занимающий одну строку.',
    '/* Комментарий, занимающий несколько строк. */',

    // Identifiers shouldn't be flagged.
    {
      code: `
        import Идентификатор0 from 'xyz';
        Идентификатор1 = { Идентификатор2: 0 };
        var Идентификатор3 = function Идентификатор4() {};
        this.Идентификатор5 = 0;
        a[Идентификатор6] = 0;
        export default Идентификатор7;
      `,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'Строки\'); var tpl = <Hello>{dic(\'Строки\')}</Hello>;',
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
      code: 'var value1 = dic(`Шаблонные строки`), value2 = i18n.t(`Шаблонные строки`), value3 = x.y.z(`Шаблонные строки`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("код" + "ошибки");
        var value2 = i18n.t(isValid ? "действительный" : "неверный");
        var value3 = i18n.t(key || "значение по умолчанию");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },

    // Special case: bypass module related checks
    {
      code: 'require(`${basePath}/компоненты.jsx`); require(basePath + "Пути/component.jsx")',
      options: [{
        excludeArgsForFunctions: ['require'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `import 'Модули'; import { doSomething } from 'Модули/api';`,
      options: [{
        excludeModuleImports: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'import(`${basePath}/Пути/module.js`); import(basePath + "/компоненты.jsx").then(cmp => {});',
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
          await import(token ? './Модулиa.js' : './Модулиb.js');
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
      code: 'var tl = `Шаблонные строки`',
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Russian characters: Шаблонные строки',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'console.log(\'english\' + \'Русский\');',
      errors: [{
        message: 'Using Russian characters: \'Русский\'',
        type: 'Literal',
      }],
    },
    {
      code: 'var str = \'строковое\'.substr(0, 1);',
      errors: [{
        message: 'Using Russian characters: \'строковое\'',
        type: 'Literal',
      }],
    },
    {
      code: 'var obj = { \'key\': \'объектов\' };',
      errors: [{
        message: 'Using Russian characters: \'объектов\'',
        type: 'Literal',
      }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'Функции\');',
      errors: [{
        message: 'Using Russian characters: \'Функции\'',
        type: 'Literal',
      }],
    },
    {
      code: 'var ary = ["массивы"];',
      errors: [{
        message: 'Using Russian characters: "массивы"',
        type: 'Literal',
      }],
    },

    // JSX
    {
      code: 'var tpl = <Hello title=\'Привет\'>компонентов</Hello>',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Russian characters: \'Привет\'', type: 'Literal',
      }, {
        message: 'Using Russian characters: компонентов', type: 'JSXText',
      }],
    },

    // Special case: lint the comments as `includeComment` option enabled.
    {
      code: `
        // Комментарий, занимающий одну строку.
        /* Комментарий, занимающий несколько строк. */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Russian characters: Комментарий, занимающий одну строку.',
        type: 'Line',
      }, {
        message: 'Using Russian characters: Комментарий, занимающий несколько строк.',
        type: 'Block',
      }],
    },

    // Special case: lint identifiers as `includeIdentifier` option enabled.
    {
      // с is cyrillic
      code: `
        import с0 from 'xyz';
        с1 = { с2: 0 };
        var с3 = function с4() {};
        this.с5 = 0;
        a[с6] = 0;
        export default с7;
      `,
      options: [{
        includeIdentifier: true,
      }],
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Russian characters: с0',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с1',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с2',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с3',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с4',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с5',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с6',
        type: 'Identifier',
      }, {
        message: 'Using Russian characters: с7',
        type: 'Identifier',
      }],
    },

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`Шаблонные строки`)',
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Russian characters: Шаблонные строки',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'Строки\'); var tpl = <Hello>{dic(\'Строки\')}</Hello>;',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [{
        message: 'Using Russian characters: \'Строки\'', type: 'Literal',
      }, {
        message: 'Using Russian characters: \'Строки\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('код' + 'ошибки');
        var value2 = i18n.t(isValid ? "действительный" : "неверный");
        var value3 = i18n.t(key || "значение по умолчанию");
      `,
      errors: [{
        message: 'Using Russian characters: \'код\'', type: 'Literal',
      }, {
        message: 'Using Russian characters: \'ошибки\'', type: 'Literal',
      }, {
        message: 'Using Russian characters: "действительный"', type: 'Literal',
      }, {
        message: 'Using Russian characters: "неверный"', type: 'Literal',
      }, {
        message: 'Using Russian characters: "значение по умолчанию"', type: 'Literal',
      }],
    },

    // Path or module names would be flagged by default.
    {
      code: 'require(`${basePath}/компоненты.jsx`); require(basePath + "Пути/component.jsx");',
      languageOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Russian characters: /компоненты.jsx',
      }, {
        message: 'Using Russian characters: "Пути/component.jsx"',
      }],
    },
    {
      code: `import "Модули"; import { doSomething } from 'Модули/api'`,
      languageOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Russian characters: "Модули"',
      }, {
        message: 'Using Russian characters: \'Модули/api\'',
      }],
    },
    {
      code: 'import(`${basePath}/Пути/module.js`); import(basePath + "/компоненты.jsx").then(cmp => {});',
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Russian characters: /Пути/module.js',
      }, {
        message: 'Using Russian characters: "/компоненты.jsx"',
      }],
    },
    {
      code: `
        async function demo() {
          await import(token ? './Модулиa.js' : './Модулиb.js');
        }
      `,
      languageOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Russian characters: \'./Модулиa.js\'',
      }, {
        message: 'Using Russian characters: \'./Модулиb.js\'',
      }],
    },
  ],
});
