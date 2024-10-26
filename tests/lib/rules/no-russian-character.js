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
      env: { es6: true },
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
      parserOptions: {
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
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: 'var value1 = dic(`Шаблонные строки`), value2 = i18n.t(`Шаблонные строки`), value3 = x.y.z(`Шаблонные строки`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      parserOptions: {
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
  ],
  invalid: [
    // General
    {
      code: 'var tl = `Шаблонные строки`',
      env: { es6: true },
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
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
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
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
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
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      errors: [{
        message: 'Using Russian characters: Шаблонные строки',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'Строки\'); var tpl = <Hello>{dic(\'Строки\')}</Hello>;',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
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
  ],
});
