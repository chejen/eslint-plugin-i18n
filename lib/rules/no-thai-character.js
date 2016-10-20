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

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				context.report({
					node: node,
					message: "Using Thai characters: {{ character }}",
					data: {
						character: node.raw
					}
				});
			}
		}
	};
};

module.exports.schema = [];