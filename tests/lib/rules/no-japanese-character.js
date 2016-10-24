/**
 * @fileoverview Rule to flag use of Japanese character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-japanese-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-japanese-character", rule, {
	valid: [
		"console.log(\"english\");",
		"var str = \"한국어\";",
		"// 単一行コメント",
		"/* マルチラインのコメント */"
	],
	invalid: [
		{ code: "console.log('english' + '日本語');", errors: [{ message: "Using Japanese characters: '日本語'", type: "Literal"}] },
		{ code: "var str = 'ストリング'.substr(0, 1);", errors: [{ message: "Using Japanese characters: 'ストリング'", type: "Literal"}] },
		{ code: "var obj = { 'key': 'オブジェクト' };", errors: [{ message: "Using Japanese characters: 'オブジェクト'", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('関数');", errors: [{ message: "Using Japanese characters: '関数'", type: "Literal"}] },
		{ code: "var ary = [\"配列\"];", errors: [{ message: "Using Japanese characters: \"配列\"", type: "Literal"}] }
	]
});
