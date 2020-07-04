/**
 * @fileoverview Rule to flag use of Russian character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-russian-character");
var RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-russian-character", rule, {
	valid: [
		"console.log(\"english\");",
		{
			code: "var str = `한국어`;",
			env: { es6: true }
		},
		"// Комментарий, занимающий одну строку.",
		"/* Комментарий, занимающий несколько строк. */"
	],
	invalid: [
		{
			code: "var tpl = <Hello title='Привет'>компонентов</Hello>",
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			errors: [{
				message: "Using Russian characters: 'Привет'", type: "Literal"
			}, {
				message: "Using Russian characters: компонентов", type: "JSXText"
			}]
		},
		{
			code: "var tl = `Шаблонные строки`",
			env: { es6: true },
			errors: [{ message: "Using Russian characters: Шаблонные строки", type: "TemplateElement" }]
		},
		{ code: "console.log('english' + 'Русский');", errors: [{ message: "Using Russian characters: 'Русский'", type: "Literal"}] },
		{ code: "var str = 'строковое'.substr(0, 1);", errors: [{ message: "Using Russian characters: 'строковое'", type: "Literal"}] },
		{ code: "var obj = { 'key': 'объектов' };", errors: [{ message: "Using Russian characters: 'объектов'", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('Функции');", errors: [{ message: "Using Russian characters: 'Функции'", type: "Literal"}] },
		{ code: "var ary = [\"массивы\"];", errors: [{ message: "Using Russian characters: \"массивы\"", type: "Literal"}] }
	]
});
