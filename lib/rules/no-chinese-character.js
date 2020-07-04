/**
 * @fileoverview Rule to flag use of Chinese character
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
	var regex = /[\u4E00-\u9FFF]/;
	var message = "Using Chinese characters: {{ character }}";
	return validator(context, regex, message);
};

module.exports.schema = [];
