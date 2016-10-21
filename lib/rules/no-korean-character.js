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

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				context.report({
					node: node,
					message: "Using Korean characters: {{ character }}",
					data: {
						character: node.raw
					}
				});
			}
		}
	};
};

module.exports.schema = [];