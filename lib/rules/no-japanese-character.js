/**
 * @fileoverview Rule to flag use of Japanese character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	/*
	 * Hiragana
	 * Katakana
	 * CJK unifed ideographs - Common and uncommon kanji
	 */
	var regex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FA5]/;
	var report = function (node, val) {
		context.report({
			node: node,
			message: "Using Japanese characters: {{ character }}",
			data: {
				character: val
			}
		});
	};

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				report(node, node.raw);
			}
		},
		"TemplateElement": function(node) {
			var v = node.value;
			if (v && v.raw && regex.exec(v.raw)) {
				report(node, v.raw);
			}
		}
	};
};

module.exports.schema = [];
