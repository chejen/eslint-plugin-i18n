/**
 * @fileoverview Rule to flag use of non-ASCII character
 * @author Erwin Hom
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-non-ascii-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-non-ascii-character", rule, {
	valid: [
		"console.log(\"ascii\");",
		"var str = \"ascii\";",
		"// 注解",
		"/* 注释 */"
	],
	invalid: [
		{ code: "console.log('ascii' + '繁體/*字*/');", errors: [{ message: "Using non-ascii characters: '繁體/*字*/'", type: "Literal"}] },
		{ code: "console.log(\"ascii\" && \"//简体字\");", errors: [{ message: "Using non-ascii characters: \"//简体字\"", type: "Literal"}] },
		{ code: "var str = '變數'.substr(0, 1);", errors: [{ message: "Using non-ascii characters: '變數'", type: "Literal"}] },
		{ code: "var str = \"变量\";", errors: [{ message: "Using non-ascii characters: \"变量\"", type: "Literal"}] },
		{ code: "var obj = { 'key': '物件' };", errors: [{ message: "Using non-ascii characters: '物件'", type: "Literal"}] },
		{ code: "var obj = { \"对象\": \"value\" };", errors: [{ message: "Using non-ascii characters: \"对象\"", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('函式');", errors: [{ message: "Using non-ascii characters: '函式'", type: "Literal"}] },
		{ code: "function f(v){return \"返回值\";}", errors: [{ message: "Using non-ascii characters: \"返回值\"", type: "Literal"}] },
		{ code: "var ary = [\"数组\"];", errors: [{ message: "Using non-ascii characters: \"数组\"", type: "Literal"}] },
	]
});
