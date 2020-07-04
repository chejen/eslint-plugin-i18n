/**
 * @fileoverview Rule to flag use of Thai character
 * @author Chang, Che-Jen
 */

"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var define = require("../utils/define");

//-----------------------------------------------------------------------------
// Rule Definition
//-----------------------------------------------------------------------------

var lang = "Thai";
var description = `This rule helps to find out where ${lang} characters are.`;
var regex = /[\u0E00-\u0E7F]/;
var message = `Using ${lang} characters: {{ character }}`;

module.exports = define(lang, description, regex, message);
