/**
 * @fileoverview Rule to flag use of date pattern
 * @author Erwin Hom
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[mM]{2}\/[dD]{2}\/[yY]{2}/;

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				context.report({
					node: node,
					message: "Hard-coded date pattern detected",
				});
			}
		}
	};
};

module.exports.schema = [];
