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
    // No target language in code.
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      env: { es6: true },
    },

    // Comments shouldn't be flagged.
    '// Σχόλιο μονής γραμμής',
    '/* Σχολιασμός πολλαπλών γραμμών */',

    // Comments shouldn't be flagged.
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

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'Σειρά\'); var tpl = <Hello>{dic(\'Σειρά\')}</Hello>;',
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
      code: 'var value1 = dic(`συμβολοσειρές`), value2 = i18n.t(`συμβολοσειρές`), value3 = x.y.z(`συμβολοσειρές`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("Γειά σου" + "κόσμος");
        var value2 = i18n.t(isValid ? "έγκυρος" : "άκυρος");
        var value3 = i18n.t(key || "προεπιλεγμένη τιμή");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },

    // Special case: bypass module related checks
    {
      code: 'require(`${basePath}/συστατικό.jsx`); require(basePath + "μονοπάτι/component.jsx")',
      options: [{
        excludeArgsForFunctions: ['require'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `import 'μονάδα μέτρησης'; import { doSomething } from 'μονάδα μέτρησης/api';`,
      options: [{
        excludeModuleImports: true,
      }],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'import(`${basePath}/μονοπάτι/module.js`); import(basePath + "/συστατικό.jsx").then((cmp) => {});',
      options: [{
        excludeModuleImports: true,
      }],
      parserOptions: {
        ecmaVersion: 11,
      },
    },
    {
      code: `
        async function demo() {
          await import(token ? './μονάδα μέτρησηςa.js' : './μονάδα μέτρησηςb.js');
        }
      `,
      options: [{
        excludeModuleImports: true,
      }],
      parserOptions: {
        ecmaVersion: 11,
      },
    },
  ],

  invalid: [
    // General
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

    // JSX
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

    // Special case: lint the comments as `includeComment` option enabled.
    {
      code: `
        // Σχόλιο μονής γραμμής
        /* Σχολιασμός πολλαπλών γραμμών */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Greek characters: Σχόλιο μονής γραμμής',
        type: 'Line',
      }, {
        message: 'Using Greek characters: Σχολιασμός πολλαπλών γραμμών',
        type: 'Block',
      }],
    },

    // Special case: lint identifiers as `includeIdentifier` option enabled.
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

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`συμβολοσειρές`)',
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      errors: [{
        message: 'Using Greek characters: συμβολοσειρές',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'Σειρά\'); var tpl = <Hello>{dic(\'Σειρά\')}</Hello>;',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Greek characters: \'Σειρά\'', type: 'Literal',
      }, {
        message: 'Using Greek characters: \'Σειρά\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('Γειά σου' + 'κόσμος');
        var value2 = i18n.t(isValid ? "έγκυρος" : "άκυρος");
        var value3 = i18n.t(key || "προεπιλεγμένη τιμή");
      `,
      errors: [{
        message: 'Using Greek characters: \'Γειά σου\'', type: 'Literal',
      }, {
        message: 'Using Greek characters: \'κόσμος\'', type: 'Literal',
      }, {
        message: 'Using Greek characters: "έγκυρος"', type: 'Literal',
      }, {
        message: 'Using Greek characters: "άκυρος"', type: 'Literal',
      }, {
        message: 'Using Greek characters: "προεπιλεγμένη τιμή"', type: 'Literal',
      }],
    },

    // Path or module names would be flagged by default.
    {
      code: 'require(`${basePath}/συστατικό.jsx`); require(basePath + "μονοπάτι/component.jsx");',
      parserOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Greek characters: /συστατικό.jsx',
      }, {
        message: 'Using Greek characters: "μονοπάτι/component.jsx"',
      }],
    },
    {
      code: `import "μονάδα μέτρησης"; import { doSomething } from 'μονάδα μέτρησης/api'`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Greek characters: "μονάδα μέτρησης"',
      }, {
        message: 'Using Greek characters: \'μονάδα μέτρησης/api\'',
      }],
    },
    {
      code: 'import(`${basePath}/μονοπάτι/module.js`); import(basePath + "/συστατικό.jsx").then(cmp => {});',
      parserOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Greek characters: /μονοπάτι/module.js',
      }, {
        message: 'Using Greek characters: "/συστατικό.jsx"',
      }],
    },
    {
      code: `
        async function demo() {
          await import(token ? './μονάδα μέτρησηςa.js' : './μονάδα μέτρησηςb.js');
        }
      `,
      parserOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Greek characters: \'./μονάδα μέτρησηςa.js\'',
      }, {
        message: 'Using Greek characters: \'./μονάδα μέτρησηςb.js\'',
      }],
    },
  ],
});
