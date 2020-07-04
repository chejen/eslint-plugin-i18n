/**
 * @fileoverview Rule to flag use of Russian character
 * @author Chang, Che-Jen
 */

"use strict";

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

var define = require("../utils/define");

//-----------------------------------------------------------------------------
// Rule Definition
//-----------------------------------------------------------------------------

var lang = "Russian";
var description = `This rule helps to find out where ${lang} characters are.`;
var regex = /[\u0400-\u04FF]/;
var message = `Using ${lang} characters: {{ character }}`;

module.exports = define(lang, description, regex, message);
