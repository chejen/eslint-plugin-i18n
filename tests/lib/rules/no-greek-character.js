/**
 * @fileoverview Rule to flag use of Greek character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-greek-character"),
	RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-greek-character", rule, {
	valid: [
		"console.log(\"english\");",
		"var str = \"中文\";",
		"// Σχόλιο μονής γραμμής",
		"/* Σχολιασμός πολλαπλών γραμμών */"
	],
	invalid: [
		{ code: "console.log('english' + 'Ελληνικά');", errors: [{ message: "Using Greek characters: 'Ελληνικά'", type: "Literal"}] },
		{ code: "var str = 'συμβολοσειρές'.substr(0, 1);", errors: [{ message: "Using Greek characters: 'συμβολοσειρές'", type: "Literal"}] },
		{ code: "var obj = { 'key': 'αντικείμενο' };", errors: [{ message: "Using Greek characters: 'αντικείμενο'", type: "Literal"}] },
		{ code: "var func = function(v){return v;}; func('λειτουργία');", errors: [{ message: "Using Greek characters: 'λειτουργία'", type: "Literal"}] },
		{ code: "var ary = [\"πίνακας\"];", errors: [{ message: "Using Greek characters: \"πίνακας\"", type: "Literal"}] }
	]
});
