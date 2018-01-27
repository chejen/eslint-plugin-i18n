/**
 * @fileoverview Rule to flag use of Korean character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[\uAC00-\uD7A3]/;
	var report = function (node, val) {
		context.report({
			node: node,
			message: "Using Korean characters: {{ character }}",
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
