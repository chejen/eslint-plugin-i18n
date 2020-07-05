/**
 * @fileoverview Rule to flag use of Japanese character
 * @author Chang, Che-Jen
 */

'use strict';

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

const define = require('../utils/define');

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const lang = 'Japanese';
const regex = /[\u3040-\u30FF\u31F0-\u31FF\u4E00-\u9FA5]/;

module.exports = define(lang, regex);
