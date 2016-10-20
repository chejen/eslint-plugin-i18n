/**
 * @fileoverview Rule to flag use of Thai character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-thai-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-thai-character", rule, {
	valid: [
		"console.log(\"english\");",
		"var str = \"中文\";",
		"// ความคิดเห็นบรรทัดเดียว",
		"/* หลายสายความคิดเห็น */"
	],
	invalid: [
		{ code: "console.log('english' + 'ไทย');", errors: [{ message: "Using Thai characters: 'ไทย'", type: "Literal"}] },
		{ code: "var str = 'ตัวแปร'.substr(0, 1);", errors: [{ message: "Using Thai characters: 'ตัวแปร'", type: "Literal"}] },
		{ code: "var obj = { 'key': 'วัตถุ' };", errors: [{ message: "Using Thai characters: 'วัตถุ'", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('ฟังก์ชัน');", errors: [{ message: "Using Thai characters: 'ฟังก์ชัน'", type: "Literal"}] },
		{ code: "var ary = [\"อาร์เรย์\"];", errors: [{ message: "Using Thai characters: \"อาร์เรย์\"", type: "Literal"}] }
	]
});
