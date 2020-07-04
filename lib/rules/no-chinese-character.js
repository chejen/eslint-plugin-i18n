/**
 * @fileoverview Rule to flag use of Chinese character
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

var lang = "Chinese";
var description = `This rule helps to find out where ${lang} characters are.`;
var regex = /[\u4E00-\u9FFF]/;
var message = `Using ${lang} characters: {{ character }}`;

module.exports = define(lang, description, regex, message);
