/**
 * @fileoverview Rule to flag use of Thai character
 * @author Chang, Che-Jen
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-thai-character');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('no-thai-character', rule, {
  valid: [
    // No target language in code.
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      env: { es6: true },
    },

    // Comments shouldn't be flagged.
    '// ความคิดเห็นบรรทัดเดียว',
    '/* หลายสายความคิดเห็น */',

    // Identifiers shouldn't be flagged.
    {
      code: `
        import ตัวระบุ0 from 'xyz';
        ตัวระบุ1 = { ตัวระบุ2: 0 };
        var ตัวระบุ3 = function ตัวระบุ4() {};
        this.ตัวระบุ5 = 0;
        a[ตัวระบุ6] = 0;
        export default ตัวระบุ7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },

    // Special case: bypass argument checks for specified functions.
    {
      code: 'var value = a.b.c.d(\'อักขระ\'); var tpl = <Hello>{dic(\'อักขระ\')}</Hello>;',
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
      code: 'var value1 = dic(`อักขระ`), value2 = i18n.t(`อักขระ`), value3 = x.y.z(`อักขระ`)',
      options: [{
        excludeArgsForFunctions: ['dic', 'i18n.t', 'x.y.z'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `
        var value1 = i18n.t("เมื่อการยืนยันตัวตนล้มเหลว" + "จะมีข้อความ");
        var value2 = i18n.t(isValid ? "ถูกต้อง" : "ไม่ถูกต้อง");
        var value3 = i18n.t(key || "ค่าเริ่มต้น");
      `,
      options: [{
        excludeArgsForFunctions: ['i18n.t'],
      }],
    },

    // Special case: bypass module related checks
    {
      code: 'require(`${basePath}/ส่วนประกอบ.jsx`); require(basePath + "เส้นทาง/component.jsx")',
      options: [{
        excludeArgsForFunctions: ['require'],
      }],
      parserOptions: {
        ecmaVersion: 6,
      },
    },
    {
      code: `import 'โมดูล'; import { doSomething } from 'โมดูล/api';`,
      options: [{
        excludeModuleImports: true,
      }],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
    {
      code: 'import(`${basePath}/เส้นทาง/module.js`); import(basePath + "/ส่วนประกอบ.jsx").then(cmp => {});',
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
          await import(token ? './โมดูลa.js' : './โมดูลb.js');
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
      code: 'var tl = `อักษรแม่แบบ`',
      env: { es6: true },
      errors: [{ message: 'Using Thai characters: อักษรแม่แบบ', type: 'TemplateElement' }],
    },
    {
      code: 'console.log(\'english\' + \'ไทย\');',
      errors: [{ message: 'Using Thai characters: \'ไทย\'', type: 'Literal' }],
    },
    {
      code: 'var str = \'ตัวแปร\'.substr(0, 1);',
      errors: [{ message: 'Using Thai characters: \'ตัวแปร\'', type: 'Literal' }],
    },
    {
      code: 'var obj = { \'key\': \'วัตถุ\' };',
      errors: [{ message: 'Using Thai characters: \'วัตถุ\'', type: 'Literal' }],
    },
    {
      code: 'var func = function(v){return v;}; func(\'ฟังก์ชัน\');',
      errors: [{ message: 'Using Thai characters: \'ฟังก์ชัน\'', type: 'Literal' }],
    },
    {
      code: 'var ary = ["อาร์เรย์"];',
      errors: [{ message: 'Using Thai characters: "อาร์เรย์"', type: 'Literal' }],
    },

    // JSX
    {
      code: 'var tpl = <Hello title=\'สวัสดี\'>คอมโพเนนท์</Hello>',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Thai characters: \'สวัสดี\'', type: 'Literal',
      }, {
        message: 'Using Thai characters: คอมโพเนนท์', type: 'JSXText',
      }],
    },

    // Special case: lint the comments as `includeComment` option enabled.
    {
      code: `
        // ความคิดเห็นบรรทัดเดียว
        /* หลายสายความคิดเห็น */
      `,
      options: [{
        includeComment: true,
      }],
      errors: [{
        message: 'Using Thai characters: ความคิดเห็นบรรทัดเดียว',
        type: 'Line',
      }, {
        message: 'Using Thai characters: หลายสายความคิดเห็น',
        type: 'Block',
      }],
    },

    // Special case: lint identifiers as `includeIdentifier` option enabled.
    {
      code: `
        import ตัวระบุ0 from 'xyz';
        ตัวระบุ1 = { ตัวระบุ2: 0 };
        var ตัวระบุ3 = function ตัวระบุ4() {};
        this.ตัวระบุ5 = 0;
        a[ตัวระบุ6] = 0;
        export default ตัวระบุ7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
      errors: [{
        message: 'Using Thai characters: ตัวระบุ0',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ1',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ2',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ3',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ4',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ5',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ6',
        type: 'Identifier',
      }, {
        message: 'Using Thai characters: ตัวระบุ7',
        type: 'Identifier',
      }],
    },

    // Arguments without (proper) `excludeArgsForFunctions` should be flagged.
    {
      code: 'var tl = func(`อักษรแม่แบบ`)',
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['unmatchedFunction'],
      }],
      errors: [{
        message: 'Using Thai characters: อักษรแม่แบบ',
        type: 'TemplateElement',
      }],
    },
    {
      code: 'var value = a.b.c.d(\'อักขระ\'); var tpl = <Hello>{dic(\'อักขระ\')}</Hello>;',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Thai characters: \'อักขระ\'', type: 'Literal',
      }, {
        message: 'Using Thai characters: \'อักขระ\'', type: 'Literal',
      }],
    },
    {
      code: `
        var value1 = i18n.t('เมื่อการยืนยันตัวตนล้มเหลว' + 'จะมีข้อความ');
        var value2 = i18n.t(isValid ? "ถูกต้อง" : "ไม่ถูกต้อง");
        var value3 = i18n.t(key || "ค่าเริ่มต้น");
      `,
      errors: [{
        message: 'Using Thai characters: \'เมื่อการยืนยันตัวตนล้มเหลว\'', type: 'Literal',
      }, {
        message: 'Using Thai characters: \'จะมีข้อความ\'', type: 'Literal',
      }, {
        message: 'Using Thai characters: "ถูกต้อง"', type: 'Literal',
      }, {
        message: 'Using Thai characters: "ไม่ถูกต้อง"', type: 'Literal',
      }, {
        message: 'Using Thai characters: "ค่าเริ่มต้น"', type: 'Literal',
      }],
    },

    // Path or module names would be flagged by default.
    {
      code: 'require(`${basePath}/ส่วนประกอบ.jsx`); require(basePath + "เส้นทาง/component.jsx");',
      parserOptions: {
        ecmaVersion: 6,
      },
      errors: [{
        message: 'Using Thai characters: /ส่วนประกอบ.jsx',
      }, {
        message: 'Using Thai characters: "เส้นทาง/component.jsx"',
      }],
    },
    {
      code: `import "โมดูล"; import { doSomething } from 'โมดูล/api'`,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      errors: [{
        message: 'Using Thai characters: "โมดูล"',
      }, {
        message: 'Using Thai characters: \'โมดูล/api\'',
      }],
    },
    {
      code: 'import(`${basePath}/เส้นทาง/module.js`); import(basePath + "/ส่วนประกอบ.jsx").then(cmp => {});',
      parserOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Thai characters: /เส้นทาง/module.js',
      }, {
        message: 'Using Thai characters: "/ส่วนประกอบ.jsx"',
      }],
    },
    {
      code: `
        async function demo() {
          await import(token ? './โมดูลa.js' : './โมดูลb.js');
        }
      `,
      parserOptions: {
        ecmaVersion: 11,
      },
      errors: [{
        message: 'Using Thai characters: \'./โมดูลa.js\'',
      }, {
        message: 'Using Thai characters: \'./โมดูลb.js\'',
      }],
    },
  ],
});
