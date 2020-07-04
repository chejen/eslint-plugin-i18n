/**
 * @fileoverview Rule to flag use of Greek character
 * @author Chang, Che-Jen
 */

"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var validator = require('../utils/validator');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	var regex = /[\u0374-\u03FF]/;
	var message = "Using Greek characters: {{ character }}";
	return validator(context, regex, message);
};

module.exports.schema = [];
