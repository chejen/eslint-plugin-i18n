/**
 * @fileoverview Rule to flag use of non-ascii characters
 * @author Erwin Hom
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[^\u0020-\u007e]/;

	return {
		"Literal": function(node) {
			if (typeof node.value === "string" && regex.exec(node.raw)) {
				context.report({
					node: node,
					message: "Using non-ascii characters: {{ character }}",
					data: {
						character: node.raw
					}
				});
			}
		}
	};
};

module.exports.schema = [];
