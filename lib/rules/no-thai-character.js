/**
 * @fileoverview Rule to flag use of Thai character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[\u0E00-\u0E7F]/;
	var report = function (node, val) {
		context.report({
			node: node,
			message: "Using Thai characters: {{ character }}",
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
