/**
 * @fileoverview Rule to flag use of Korean character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-korean-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-korean-character", rule, {
	valid: [
		"console.log(\"english\");",
		"var str = \"中文\";",
		"// 한 줄 댓글",
		"/* 멀티 라인 댓글 */"
	],
	invalid: [
		{ code: "console.log('english' + '한국어');", errors: [{ message: "Using Korean characters: '한국어'", type: "Literal"}] },
		{ code: "var str = '문자열'.substr(0, 1);", errors: [{ message: "Using Korean characters: '문자열'", type: "Literal"}] },
		{ code: "var obj = { 'key': '사물' };", errors: [{ message: "Using Korean characters: '사물'", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('함수');", errors: [{ message: "Using Korean characters: '함수'", type: "Literal"}] },
		{ code: "var ary = [\"배열\"];", errors: [{ message: "Using Korean characters: \"배열\"", type: "Literal"}] }
	]
});
