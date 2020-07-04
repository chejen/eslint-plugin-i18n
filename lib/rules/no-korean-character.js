/**
 * @fileoverview Rule to flag use of Korean character
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
	var regex = /[\uAC00-\uD7A3]/;
	var message = "Using Korean characters: {{ character }}";
	return validator(context, regex, message);
};

module.exports.schema = [];
