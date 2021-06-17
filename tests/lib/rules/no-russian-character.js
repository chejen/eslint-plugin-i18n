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
    'console.log("english");',
    {
      code: 'var str = `한국어`;',
      env: { es6: true },
    },
    '// Комментарий, занимающий одну строку.',
    '/* Комментарий, занимающий несколько строк. */',
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
  ],
  invalid: [
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
  ],
});
