/**
 * @fileoverview Rule to flag use of chinese character
 * @author Chang, Che-Jen
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[\u4e00-\u9fa5]/;

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				context.report({
					node: node,
					message: "Using chinese characters: {{ character }}",
					data: {
						character: node.raw
					}
				});
			}
		}
	};
};

module.exports.schema = [];