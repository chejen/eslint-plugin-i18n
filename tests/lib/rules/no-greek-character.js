/**
 * @fileoverview Rule to flag use of Greek character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-greek-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-greek-character', rule, {
  valid: [
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      env: { es6: true },
    },
    '// Σχόλιο μονής γραμμής',
    '/* Σχολιασμός πολλαπλών γραμμών */',
    {
      code: `
        import Αναγνωριστικά0 from 'xyz';
        Αναγνωριστικά1 = { Αναγνωριστικά2: 0 };
        var Αναγνωριστικά3 = function Αναγνωριστικά4() {};
        this.Αναγνωριστικά5 = 0;
        a[Αναγνωριστικά6] = 0;
        export default Αναγνωριστικά7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
  ],
  invalid: [
    {
      code: 'var tpl = <Hello title=\'Χαίρετε\'>συστατικό</Hello>',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Greek characters: \'Χαίρετε\'', type: 'Literal',
      }, {
        message: 'Using Greek characters: συστατικό', type: 'JSXText',
      }],
    },
    {
      code: 'var str = `συμβολοσειρές`',
      env: { es6: true },
      errors: [{ message: 'Using Greek characters: συμβολοσειρές', type: 'TemplateElement' }],
    },
    {
      code: 'console.log(\'english\' + \'Ελληνικά\');',
      errors: [{ message: 'Using Greek characters: \'Ελληνικά\'', type: 'Literal' }],
    },
    {
      code: 'var str = \'συμβολοσειρές\'.substr(0, 1);',
      errors: [{ message: 'Using Greek characters: \'συμβολοσειρές\'', type: 'Literal' }],
    },
    {
      code: 'var obj = { \'key\': \'αντικείμενο\' };',
      errors: [{ message: 'Using Greek characters: \'αντικείμενο\'', type: 'Literal' }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'λειτουργία\');',
      errors: [{ message: 'Using Greek characters: \'λειτουργία\'', type: 'Literal' }],
    },
    {
      code: 'var ary = ["πίνακας"];',
      errors: [{ message: 'Using Greek characters: "πίνακας"', type: 'Literal' }],
    },
    {
      code: `
        import Αναγνωριστικά0 from 'xyz';
        Αναγνωριστικά1 = { Αναγνωριστικά2: 0 };
        var Αναγνωριστικά3 = function Αναγνωριστικά4() {};
        this.Αναγνωριστικά5 = 0;
        a[Αναγνωριστικά6] = 0;
        export default Αναγνωριστικά7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
      errors: [{
        message: 'Using Greek characters: Αναγνωριστικά0',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά1',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά2',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά3',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά4',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά5',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά6',
        type: 'Identifier',
      }, {
        message: 'Using Greek characters: Αναγνωριστικά7',
        type: 'Identifier',
      }],
    },
  ],
});
