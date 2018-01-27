/**
 * @fileoverview Rule to flag use of Russian character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[\u0400-\u04FF]/;
	var report = function (node, val) {
		context.report({
			node: node,
			message: "Using Russian characters: {{ character }}",
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
