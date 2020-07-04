/**
 * @fileoverview Rule to flag use of Japanese character
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

var lang = "Japanese";
var description = `This rule helps to find out where ${lang} characters are.`;
var regex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FA5]/;
var message = `Using ${lang} characters: {{ character }}`;

module.exports = define(lang, description, regex, message);
