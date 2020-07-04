/**
 * @fileoverview Rule to flag use of Korean character
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

var lang = "Korean";
var description = `This rule helps to find out where ${lang} characters are.`;
var regex = /[\uAC00-\uD7A3]/;
var message = `Using ${lang} characters: {{ character }}`;

module.exports = define(lang, description, regex, message);
