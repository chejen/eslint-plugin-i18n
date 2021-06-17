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
    'console.log("english");',
    {
      code: 'var str = `中文`;',
      env: { es6: true },
    },
    '// 한 줄 댓글',
    '/* 멀티 라인 댓글 */',
    {
      code: `
        import 식별자0 from 'xyz';
        식별자1 = { 식별자2: 0 };
        var 식별자3 = function 식별자4() {};
        this.식별자5 = 0;
        a[식별자6] = 0;
        export default 식별자7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
    },
  ],
  invalid: [
    {
      code: 'var tpl = <Hello title=\'안녕하세요\'>컴포넌트</Hello>',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [{
        message: 'Using Korean characters: \'안녕하세요\'', type: 'Literal',
      }, {
        message: 'Using Korean characters: 컴포넌트', type: 'JSXText',
      }],
    },
    {
      code: 'var tl = `템플릿 문자열`',
      env: { es6: true },
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
    {
      code: `
        import 식별자0 from 'xyz';
        식별자1 = { 식별자2: 0 };
        var 식별자3 = function 식별자4() {};
        this.식별자5 = 0;
        a[식별자6] = 0;
        export default 식별자7;
      `,
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
      },
      options: [{
        includeIdentifier: true,
      }],
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
  ],
});
