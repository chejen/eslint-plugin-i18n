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
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      env: { es6: true },
    },
    '// ความคิดเห็นบรรทัดเดียว',
    '/* หลายสายความคิดเห็น */',
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
  ],
  invalid: [
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
    {
      code: 'var func = function(v){return v;}; var tpl = <Hello>{func(\'ฟังก์ชัน\')}</Hello>;',
      options: [{
        excludeArgsForFunctions: ['dic'],
      }],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Thai characters: \'ฟังก์ชัน\'', type: 'Literal',
      }],
    },
    {
      code: 'var tl = `อักษรแม่แบบ`',
      env: { es6: true },
      errors: [{ message: 'Using Thai characters: อักษรแม่แบบ', type: 'TemplateElement' }],
    },
    {
      code: 'var tl = func(`อักษรแม่แบบ`)',
      env: { es6: true },
      options: [{
        excludeArgsForFunctions: ['dic'],
      }],
      errors: [{
        message: 'Using Thai characters: อักษรแม่แบบ',
        type: 'TemplateElement',
      }],
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
  ],
});
