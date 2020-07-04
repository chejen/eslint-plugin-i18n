/**
 * @fileoverview Rule to flag use of Russian character
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
	var regex = /[\u0400-\u04FF]/;
	var message = "Using Russian characters: {{ character }}";
	return validator(context, regex, message);
};

module.exports.schema = [];
