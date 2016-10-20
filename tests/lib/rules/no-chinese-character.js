/**
 * @fileoverview Rule to flag use of Chinese character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-chinese-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-chinese-character", rule, {
	valid: [
		"console.log(\"english\");",
		"var str = \"english\";",
		"// 注解",
		"/* 注释 */"
	],
	invalid: [
		{ code: "console.log('english' + '繁體/*字*/');", errors: [{ message: "Using Chinese characters: '繁體/*字*/'", type: "Literal"}] },
		{ code: "console.log(\"english\" && \"//简体字\");", errors: [{ message: "Using Chinese characters: \"//简体字\"", type: "Literal"}] },
		{ code: "var str = '變數'.substr(0, 1);", errors: [{ message: "Using Chinese characters: '變數'", type: "Literal"}] },
		{ code: "var str = \"变量\";", errors: [{ message: "Using Chinese characters: \"变量\"", type: "Literal"}] },
		{ code: "var obj = { 'key': '物件' };", errors: [{ message: "Using Chinese characters: '物件'", type: "Literal"}] },
		{ code: "var obj = { \"对象\": \"value\" };", errors: [{ message: "Using Chinese characters: \"对象\"", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('函式');", errors: [{ message: "Using Chinese characters: '函式'", type: "Literal"}] },
		{ code: "function f(v){return \"返回值\";}", errors: [{ message: "Using Chinese characters: \"返回值\"", type: "Literal"}] },
		{ code: "var ary = [\"数组\"];", errors: [{ message: "Using Chinese characters: \"数组\"", type: "Literal"}] }
	]
});
