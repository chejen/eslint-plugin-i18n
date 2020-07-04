/**
 * @fileoverview Rule to flag use of Japanese character
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
	var regex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FA5]/;
	var message = "Using Japanese characters: {{ character }}";
	return validator(context, regex, message);
};

module.exports.schema = [];
